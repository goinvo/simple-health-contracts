// ===== TOP-LEVEL CONTRACT =====
export interface DynamicContract {
  id: string;
  version: string;
  previousVersion?: string;
  metadata: ContractMetadata;
  sections: ContractSection[];
  consentItems: ConsentItem[];
  dataFlows: DataFlow[];
  signatures: ConsentSignature[];
}

export interface ContractMetadata {
  title: string;
  organization: Organization;
  effectiveDate: string;
  expirationDate?: string;
  jurisdiction: string;
  regulatoryFramework: RegulatoryFramework[];
  tldr: TldrCard[];
  lastUpdated: string;
}

export interface Organization {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'telehealth' | 'research' | 'insurer' | 'pharmacy';
  logo?: string;
  contactEmail: string;
  dpo?: string;
}

export type RegulatoryFramework = 'HIPAA' | 'GDPR' | 'CCPA' | 'PIPEDA' | 'state-specific';

// ===== LAYER 0: TL;DR CARDS =====
export interface TldrCard {
  icon: string;
  title: string;
  description: string;
  sentiment: 'positive' | 'neutral' | 'caution' | 'warning';
  relatedSectionIds: string[];
}

// ===== SECTIONS & CLAUSES =====
export interface ContractSection {
  id: string;
  title: string;
  order: number;
  clauses: ContractClause[];
  relatedConsentItemIds: string[];
}

export interface ContractClause {
  id: string;
  layers: ClauseLayers;
  importance: 'standard' | 'notable' | 'critical';
  diff?: ClauseDiff;
}

export interface ClauseLayers {
  legal: string;
  plain: string;
  visual?: ClauseVisual;
}

export interface ClauseVisual {
  type: 'data-flow' | 'timeline' | 'comparison' | 'checklist';
  data: Record<string, unknown>;
  caption: string;
}

export interface ClauseDiff {
  changeType: 'added' | 'modified' | 'removed' | 'unchanged';
  previousLayers?: ClauseLayers;
  impactSummary?: string;
  impactLevel: 'none' | 'low' | 'medium' | 'high';
}

// ===== GRANULAR CONSENT =====
export type DataCategory =
  | 'demographics'
  | 'vitals'
  | 'lab-results'
  | 'imaging'
  | 'mental-health'
  | 'genetic'
  | 'prescriptions'
  | 'billing'
  | 'notes-clinical'
  | 'device-data';

export const DATA_CATEGORY_LABELS: Record<DataCategory, string> = {
  demographics: 'Demographics',
  vitals: 'Vitals',
  'lab-results': 'Lab Results',
  imaging: 'Imaging',
  'mental-health': 'Mental Health',
  genetic: 'Genetic Data',
  prescriptions: 'Prescriptions',
  billing: 'Billing',
  'notes-clinical': 'Clinical Notes',
  'device-data': 'Device Data',
};

export type UsePurpose =
  | 'treatment'
  | 'billing'
  | 'research'
  | 'quality-improvement'
  | 'marketing'
  | 'third-party-sharing'
  | 'ai-training'
  | 'analytics'
  | 'public-health';

export const USE_PURPOSE_LABELS: Record<UsePurpose, string> = {
  treatment: 'Treatment',
  billing: 'Billing',
  research: 'Research',
  'quality-improvement': 'Quality Improvement',
  marketing: 'Marketing',
  'third-party-sharing': 'Third-Party Sharing',
  'ai-training': 'AI Model Training',
  analytics: 'Analytics',
  'public-health': 'Public Health',
};

export interface ConsentItem {
  id: string;
  dataCategory: DataCategory;
  purpose: UsePurpose;
  description: string;
  required: boolean;
  defaultValue: boolean;
  expiresAfterDays?: number;
  renewalPromptDays?: number;
  relatedClauseIds: string[];
  thirdParties?: ThirdPartyRecipient[];
}

export interface ThirdPartyRecipient {
  name: string;
  purpose: string;
  jurisdiction: string;
}

// ===== DATA FLOWS =====
export interface DataFlow {
  id: string;
  source: DataFlowEndpoint;
  destination: DataFlowEndpoint;
  dataCategories: DataCategory[];
  purpose: UsePurpose;
  encrypted: boolean;
  retentionDays?: number;
  legalBasis: string;
  relatedConsentItemId?: string;
}

export interface DataFlowEndpoint {
  entity: string;
  system?: string;
  location: string;
}

// ===== CONSENT RECEIPTS =====
export interface ConsentSignature {
  id: string;
  contractId: string;
  contractVersion: string;
  patientId: string;
  timestamp: string;
  consentSnapshot: ConsentSnapshot[];
  signatureHash: string;
  previousSignatureHash?: string;
}

export interface ConsentSnapshot {
  consentItemId: string;
  granted: boolean;
  expiresAt?: string;
}

// ===== VIEW LAYER =====
export type ViewLayer = 'tldr' | 'plain' | 'legal' | 'visual';

// ===== PATIENT =====
export interface PatientProfile {
  id: string;
  name: string;
  dateOfBirth: string;
  email: string;
}

// ===== ACCESS LOG =====
export interface AccessLogEntry {
  id: string;
  organizationName: string;
  organizationType: Organization['type'];
  dataCategory: DataCategory;
  purpose: UsePurpose;
  timestamp: string;
  accessedBy?: string;
}
