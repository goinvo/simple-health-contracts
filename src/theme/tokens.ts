export const colors = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A5F',
  },
  accent: {
    50: '#F0FDFA',
    100: '#CCFBF1',
    500: '#14B8A6',
    600: '#0D9488',
    700: '#0F766E',
  },
  sentiment: {
    positive: '#10B981',
    positiveLight: '#D1FAE5',
    neutral: '#6B7280',
    neutralLight: '#F3F4F6',
    caution: '#F59E0B',
    cautionLight: '#FEF3C7',
    warning: '#EF4444',
    warningLight: '#FEE2E2',
  },
  dataCategory: {
    demographics: '#8B5CF6',
    vitals: '#EC4899',
    'lab-results': '#F97316',
    imaging: '#06B6D4',
    'mental-health': '#6366F1',
    genetic: '#D946EF',
    prescriptions: '#84CC16',
    billing: '#78716C',
    'notes-clinical': '#0EA5E9',
    'device-data': '#14B8A6',
  } as Record<string, string>,
  surface: {
    background: '#F8FAFC',
    card: '#FFFFFF',
    elevated: '#FFFFFF',
    border: '#E2E8F0',
    divider: '#F1F5F9',
  },
  text: {
    primary: '#0F172A',
    secondary: '#475569',
    tertiary: '#94A3B8',
    inverse: '#FFFFFF',
  },
  diff: {
    added: '#D1FAE5',
    addedText: '#065F46',
    removed: '#FEE2E2',
    removedText: '#991B1B',
    modified: '#FEF3C7',
    modifiedText: '#92400E',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
  h2: { fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodyBold: { fontSize: 16, fontWeight: '600' as const, lineHeight: 24 },
  caption: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18 },
  legal: { fontSize: 14, fontWeight: '400' as const, lineHeight: 22 },
  label: { fontSize: 12, fontWeight: '600' as const, lineHeight: 16, letterSpacing: 0.5 },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
};
