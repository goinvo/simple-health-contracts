import { ConsentItem, ConsentSnapshot, DataCategory, UsePurpose } from './types';

export interface ConsentState {
  [consentItemId: string]: boolean;
}

export function buildDefaultConsentState(items: ConsentItem[]): ConsentState {
  const state: ConsentState = {};
  for (const item of items) {
    state[item.id] = item.required ? true : item.defaultValue;
  }
  return state;
}

export function getConsentSnapshot(
  items: ConsentItem[],
  state: ConsentState
): ConsentSnapshot[] {
  return items.map((item) => ({
    consentItemId: item.id,
    granted: state[item.id] ?? item.defaultValue,
    expiresAt: item.expiresAfterDays
      ? new Date(
          Date.now() + item.expiresAfterDays * 24 * 60 * 60 * 1000
        ).toISOString()
      : undefined,
  }));
}

export function countGrantedByCategory(
  items: ConsentItem[],
  state: ConsentState
): { category: DataCategory; granted: number; total: number }[] {
  const map = new Map<DataCategory, { granted: number; total: number }>();

  for (const item of items) {
    const entry = map.get(item.dataCategory) || { granted: 0, total: 0 };
    entry.total++;
    if (state[item.id]) entry.granted++;
    map.set(item.dataCategory, entry);
  }

  return Array.from(map.entries()).map(([category, counts]) => ({
    category,
    ...counts,
  }));
}

export function countGrantedByPurpose(
  items: ConsentItem[],
  state: ConsentState
): { purpose: UsePurpose; granted: number; total: number }[] {
  const map = new Map<UsePurpose, { granted: number; total: number }>();

  for (const item of items) {
    const entry = map.get(item.purpose) || { granted: 0, total: 0 };
    entry.total++;
    if (state[item.id]) entry.granted++;
    map.set(item.purpose, entry);
  }

  return Array.from(map.entries()).map(([purpose, counts]) => ({
    purpose,
    ...counts,
  }));
}

export function getSharedDataCategories(
  items: ConsentItem[],
  state: ConsentState
): DataCategory[] {
  const categories = new Set<DataCategory>();
  for (const item of items) {
    if (state[item.id]) {
      categories.add(item.dataCategory);
    }
  }
  return Array.from(categories);
}
