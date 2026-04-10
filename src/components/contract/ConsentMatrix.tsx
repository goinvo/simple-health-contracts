import React from 'react';
import { View, ScrollView, Switch, StyleSheet } from 'react-native';
import {
  ConsentItem,
  DataCategory,
  UsePurpose,
  DATA_CATEGORY_LABELS,
  USE_PURPOSE_LABELS,
} from '@/src/schema/types';
import { ConsentState } from '@/src/schema/consent';
import { colors, spacing, radii } from '@/src/theme/tokens';
import { Typography } from '@/src/components/ui/Typography';

interface ConsentMatrixProps {
  items: ConsentItem[];
  consentState: ConsentState;
  onToggle: (consentItemId: string, value: boolean) => void;
}

export function ConsentMatrix({ items, consentState, onToggle }: ConsentMatrixProps) {
  // Build unique categories and purposes from actual items
  const categories = [...new Set(items.map((i) => i.dataCategory))];
  const purposes = [...new Set(items.map((i) => i.purpose))];

  const getItem = (category: DataCategory, purpose: UsePurpose) =>
    items.find((i) => i.dataCategory === category && i.purpose === purpose);

  return (
    <View style={styles.container}>
      <Typography variant="h3" color="primary" style={styles.title}>
        Consent Matrix
      </Typography>
      <Typography variant="caption" color="tertiary" style={styles.subtitle}>
        Control exactly what data is used for each purpose
      </Typography>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Header row */}
          <View style={styles.row}>
            <View style={styles.stickyCell}>
              <Typography variant="label" color="tertiary">
                DATA \ PURPOSE
              </Typography>
            </View>
            {purposes.map((purpose) => (
              <View key={purpose} style={styles.headerCell}>
                <Typography variant="label" color="secondary" style={styles.headerText}>
                  {USE_PURPOSE_LABELS[purpose]}
                </Typography>
              </View>
            ))}
          </View>

          {/* Data rows */}
          {categories.map((category) => {
            const categoryColor = colors.dataCategory[category] || colors.primary[500];
            return (
              <View key={category} style={styles.row}>
                <View style={[styles.stickyCell, { borderLeftColor: categoryColor, borderLeftWidth: 3 }]}>
                  <Typography variant="caption" color="primary" style={styles.categoryLabel}>
                    {DATA_CATEGORY_LABELS[category]}
                  </Typography>
                </View>
                {purposes.map((purpose) => {
                  const item = getItem(category, purpose);
                  if (!item) {
                    return (
                      <View key={purpose} style={styles.cell}>
                        <Typography variant="caption" color="tertiary">—</Typography>
                      </View>
                    );
                  }
                  return (
                    <View key={purpose} style={styles.cell}>
                      <Switch
                        value={consentState[item.id] ?? item.defaultValue}
                        onValueChange={(v) => onToggle(item.id, v)}
                        disabled={item.required}
                        trackColor={{
                          false: colors.surface.border,
                          true: item.required ? colors.text.tertiary : colors.accent[500],
                        }}
                        style={styles.switch}
                      />
                      {item.required && (
                        <Typography variant="label" color="tertiary" style={styles.requiredLabel}>
                          REQ
                        </Typography>
                      )}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.surface.card,
    borderRadius: radii.lg,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.divider,
  },
  stickyCell: {
    width: 120,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    justifyContent: 'center',
    backgroundColor: colors.surface.card,
  },
  headerCell: {
    width: 100,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 10,
  },
  cell: {
    width: 100,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: {
    fontWeight: '600',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  requiredLabel: {
    fontSize: 9,
    marginTop: -2,
  },
});
