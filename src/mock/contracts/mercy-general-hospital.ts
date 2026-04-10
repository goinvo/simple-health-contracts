import { DynamicContract } from '@/src/schema/types';

export const mercyGeneralHospital: DynamicContract = {
  id: 'mercy-general',
  version: '3.1.0',
  metadata: {
    title: 'Patient Admission Agreement',
    organization: {
      id: 'org-mercy',
      name: 'Mercy General Hospital',
      type: 'hospital',
      contactEmail: 'privacy@mercygeneral.org',
      dpo: 'Dr. Sarah Chen, Privacy Officer',
    },
    effectiveDate: '2026-01-15T00:00:00Z',
    jurisdiction: 'California, United States',
    regulatoryFramework: ['HIPAA', 'CCPA'],
    lastUpdated: '2026-01-15T00:00:00Z',
    tldr: [
      {
        icon: 'stethoscope',
        title: 'Your care team sees your records',
        description:
          'Doctors, nurses, and specialists involved in your treatment can access your medical information to provide coordinated care.',
        sentiment: 'positive',
        relatedSectionIds: ['sec-privacy'],
      },
      {
        icon: 'lock',
        title: 'Mental health & genetic data are extra-protected',
        description:
          'These sensitive categories require your explicit consent before being shared beyond your primary care team.',
        sentiment: 'positive',
        relatedSectionIds: ['sec-sensitive'],
      },
      {
        icon: 'credit-card',
        title: 'Billing data goes to your insurer',
        description:
          'We share diagnosis codes and procedure information with your insurance company for payment processing.',
        sentiment: 'neutral',
        relatedSectionIds: ['sec-billing'],
      },
      {
        icon: 'eyedropper',
        title: 'Research use requires your opt-in',
        description:
          'Your de-identified data may be used for medical research, but only if you explicitly agree. You can opt out anytime.',
        sentiment: 'caution',
        relatedSectionIds: ['sec-research'],
      },
      {
        icon: 'exchange',
        title: 'A billing processor handles payments',
        description:
          'RevCycle Health, a third-party billing company, processes your payment information under strict data agreements.',
        sentiment: 'caution',
        relatedSectionIds: ['sec-thirdparty'],
      },
    ],
  },
  sections: [
    {
      id: 'sec-admission',
      title: 'Admission & Treatment Consent',
      order: 1,
      relatedConsentItemIds: ['consent-treatment-demo', 'consent-treatment-vitals'],
      clauses: [
        {
          id: 'clause-admission-1',
          importance: 'critical',
          layers: {
            legal:
              'By executing this Agreement, Patient hereby consents to and authorizes the provision of medical treatment, diagnostic procedures, and therapeutic interventions as deemed medically necessary by the attending physician and care team at Mercy General Hospital ("the Facility"), subject to the limitations and conditions set forth herein.',
            plain:
              'By signing this, you agree to let your doctors and care team treat you. This includes tests, procedures, and therapies they believe you need. You can always ask questions or refuse specific treatments.',
            visual: {
              type: 'checklist',
              data: {
                items: [
                  { text: 'Medical examinations and tests', included: true },
                  { text: 'Prescribed medications', included: true },
                  { text: 'Surgical procedures (separate consent required)', included: true },
                  { text: 'Emergency interventions', included: true },
                ],
              },
              caption: 'What your treatment consent covers',
            },
          },
        },
        {
          id: 'clause-admission-2',
          importance: 'notable',
          layers: {
            legal:
              'Patient acknowledges that the practice of medicine is not an exact science and that no guarantees or warranties have been made regarding the results of treatments or examinations performed at the Facility.',
            plain:
              'Medicine isn\'t perfect. Your doctors will do their best, but no one can guarantee specific outcomes from your treatment.',
          },
        },
      ],
    },
    {
      id: 'sec-privacy',
      title: 'Privacy Practices',
      order: 2,
      relatedConsentItemIds: ['consent-treatment-demo', 'consent-treatment-notes'],
      clauses: [
        {
          id: 'clause-privacy-1',
          importance: 'critical',
          layers: {
            legal:
              'In accordance with the Health Insurance Portability and Accountability Act of 1996 ("HIPAA"), 45 C.F.R. Parts 160 and 164, the Facility shall maintain the privacy and security of Patient\'s Protected Health Information ("PHI") and shall not use or disclose PHI except as permitted or required by law or as authorized by Patient.',
            plain:
              'Federal law (HIPAA) requires us to protect your health information. We can only use or share it in specific situations allowed by law, or when you give us permission.',
            visual: {
              type: 'data-flow',
              data: {
                nodes: [
                  { id: 'patient', label: 'You', type: 'patient' },
                  { id: 'ehr', label: 'Your Medical Record', type: 'system' },
                  { id: 'care-team', label: 'Care Team', type: 'internal' },
                ],
                edges: [
                  { from: 'patient', to: 'ehr', label: 'Your information' },
                  { from: 'ehr', to: 'care-team', label: 'Treatment access' },
                ],
              },
              caption: 'How your data flows within the hospital',
            },
          },
        },
        {
          id: 'clause-privacy-2',
          importance: 'standard',
          layers: {
            legal:
              'The Facility maintains electronic health records using industry-standard encryption (AES-256) both at rest and in transit. Access to PHI is restricted to authorized personnel on a minimum necessary basis and is logged and auditable.',
            plain:
              'Your records are stored digitally with strong encryption. Only the staff who need to see your information for their job can access it, and every access is tracked.',
          },
        },
      ],
    },
    {
      id: 'sec-sensitive',
      title: 'Sensitive Health Information',
      order: 3,
      relatedConsentItemIds: ['consent-mental-health', 'consent-genetic'],
      clauses: [
        {
          id: 'clause-sensitive-1',
          importance: 'critical',
          layers: {
            legal:
              'Certain categories of PHI, including but not limited to psychotherapy notes, substance abuse treatment records (42 C.F.R. Part 2), genetic information (GINA), and HIV/AIDS-related information, are subject to heightened protections and shall not be disclosed without specific, written authorization from Patient.',
            plain:
              'Some types of health data get extra protection by law: mental health therapy notes, substance abuse treatment records, genetic test results, and HIV/AIDS information. We cannot share these without your specific, written permission.',
          },
        },
      ],
    },
    {
      id: 'sec-billing',
      title: 'Billing & Insurance',
      order: 4,
      relatedConsentItemIds: ['consent-billing-insurer', 'consent-billing-processor'],
      clauses: [
        {
          id: 'clause-billing-1',
          importance: 'notable',
          layers: {
            legal:
              'Patient authorizes the Facility to submit claims and supporting documentation, including diagnosis codes (ICD-10), procedure codes (CPT), and related clinical information, to Patient\'s health insurance carrier for purposes of obtaining payment for services rendered.',
            plain:
              'We\'ll send your insurance company the information they need to process your claims. This includes your diagnosis codes and what procedures were done, so they can pay for your care.',
            visual: {
              type: 'data-flow',
              data: {
                nodes: [
                  { id: 'hospital', label: 'Mercy General', type: 'internal' },
                  { id: 'insurer', label: 'Your Insurance', type: 'external' },
                  { id: 'processor', label: 'RevCycle Health', type: 'external' },
                ],
                edges: [
                  { from: 'hospital', to: 'insurer', label: 'Claims & codes' },
                  { from: 'hospital', to: 'processor', label: 'Payment data' },
                ],
              },
              caption: 'Who processes your billing information',
            },
          },
        },
      ],
    },
    {
      id: 'sec-research',
      title: 'Research Participation',
      order: 5,
      relatedConsentItemIds: ['consent-research-deidentified', 'consent-research-quality'],
      clauses: [
        {
          id: 'clause-research-1',
          importance: 'notable',
          layers: {
            legal:
              'With Patient\'s consent, de-identified health information may be used for clinical research, quality improvement studies, and public health purposes. De-identification shall be performed in accordance with the Safe Harbor method under 45 C.F.R. § 164.514(b), removing all 18 specified identifiers.',
            plain:
              'If you agree, we can use your health data for medical research — but only after removing all information that could identify you (your name, birthday, address, etc.). This follows strict federal standards for making data anonymous.',
          },
        },
        {
          id: 'clause-research-2',
          importance: 'standard',
          layers: {
            legal:
              'Patient may withdraw consent for research use at any time by submitting written notice to the Privacy Officer. Withdrawal shall not affect data previously contributed to completed studies but shall prevent inclusion in future research activities.',
            plain:
              'You can stop your data from being used in research anytime by contacting our Privacy Officer. Data already used in finished studies can\'t be removed, but it won\'t be used in any new research.',
          },
        },
      ],
    },
    {
      id: 'sec-thirdparty',
      title: 'Third-Party Data Sharing',
      order: 6,
      relatedConsentItemIds: ['consent-billing-processor', 'consent-analytics'],
      clauses: [
        {
          id: 'clause-thirdparty-1',
          importance: 'critical',
          layers: {
            legal:
              'The Facility engages certain third-party service providers ("Business Associates") who may receive, maintain, or transmit PHI on the Facility\'s behalf, subject to Business Associate Agreements in compliance with 45 C.F.R. § 164.502(e) and § 164.504(e). Current Business Associates include: RevCycle Health (billing), CloudMed Analytics (quality metrics), and MedSecure Inc. (data backup).',
            plain:
              'We work with a few outside companies who handle some of your data for us. They\'re legally required to protect your information just like we do. These companies are: RevCycle Health (processes bills), CloudMed Analytics (helps us improve care quality), and MedSecure Inc. (backs up our data securely).',
          },
        },
      ],
    },
    {
      id: 'sec-rights',
      title: 'Your Data Rights',
      order: 7,
      relatedConsentItemIds: [],
      clauses: [
        {
          id: 'clause-rights-1',
          importance: 'critical',
          layers: {
            legal:
              'Patient retains the following rights under HIPAA and applicable state law: (a) the right to access and obtain a copy of PHI; (b) the right to request amendment of PHI; (c) the right to an accounting of disclosures; (d) the right to request restrictions on uses and disclosures; (e) the right to receive confidential communications; and (f) the right to file a complaint with the Facility\'s Privacy Officer or the U.S. Department of Health and Human Services.',
            plain:
              'You have powerful rights over your health data:\n\n1. Get a copy of all your health records\n2. Ask us to fix anything that\'s wrong\n3. See a log of everyone who accessed your data\n4. Ask us to limit how we use your information\n5. Choose how we contact you (email, phone, mail)\n6. File a complaint if you think your privacy was violated',
            visual: {
              type: 'checklist',
              data: {
                items: [
                  { text: 'Access & download your records', included: true },
                  { text: 'Correct inaccurate information', included: true },
                  { text: 'See who accessed your data', included: true },
                  { text: 'Restrict how data is used', included: true },
                  { text: 'Choose communication preferences', included: true },
                  { text: 'File a privacy complaint', included: true },
                ],
              },
              caption: 'Your rights under HIPAA',
            },
          },
        },
      ],
    },
    {
      id: 'sec-retention',
      title: 'Data Retention',
      order: 8,
      relatedConsentItemIds: [],
      clauses: [
        {
          id: 'clause-retention-1',
          importance: 'notable',
          layers: {
            legal:
              'Medical records shall be retained for a minimum period of seven (7) years from the date of last treatment, or as required by applicable state law, whichever is longer. For patients who are minors, records shall be retained until the patient reaches the age of majority plus seven years.',
            plain:
              'We keep your medical records for at least 7 years after your last visit (or longer if state law requires it). For children, records are kept until they turn 18, plus another 7 years.',
            visual: {
              type: 'timeline',
              data: {
                events: [
                  { label: 'Last visit', offset: 0 },
                  { label: 'Minimum retention', offset: 7, unit: 'years' },
                  { label: 'Billing records', offset: 10, unit: 'years' },
                ],
              },
              caption: 'How long your records are kept',
            },
          },
        },
      ],
    },
  ],
  consentItems: [
    {
      id: 'consent-treatment-demo',
      dataCategory: 'demographics',
      purpose: 'treatment',
      description: 'Share your name, age, and contact info with your care team for treatment.',
      required: true,
      defaultValue: true,
      relatedClauseIds: ['clause-admission-1', 'clause-privacy-1'],
    },
    {
      id: 'consent-treatment-vitals',
      dataCategory: 'vitals',
      purpose: 'treatment',
      description: 'Share vital signs (blood pressure, heart rate, temperature) with your care team.',
      required: true,
      defaultValue: true,
      relatedClauseIds: ['clause-admission-1'],
    },
    {
      id: 'consent-treatment-notes',
      dataCategory: 'notes-clinical',
      purpose: 'treatment',
      description: 'Allow clinical notes to be shared among your care team members.',
      required: true,
      defaultValue: true,
      relatedClauseIds: ['clause-privacy-1'],
    },
    {
      id: 'consent-treatment-labs',
      dataCategory: 'lab-results',
      purpose: 'treatment',
      description: 'Share lab results with specialists involved in your care.',
      required: true,
      defaultValue: true,
      relatedClauseIds: ['clause-admission-1'],
    },
    {
      id: 'consent-treatment-imaging',
      dataCategory: 'imaging',
      purpose: 'treatment',
      description: 'Share imaging results (X-rays, MRIs) with your care team.',
      required: true,
      defaultValue: true,
      relatedClauseIds: ['clause-admission-1'],
    },
    {
      id: 'consent-treatment-rx',
      dataCategory: 'prescriptions',
      purpose: 'treatment',
      description: 'Share prescription history to prevent drug interactions.',
      required: true,
      defaultValue: true,
      relatedClauseIds: ['clause-admission-1'],
    },
    {
      id: 'consent-mental-health',
      dataCategory: 'mental-health',
      purpose: 'treatment',
      description: 'Share mental health records with your primary care physician.',
      required: false,
      defaultValue: false,
      relatedClauseIds: ['clause-sensitive-1'],
    },
    {
      id: 'consent-genetic',
      dataCategory: 'genetic',
      purpose: 'treatment',
      description: 'Share genetic test results with specialists for treatment decisions.',
      required: false,
      defaultValue: false,
      relatedClauseIds: ['clause-sensitive-1'],
    },
    {
      id: 'consent-billing-insurer',
      dataCategory: 'billing',
      purpose: 'billing',
      description: 'Send billing codes and clinical summaries to your insurance company.',
      required: true,
      defaultValue: true,
      relatedClauseIds: ['clause-billing-1'],
      thirdParties: [
        {
          name: 'Your Insurance Provider',
          purpose: 'Claims processing and payment',
          jurisdiction: 'United States',
        },
      ],
    },
    {
      id: 'consent-billing-processor',
      dataCategory: 'billing',
      purpose: 'third-party-sharing',
      description: 'Allow RevCycle Health to process your payment information.',
      required: false,
      defaultValue: true,
      relatedClauseIds: ['clause-thirdparty-1'],
      thirdParties: [
        {
          name: 'RevCycle Health',
          purpose: 'Payment processing',
          jurisdiction: 'United States',
        },
      ],
    },
    {
      id: 'consent-research-deidentified',
      dataCategory: 'lab-results',
      purpose: 'research',
      description: 'Allow de-identified lab data to be used in medical research studies.',
      required: false,
      defaultValue: false,
      relatedClauseIds: ['clause-research-1', 'clause-research-2'],
    },
    {
      id: 'consent-research-quality',
      dataCategory: 'vitals',
      purpose: 'quality-improvement',
      description: 'Use your anonymized vitals data to help improve hospital care quality.',
      required: false,
      defaultValue: false,
      relatedClauseIds: ['clause-research-1'],
    },
    {
      id: 'consent-analytics',
      dataCategory: 'demographics',
      purpose: 'analytics',
      description: 'Allow CloudMed Analytics to process anonymized demographic data for care improvement metrics.',
      required: false,
      defaultValue: false,
      relatedClauseIds: ['clause-thirdparty-1'],
      thirdParties: [
        {
          name: 'CloudMed Analytics',
          purpose: 'Quality improvement analytics',
          jurisdiction: 'United States',
        },
      ],
    },
    {
      id: 'consent-device-data',
      dataCategory: 'device-data',
      purpose: 'treatment',
      description: 'Integrate data from connected medical devices (monitors, pumps) into your record.',
      required: false,
      defaultValue: true,
      relatedClauseIds: ['clause-admission-1'],
    },
  ],
  dataFlows: [
    {
      id: 'flow-care-team',
      source: { entity: 'Patient', location: 'US-West' },
      destination: { entity: 'Mercy General Hospital', system: 'EHR', location: 'US-West' },
      dataCategories: ['demographics', 'vitals', 'lab-results', 'imaging', 'prescriptions', 'notes-clinical'],
      purpose: 'treatment',
      encrypted: true,
      legalBasis: 'Treatment consent (HIPAA TPO)',
    },
    {
      id: 'flow-insurer',
      source: { entity: 'Mercy General Hospital', system: 'Billing', location: 'US-West' },
      destination: { entity: 'Insurance Provider', system: 'Claims', location: 'US' },
      dataCategories: ['billing', 'demographics'],
      purpose: 'billing',
      encrypted: true,
      retentionDays: 3650,
      legalBasis: 'Payment operations (HIPAA TPO)',
      relatedConsentItemId: 'consent-billing-insurer',
    },
    {
      id: 'flow-revcycle',
      source: { entity: 'Mercy General Hospital', system: 'Billing', location: 'US-West' },
      destination: { entity: 'RevCycle Health', system: 'Payment Processing', location: 'US-East' },
      dataCategories: ['billing'],
      purpose: 'third-party-sharing',
      encrypted: true,
      retentionDays: 1825,
      legalBasis: 'Business Associate Agreement',
      relatedConsentItemId: 'consent-billing-processor',
    },
    {
      id: 'flow-cloudmed',
      source: { entity: 'Mercy General Hospital', system: 'Analytics', location: 'US-West' },
      destination: { entity: 'CloudMed Analytics', system: 'Analytics Platform', location: 'US-East' },
      dataCategories: ['demographics', 'vitals'],
      purpose: 'analytics',
      encrypted: true,
      retentionDays: 730,
      legalBasis: 'Business Associate Agreement',
      relatedConsentItemId: 'consent-analytics',
    },
    {
      id: 'flow-backup',
      source: { entity: 'Mercy General Hospital', system: 'EHR', location: 'US-West' },
      destination: { entity: 'MedSecure Inc.', system: 'Backup', location: 'US-West' },
      dataCategories: ['demographics', 'vitals', 'lab-results', 'imaging', 'prescriptions', 'notes-clinical'],
      purpose: 'treatment',
      encrypted: true,
      retentionDays: 2555,
      legalBasis: 'Business Associate Agreement',
    },
  ],
  signatures: [],
};
