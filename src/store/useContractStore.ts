import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  DynamicContract,
  ConsentSignature,
  ConsentSnapshot,
} from '@/src/schema/types';
import {
  ConsentState,
  buildDefaultConsentState,
  getConsentSnapshot,
} from '@/src/schema/consent';
import { createConsentReceipt } from '@/src/utils/crypto';
import { mercyGeneralHospital } from '@/src/mock/contracts/mercy-general-hospital';
import { telehealthPlusV1, telehealthPlusV2 } from '@/src/mock/contracts/telehealth-plus';
import { genomicsResearchStudy } from '@/src/mock/contracts/genomics-research-study';

interface ContractStore {
  contracts: Record<string, DynamicContract>;
  previousVersions: Record<string, DynamicContract>;
  consentStates: Record<string, ConsentState>;
  signatures: Record<string, ConsentSignature[]>;

  loadContracts: () => void;
  setConsent: (contractId: string, consentItemId: string, granted: boolean) => void;
  signContract: (contractId: string, patientId: string) => ConsentSignature;
  getConsentState: (contractId: string) => ConsentState;
}

export const useContractStore = create<ContractStore>()(
  immer((set, get) => ({
    contracts: {},
    previousVersions: {},
    consentStates: {},
    signatures: {},

    loadContracts: () => {
      set((state) => {
        const contracts: Record<string, DynamicContract> = {
          [mercyGeneralHospital.id]: mercyGeneralHospital,
          [telehealthPlusV2.id]: telehealthPlusV2,
          [genomicsResearchStudy.id]: genomicsResearchStudy,
        };

        state.contracts = contracts;
        state.previousVersions = {
          [telehealthPlusV2.id]: telehealthPlusV1,
        };

        for (const [id, contract] of Object.entries(contracts)) {
          state.consentStates[id] = buildDefaultConsentState(
            contract.consentItems
          );
        }
      });
    },

    setConsent: (contractId, consentItemId, granted) => {
      set((state) => {
        if (!state.consentStates[contractId]) return;
        const item = state.contracts[contractId]?.consentItems.find(
          (i) => i.id === consentItemId
        );
        if (item?.required) return; // Can't toggle required consents
        state.consentStates[contractId][consentItemId] = granted;
      });
    },

    signContract: (contractId, patientId) => {
      const { contracts, consentStates, signatures } = get();
      const contract = contracts[contractId];
      if (!contract) throw new Error('Contract not found');

      const snapshot = getConsentSnapshot(
        contract.consentItems,
        consentStates[contractId] || {}
      );

      const existingSignatures = signatures[contractId] || [];
      const lastHash =
        existingSignatures.length > 0
          ? existingSignatures[existingSignatures.length - 1].signatureHash
          : undefined;

      const receipt = createConsentReceipt(
        contractId,
        contract.version,
        patientId,
        snapshot,
        lastHash
      );

      set((state) => {
        if (!state.signatures[contractId]) {
          state.signatures[contractId] = [];
        }
        state.signatures[contractId].push(receipt);
      });

      return receipt;
    },

    getConsentState: (contractId) => {
      return get().consentStates[contractId] || {};
    },
  }))
);
