import { DynamicContract } from '@/src/schema/types';

export const genomicsResearchStudy: DynamicContract = {
  id: 'genomics-research',
  version: '1.0.0',
  metadata: {
    title: 'Genomic Health Research Consent',
    organization: {
      id: 'org-genomed',
      name: 'GenoMed Research Institute',
      type: 'research',
      contactEmail: 'consent@genomed-research.org',
      dpo: 'Dr. James Park, Research Ethics Officer',
    },
    effectiveDate: '2026-02-01T00:00:00Z',
    expirationDate: '2028-02-01T00:00:00Z',
    jurisdiction: 'United States',
    regulatoryFramework: ['HIPAA', 'state-specific'],
    lastUpdated: '2026-02-01T00:00:00Z',
    tldr: [
      {
        icon: 'heartbeat',
        title: 'Your genetic data is the focus',
        description:
          'This study analyzes your DNA to find markers linked to disease risk. Your genome is handled with the highest level of protection.',
        sentiment: 'neutral',
        relatedSectionIds: ['sec-gen-scope'],
      },
      {
        icon: 'clock-o',
        title: 'All consents expire in 2 years',
        description:
          'Every data-sharing permission in this agreement automatically expires after 2 years. You\'ll be asked to renew if you wish to continue.',
        sentiment: 'positive',
        relatedSectionIds: ['sec-gen-duration'],
      },
      {
        icon: 'user-secret',
        title: 'Your data is de-identified before sharing',
        description:
          'Before any research partner sees your data, all identifying information is stripped. A secure code links your data, not your name.',
        sentiment: 'positive',
        relatedSectionIds: ['sec-gen-deidentification'],
      },
      {
        icon: 'search',
        title: 'Incidental findings may be reported',
        description:
          'If researchers discover something clinically significant in your genetic data, you can choose whether to be notified.',
        sentiment: 'caution',
        relatedSectionIds: ['sec-gen-findings'],
      },
      {
        icon: 'globe',
        title: 'Data shared with 3 research partners',
        description:
          'De-identified data may flow to the National Genomic Database, BioBank Alliance, and PharmaCorp for approved research only.',
        sentiment: 'caution',
        relatedSectionIds: ['sec-gen-partners'],
      },
    ],
  },
  sections: [
    {
      id: 'sec-gen-scope',
      title: 'Research Scope & Purpose',
      order: 1,
      relatedConsentItemIds: ['consent-gen-genetic', 'consent-gen-demo'],
      clauses: [
        {
          id: 'clause-gen-scope-1',
          importance: 'critical',
          layers: {
            legal:
              'This informed consent authorizes GenoMed Research Institute ("the Institute") to collect, sequence, analyze, and store Participant\'s genomic data, including whole genome sequencing (WGS), exome sequencing, and related phenotypic data, for the purpose of identifying genetic variants associated with disease susceptibility, pharmacogenomic responses, and hereditary conditions.',
            plain:
              'You\'re agreeing to let GenoMed read and study your DNA. They\'ll look at your full genetic sequence to find gene variants linked to disease risk, how you respond to medications, and inherited conditions.',
            visual: {
              type: 'data-flow',
              data: {
                nodes: [
                  { id: 'you', label: 'Your DNA Sample', type: 'patient' },
                  { id: 'lab', label: 'GenoMed Lab', type: 'internal' },
                  { id: 'analysis', label: 'Genomic Analysis', type: 'system' },
                  { id: 'findings', label: 'Research Findings', type: 'system' },
                ],
                edges: [
                  { from: 'you', to: 'lab', label: 'Sample collection' },
                  { from: 'lab', to: 'analysis', label: 'Sequencing' },
                  { from: 'analysis', to: 'findings', label: 'Discovery' },
                ],
              },
              caption: 'From your DNA sample to research discoveries',
            },
          },
        },
      ],
    },
    {
      id: 'sec-gen-duration',
      title: 'Study Duration & Consent Expiry',
      order: 2,
      relatedConsentItemIds: [],
      clauses: [
        {
          id: 'clause-gen-duration-1',
          importance: 'critical',
          layers: {
            legal:
              'This consent is effective for a period of twenty-four (24) months from the date of execution. Upon expiration, all active data sharing shall cease unless Participant provides renewed written consent. Participant may withdraw consent at any time prior to expiration by written notice to the Research Ethics Officer.',
            plain:
              'This agreement lasts 2 years. After that, all data sharing stops automatically unless you actively choose to renew. You can also withdraw at any time before that by contacting the Research Ethics Officer.',
          },
        },
      ],
    },
    {
      id: 'sec-gen-deidentification',
      title: 'De-identification & Data Protection',
      order: 3,
      relatedConsentItemIds: [],
      clauses: [
        {
          id: 'clause-gen-deid-1',
          importance: 'critical',
          layers: {
            legal:
              'Prior to inclusion in any research dataset, Participant\'s genomic and phenotypic data shall be de-identified using a two-stage process: (1) removal of all 18 HIPAA identifiers, and (2) assignment of a cryptographic pseudonym using HMAC-SHA256. The key mapping Participant identity to pseudonym is stored in an air-gapped system accessible only to the Principal Investigator and the Research Ethics Officer.',
            plain:
              'Before your data enters any research dataset, we remove everything that identifies you (name, birthday, etc.) and replace it with a secure code. The link between you and your code is locked in a separate, offline computer that only two people can access.',
            visual: {
              type: 'data-flow',
              data: {
                nodes: [
                  { id: 'raw', label: 'Your Identified Data', type: 'patient' },
                  { id: 'strip', label: 'Remove Identifiers', type: 'system' },
                  { id: 'code', label: 'Assign Secure Code', type: 'system' },
                  { id: 'deidentified', label: 'De-identified Dataset', type: 'internal' },
                ],
                edges: [
                  { from: 'raw', to: 'strip', label: 'Stage 1' },
                  { from: 'strip', to: 'code', label: 'Stage 2' },
                  { from: 'code', to: 'deidentified', label: 'Research-ready' },
                ],
              },
              caption: 'Two-stage de-identification process',
            },
          },
        },
      ],
    },
    {
      id: 'sec-gen-findings',
      title: 'Incidental Findings',
      order: 4,
      relatedConsentItemIds: ['consent-gen-findings'],
      clauses: [
        {
          id: 'clause-gen-findings-1',
          importance: 'critical',
          layers: {
            legal:
              'In the course of genomic analysis, clinically significant incidental findings may be identified, including but not limited to pathogenic variants associated with actionable hereditary conditions as defined by the ACMG Secondary Findings list (v3.2). Participant may elect to receive or decline notification of such findings.',
            plain:
              'While studying your DNA, researchers might accidentally discover something medically important — like a gene that increases cancer risk. You get to choose whether you want to be told about these discoveries or not.',
          },
        },
      ],
    },
    {
      id: 'sec-gen-partners',
      title: 'Research Partners & Data Sharing',
      order: 5,
      relatedConsentItemIds: ['consent-gen-natdb', 'consent-gen-biobank', 'consent-gen-pharma'],
      clauses: [
        {
          id: 'clause-gen-partners-1',
          importance: 'critical',
          layers: {
            legal:
              'De-identified genomic data may be shared with the following research collaborators under executed Data Use Agreements: (a) National Genomic Database (NIH-funded, US), (b) BioBank Alliance (international research consortium, EU/US), and (c) PharmaCorp Inc. (pharmaceutical research, US). Each collaborator is bound by restrictions on re-identification, commercial use, and secondary distribution.',
            plain:
              'Your anonymized genetic data may be shared with three research partners:\n\n1. National Genomic Database (government-funded, US)\n2. BioBank Alliance (international research group)\n3. PharmaCorp (pharmaceutical company, US)\n\nAll must sign agreements promising not to try to identify you, and they can only use the data for approved research.',
          },
        },
      ],
    },
    {
      id: 'sec-gen-rights',
      title: 'Participant Rights & Data Ownership',
      order: 6,
      relatedConsentItemIds: [],
      clauses: [
        {
          id: 'clause-gen-rights-1',
          importance: 'critical',
          layers: {
            legal:
              'Participant retains full ownership of their genomic data. The Institute is granted a limited, revocable license to use de-identified derivatives for research purposes as specified herein. Upon withdrawal, the Institute shall: (a) cease all active use of Participant\'s data within 30 days, (b) remove Participant\'s data from active research datasets within 60 days, and (c) provide written confirmation of data removal within 90 days. Data already incorporated into published research findings or federated databases may not be retroactively removed.',
            plain:
              'Your DNA data belongs to you. You\'re giving GenoMed permission to use anonymized copies for research — but you can take that permission back anytime. When you withdraw:\n\n- Active use stops within 30 days\n- Your data is removed from research datasets within 60 days\n- You get written proof it\'s been removed within 90 days\n\nData already in published studies can\'t be un-published, but no new use will occur.',
            visual: {
              type: 'timeline',
              data: {
                events: [
                  { label: 'You withdraw consent', offset: 0 },
                  { label: 'Active use stops', offset: 30, unit: 'days' },
                  { label: 'Removed from datasets', offset: 60, unit: 'days' },
                  { label: 'Written confirmation', offset: 90, unit: 'days' },
                ],
              },
              caption: 'What happens when you withdraw consent',
            },
          },
        },
      ],
    },
  ],
  consentItems: [
    {
      id: 'consent-gen-demo',
      dataCategory: 'demographics',
      purpose: 'research',
      description: 'Provide basic demographics (age range, sex, ethnicity) for research stratification.',
      required: true,
      defaultValue: true,
      expiresAfterDays: 730,
      renewalPromptDays: 60,
      relatedClauseIds: ['clause-gen-scope-1'],
    },
    {
      id: 'consent-gen-genetic',
      dataCategory: 'genetic',
      purpose: 'research',
      description: 'Allow whole genome sequencing and analysis of your DNA sample.',
      required: true,
      defaultValue: true,
      expiresAfterDays: 730,
      renewalPromptDays: 60,
      relatedClauseIds: ['clause-gen-scope-1', 'clause-gen-deid-1'],
    },
    {
      id: 'consent-gen-vitals',
      dataCategory: 'vitals',
      purpose: 'research',
      description: 'Share health vitals to correlate with genetic markers.',
      required: false,
      defaultValue: false,
      expiresAfterDays: 730,
      renewalPromptDays: 60,
      relatedClauseIds: ['clause-gen-scope-1'],
    },
    {
      id: 'consent-gen-labs',
      dataCategory: 'lab-results',
      purpose: 'research',
      description: 'Share lab results to validate genomic findings with clinical data.',
      required: false,
      defaultValue: false,
      expiresAfterDays: 730,
      renewalPromptDays: 60,
      relatedClauseIds: ['clause-gen-scope-1'],
    },
    {
      id: 'consent-gen-findings',
      dataCategory: 'genetic',
      purpose: 'treatment',
      description: 'Receive notifications about clinically significant incidental findings in your genetic data.',
      required: false,
      defaultValue: true,
      relatedClauseIds: ['clause-gen-findings-1'],
    },
    {
      id: 'consent-gen-natdb',
      dataCategory: 'genetic',
      purpose: 'third-party-sharing',
      description: 'Share de-identified genetic data with the National Genomic Database (NIH).',
      required: false,
      defaultValue: false,
      expiresAfterDays: 730,
      renewalPromptDays: 60,
      relatedClauseIds: ['clause-gen-partners-1'],
      thirdParties: [{ name: 'National Genomic Database', purpose: 'Population genomics research', jurisdiction: 'United States' }],
    },
    {
      id: 'consent-gen-biobank',
      dataCategory: 'genetic',
      purpose: 'third-party-sharing',
      description: 'Share de-identified genetic data with BioBank Alliance for international research.',
      required: false,
      defaultValue: false,
      expiresAfterDays: 730,
      renewalPromptDays: 60,
      relatedClauseIds: ['clause-gen-partners-1'],
      thirdParties: [{ name: 'BioBank Alliance', purpose: 'International genomics research', jurisdiction: 'EU / United States' }],
    },
    {
      id: 'consent-gen-pharma',
      dataCategory: 'genetic',
      purpose: 'third-party-sharing',
      description: 'Share de-identified genetic data with PharmaCorp for drug development research.',
      required: false,
      defaultValue: false,
      expiresAfterDays: 730,
      renewalPromptDays: 60,
      relatedClauseIds: ['clause-gen-partners-1'],
      thirdParties: [{ name: 'PharmaCorp Inc.', purpose: 'Pharmaceutical research & drug development', jurisdiction: 'United States' }],
    },
    {
      id: 'consent-gen-recontact',
      dataCategory: 'demographics',
      purpose: 'research',
      description: 'Allow researchers to re-contact you for follow-up studies or additional samples.',
      required: false,
      defaultValue: false,
      expiresAfterDays: 730,
      renewalPromptDays: 60,
      relatedClauseIds: ['clause-gen-scope-1'],
    },
  ],
  dataFlows: [
    {
      id: 'flow-gen-sample',
      source: { entity: 'Participant', location: 'US' },
      destination: { entity: 'GenoMed Research Institute', system: 'Genomics Lab', location: 'US-East' },
      dataCategories: ['genetic', 'demographics'],
      purpose: 'research',
      encrypted: true,
      retentionDays: 730,
      legalBasis: 'Informed consent',
      relatedConsentItemId: 'consent-gen-genetic',
    },
    {
      id: 'flow-gen-deid',
      source: { entity: 'GenoMed Research Institute', system: 'Genomics Lab', location: 'US-East' },
      destination: { entity: 'GenoMed Research Institute', system: 'De-identification Service', location: 'US-East' },
      dataCategories: ['genetic'],
      purpose: 'research',
      encrypted: true,
      retentionDays: 730,
      legalBasis: 'Internal processing',
    },
    {
      id: 'flow-gen-natdb',
      source: { entity: 'GenoMed Research Institute', system: 'De-identified Repository', location: 'US-East' },
      destination: { entity: 'National Genomic Database', system: 'Federal Research Repository', location: 'US' },
      dataCategories: ['genetic'],
      purpose: 'third-party-sharing',
      encrypted: true,
      retentionDays: 730,
      legalBasis: 'Data Use Agreement + Patient consent',
      relatedConsentItemId: 'consent-gen-natdb',
    },
    {
      id: 'flow-gen-biobank',
      source: { entity: 'GenoMed Research Institute', system: 'De-identified Repository', location: 'US-East' },
      destination: { entity: 'BioBank Alliance', system: 'International Repository', location: 'EU / US' },
      dataCategories: ['genetic'],
      purpose: 'third-party-sharing',
      encrypted: true,
      retentionDays: 730,
      legalBasis: 'Data Use Agreement + Patient consent',
      relatedConsentItemId: 'consent-gen-biobank',
    },
    {
      id: 'flow-gen-pharma',
      source: { entity: 'GenoMed Research Institute', system: 'De-identified Repository', location: 'US-East' },
      destination: { entity: 'PharmaCorp Inc.', system: 'R&D Platform', location: 'US-West' },
      dataCategories: ['genetic'],
      purpose: 'third-party-sharing',
      encrypted: true,
      retentionDays: 730,
      legalBasis: 'Data Use Agreement + Patient consent',
      relatedConsentItemId: 'consent-gen-pharma',
    },
  ],
  signatures: [],
};
