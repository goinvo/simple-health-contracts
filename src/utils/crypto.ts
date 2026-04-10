import { ConsentSnapshot, ConsentSignature } from '@/src/schema/types';

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  // Create a longer hash by combining multiple rounds
  let result = hex;
  for (let round = 1; round < 8; round++) {
    let roundHash = hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      roundHash = ((roundHash << (5 + round)) - roundHash + char * (round + 1)) | 0;
    }
    result += Math.abs(roundHash).toString(16).padStart(8, '0');
  }
  return result;
}

export function hashConsentSnapshot(snapshot: ConsentSnapshot[]): string {
  const sorted = [...snapshot].sort((a, b) =>
    a.consentItemId.localeCompare(b.consentItemId)
  );
  const canonical = JSON.stringify(sorted);
  return simpleHash(canonical);
}

export function createConsentReceipt(
  contractId: string,
  contractVersion: string,
  patientId: string,
  snapshot: ConsentSnapshot[],
  previousHash?: string
): ConsentSignature {
  const signatureHash = hashConsentSnapshot(snapshot);

  return {
    id: `receipt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    contractId,
    contractVersion,
    patientId,
    timestamp: new Date().toISOString(),
    consentSnapshot: snapshot,
    signatureHash,
    previousSignatureHash: previousHash,
  };
}

export function verifyReceiptChain(signatures: ConsentSignature[]): boolean {
  if (signatures.length === 0) return true;

  const sorted = [...signatures].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  for (let i = 0; i < sorted.length; i++) {
    // Verify the hash matches the snapshot
    const expectedHash = hashConsentSnapshot(sorted[i].consentSnapshot);
    if (expectedHash !== sorted[i].signatureHash) return false;

    // Verify chain linkage
    if (i > 0 && sorted[i].previousSignatureHash !== sorted[i - 1].signatureHash) {
      return false;
    }
  }

  return true;
}
