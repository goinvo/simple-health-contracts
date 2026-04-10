import { DynamicContract } from '@/src/schema/types';

export const telehealthPlusV1: DynamicContract = {
  id: 'telehealth-plus',
  version: '1.0.0',
  metadata: {
    title: 'TeleHealth Plus Service Agreement',
    organization: {
      id: 'org-telehealth',
      name: 'TeleHealth Plus',
      type: 'telehealth',
      contactEmail: 'privacy@telehealthplus.com',
      dpo: 'Maria Lopez, Chief Privacy Officer',
    },
    effectiveDate: '2025-06-01T00:00:00Z',
    jurisdiction: 'United States (All States)',
    regulatoryFramework: ['HIPAA'],
    lastUpdated: '2025-06-01T00:00:00Z',
    tldr: [
      {
        icon: 'shield',
        title: 'Virtual visits are encrypted end-to-end',
        description: 'Your video consultations and messages are encrypted so only you and your doctor can see them.',
        sentiment: 'positive',
        relatedSectionIds: ['sec-telehealth-security'],
      },
      {
        icon: 'cloud',
        title: 'Your data is stored on AWS cloud servers',
        description: 'Medical records are stored on Amazon Web Services servers in the United States with encryption.',
        sentiment: 'neutral',
        relatedSectionIds: ['sec-telehealth-storage'],
      },
      {
        icon: 'bar-chart',
        title: 'Usage analytics are collected',
        description: 'We track app usage patterns to improve the service. This data is anonymized.',
        sentiment: 'caution',
        relatedSectionIds: ['sec-telehealth-analytics'],
      },
    ],
  },
  sections: [
    {
      id: 'sec-telehealth-service',
      title: 'Telehealth Services',
      order: 1,
      relatedConsentItemIds: ['consent-th-treatment'],
      clauses: [
        {
          id: 'clause-th-service-1',
          importance: 'critical',
          layers: {
            legal: 'Patient consents to receive healthcare services via telecommunications technology, including but not limited to synchronous video consultations, asynchronous messaging, remote patient monitoring, and electronic prescribing, subject to the clinical judgment of the treating provider.',
            plain: 'You agree to receive medical care through our app, including video calls with doctors, secure messaging, remote health monitoring, and electronic prescriptions.',
          },
        },
      ],
    },
    {
      id: 'sec-telehealth-security',
      title: 'Data Security',
      order: 2,
      relatedConsentItemIds: [],
      clauses: [
        {
          id: 'clause-th-security-1',
          importance: 'notable',
          layers: {
            legal: 'All telecommunications and data transmissions are secured using TLS 1.3 encryption. Video consultations employ end-to-end encryption (E2EE). Patient data at rest is encrypted using AES-256. The Platform undergoes annual SOC 2 Type II audits and quarterly penetration testing.',
            plain: 'Everything you do on our platform is encrypted. Video calls are end-to-end encrypted (only you and your doctor can see/hear). Your stored data is also encrypted. We have independent security audits every year.',
          },
        },
      ],
    },
    {
      id: 'sec-telehealth-storage',
      title: 'Data Storage & Infrastructure',
      order: 3,
      relatedConsentItemIds: ['consent-th-cloud'],
      clauses: [
        {
          id: 'clause-th-storage-1',
          importance: 'notable',
          layers: {
            legal: 'Patient data is stored on Amazon Web Services (AWS) infrastructure located within the United States (us-east-1 and us-west-2 regions). AWS operates under a Business Associate Agreement (BAA) with TeleHealth Plus in accordance with HIPAA requirements.',
            plain: 'Your health records are stored on Amazon cloud servers in the US. Amazon has signed a legal agreement to protect your health data according to HIPAA standards.',
          },
        },
      ],
    },
    {
      id: 'sec-telehealth-analytics',
      title: 'Analytics & Improvement',
      order: 4,
      relatedConsentItemIds: ['consent-th-analytics'],
      clauses: [
        {
          id: 'clause-th-analytics-1',
          importance: 'standard',
          layers: {
            legal: 'The Platform collects anonymized usage analytics including session duration, feature utilization, and user interaction patterns for purposes of service improvement and quality assurance. Such analytics data is stripped of all PHI identifiers prior to processing.',
            plain: 'We track how people use the app (which features, how long, etc.) to make it better. This data is anonymized first — we remove anything that could identify you.',
          },
        },
      ],
    },
    {
      id: 'sec-telehealth-sharing',
      title: 'Third-Party Services',
      order: 5,
      relatedConsentItemIds: ['consent-th-cloud', 'consent-th-analytics'],
      clauses: [
        {
          id: 'clause-th-sharing-1',
          importance: 'notable',
          layers: {
            legal: 'The following third-party service providers operate as Business Associates: Amazon Web Services (infrastructure), Stripe Inc. (payment processing), and Mixpanel Inc. (anonymized analytics). Each maintains a current BAA with TeleHealth Plus.',
            plain: 'Three outside companies help run our service: Amazon (stores data), Stripe (handles payments), and Mixpanel (analyzes anonymized app usage). All have signed agreements to protect your data.',
          },
        },
      ],
    },
    {
      id: 'sec-telehealth-rights',
      title: 'Your Data Rights',
      order: 6,
      relatedConsentItemIds: [],
      clauses: [
        {
          id: 'clause-th-rights-1',
          importance: 'critical',
          layers: {
            legal: 'Patient retains all rights afforded under HIPAA, including the right to access, amend, and receive an accounting of disclosures of PHI. Additionally, Patient may request data portability in FHIR R4 format. Requests shall be fulfilled within thirty (30) calendar days.',
            plain: 'You can access, correct, and download all your health data. We support the FHIR standard, so your data is portable — you can take it to any other provider. Requests are fulfilled within 30 days.',
          },
        },
      ],
    },
  ],
  consentItems: [
    {
      id: 'consent-th-treatment',
      dataCategory: 'demographics',
      purpose: 'treatment',
      description: 'Share personal information with your telehealth providers for care.',
      required: true,
      defaultValue: true,
      relatedClauseIds: ['clause-th-service-1'],
    },
    {
      id: 'consent-th-vitals',
      dataCategory: 'vitals',
      purpose: 'treatment',
      description: 'Share vitals from connected devices with your care provider.',
      required: false,
      defaultValue: true,
      relatedClauseIds: ['clause-th-service-1'],
    },
    {
      id: 'consent-th-rx',
      dataCategory: 'prescriptions',
      purpose: 'treatment',
      description: 'Allow providers to view your prescription history and send new prescriptions.',
      required: true,
      defaultValue: true,
      relatedClauseIds: ['clause-th-service-1'],
    },
    {
      id: 'consent-th-cloud',
      dataCategory: 'notes-clinical',
      purpose: 'third-party-sharing',
      description: 'Store your clinical notes on AWS cloud infrastructure.',
      required: true,
      defaultValue: true,
      relatedClauseIds: ['clause-th-storage-1', 'clause-th-sharing-1'],
      thirdParties: [{ name: 'Amazon Web Services', purpose: 'Data storage', jurisdiction: 'United States' }],
    },
    {
      id: 'consent-th-analytics',
      dataCategory: 'device-data',
      purpose: 'analytics',
      description: 'Allow anonymized app usage data to be analyzed for service improvement.',
      required: false,
      defaultValue: false,
      relatedClauseIds: ['clause-th-analytics-1', 'clause-th-sharing-1'],
      thirdParties: [{ name: 'Mixpanel Inc.', purpose: 'Analytics', jurisdiction: 'United States' }],
    },
    {
      id: 'consent-th-billing',
      dataCategory: 'billing',
      purpose: 'billing',
      description: 'Process payments through Stripe for telehealth services.',
      required: true,
      defaultValue: true,
      relatedClauseIds: ['clause-th-sharing-1'],
      thirdParties: [{ name: 'Stripe Inc.', purpose: 'Payment processing', jurisdiction: 'United States' }],
    },
  ],
  dataFlows: [
    {
      id: 'flow-th-aws',
      source: { entity: 'TeleHealth Plus', system: 'Platform', location: 'US' },
      destination: { entity: 'Amazon Web Services', system: 'Cloud Storage', location: 'US-East / US-West' },
      dataCategories: ['demographics', 'vitals', 'prescriptions', 'notes-clinical'],
      purpose: 'third-party-sharing',
      encrypted: true,
      retentionDays: 2555,
      legalBasis: 'Business Associate Agreement',
      relatedConsentItemId: 'consent-th-cloud',
    },
    {
      id: 'flow-th-stripe',
      source: { entity: 'TeleHealth Plus', system: 'Billing', location: 'US' },
      destination: { entity: 'Stripe Inc.', system: 'Payment Processing', location: 'US' },
      dataCategories: ['billing'],
      purpose: 'billing',
      encrypted: true,
      retentionDays: 1825,
      legalBasis: 'Business Associate Agreement',
      relatedConsentItemId: 'consent-th-billing',
    },
    {
      id: 'flow-th-mixpanel',
      source: { entity: 'TeleHealth Plus', system: 'App', location: 'US' },
      destination: { entity: 'Mixpanel Inc.', system: 'Analytics', location: 'US' },
      dataCategories: ['device-data'],
      purpose: 'analytics',
      encrypted: true,
      retentionDays: 365,
      legalBasis: 'Business Associate Agreement',
      relatedConsentItemId: 'consent-th-analytics',
    },
  ],
  signatures: [],
};

// V2 — adds AI training clause (the high-impact diff)
export const telehealthPlusV2: DynamicContract = {
  ...telehealthPlusV1,
  version: '2.0.0',
  previousVersion: '1.0.0',
  metadata: {
    ...telehealthPlusV1.metadata,
    effectiveDate: '2026-03-01T00:00:00Z',
    lastUpdated: '2026-03-01T00:00:00Z',
    tldr: [
      ...telehealthPlusV1.metadata.tldr,
      {
        icon: 'microchip',
        title: 'NEW: Your data may train AI models',
        description: 'TeleHealth Plus now uses de-identified patient data to train diagnostic AI. You can opt out.',
        sentiment: 'warning',
        relatedSectionIds: ['sec-telehealth-ai'],
      },
      {
        icon: 'share-alt',
        title: 'NEW: Data shared with partner hospitals',
        description: 'For referrals and continuity of care, your records may be shared with in-network hospitals.',
        sentiment: 'caution',
        relatedSectionIds: ['sec-telehealth-sharing'],
      },
    ],
  },
  sections: [
    ...telehealthPlusV1.sections,
    {
      id: 'sec-telehealth-ai',
      title: 'AI & Machine Learning',
      order: 7,
      relatedConsentItemIds: ['consent-th-ai-training'],
      clauses: [
        {
          id: 'clause-th-ai-1',
          importance: 'critical',
          layers: {
            legal: 'TeleHealth Plus utilizes de-identified patient data to develop, train, and validate machine learning models for diagnostic assistance, treatment recommendation, and clinical decision support. De-identification is performed using Expert Determination methodology. Patients may opt out of contributing data to AI model training without impact on service availability or quality.',
            plain: 'We\'re now using anonymized patient data to train AI that helps doctors make better diagnoses and treatment decisions. Your personal information is removed before data is used. You can say no to this without affecting your care.',
          },
          diff: {
            changeType: 'added',
            impactSummary: 'NEW: Your health data may now be used to train artificial intelligence models. This is a significant new use of your data that was not in the previous agreement. You can opt out.',
            impactLevel: 'high',
          },
        },
        {
          id: 'clause-th-ai-2',
          importance: 'notable',
          layers: {
            legal: 'AI-generated insights shall be used solely as clinical decision support and shall not replace the independent clinical judgment of licensed healthcare providers. All AI model outputs are subject to human review prior to clinical application.',
            plain: 'The AI only helps doctors — it doesn\'t replace them. A real doctor always reviews any AI suggestions before they affect your care.',
          },
          diff: {
            changeType: 'added',
            impactSummary: 'Clarifies that AI is used as a tool to assist doctors, not replace them.',
            impactLevel: 'low',
          },
        },
      ],
    },
  ],
  consentItems: [
    ...telehealthPlusV1.consentItems,
    {
      id: 'consent-th-ai-training',
      dataCategory: 'notes-clinical',
      purpose: 'ai-training',
      description: 'Allow de-identified clinical data to be used for training AI diagnostic models.',
      required: false,
      defaultValue: false,
      relatedClauseIds: ['clause-th-ai-1', 'clause-th-ai-2'],
      thirdParties: [
        { name: 'TeleHealth Plus AI Lab', purpose: 'AI model training', jurisdiction: 'United States' },
      ],
    },
    {
      id: 'consent-th-ai-vitals',
      dataCategory: 'vitals',
      purpose: 'ai-training',
      description: 'Allow de-identified vitals data to improve AI health monitoring accuracy.',
      required: false,
      defaultValue: false,
      relatedClauseIds: ['clause-th-ai-1'],
    },
    {
      id: 'consent-th-hospital-sharing',
      dataCategory: 'notes-clinical',
      purpose: 'third-party-sharing',
      description: 'Share clinical notes with in-network hospitals for referrals and care continuity.',
      required: false,
      defaultValue: false,
      expiresAfterDays: 365,
      renewalPromptDays: 30,
      relatedClauseIds: ['clause-th-sharing-1'],
      thirdParties: [
        { name: 'In-Network Hospital Partners', purpose: 'Referrals & continuity of care', jurisdiction: 'United States' },
      ],
    },
  ],
  dataFlows: [
    ...telehealthPlusV1.dataFlows,
    {
      id: 'flow-th-ai',
      source: { entity: 'TeleHealth Plus', system: 'De-identification Service', location: 'US' },
      destination: { entity: 'TeleHealth Plus AI Lab', system: 'ML Training Pipeline', location: 'US-West' },
      dataCategories: ['notes-clinical', 'vitals'],
      purpose: 'ai-training',
      encrypted: true,
      retentionDays: 1095,
      legalBasis: 'Patient consent (opt-in)',
      relatedConsentItemId: 'consent-th-ai-training',
    },
  ],
  signatures: [],
};
