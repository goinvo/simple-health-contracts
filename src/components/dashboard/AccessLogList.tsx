import React, { useState } from 'react';
import { View, Pressable, StyleSheet, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  AccessLogEntry,
  DataCategory,
  DATA_CATEGORY_LABELS,
} from '@/src/schema/types';
import { colors, spacing, radii, shadows } from '@/src/theme/tokens';
import { Typography } from '@/src/components/ui/Typography';
import { Badge } from '@/src/components/ui/Badge';
import { formatRelativeTime } from '@/src/utils/format';

interface AccessLogListProps {
  entries: AccessLogEntry[];
}

type IconName = React.ComponentProps<typeof FontAwesome>['name'];

const orgIconNames: Record<string, IconName> = {
  hospital: 'hospital-o',
  telehealth: 'mobile-phone',
  research: 'flask',
  clinic: 'medkit',
  insurer: 'building-o',
  pharmacy: 'plus-square-o',
};

export function AccessLogList({ entries }: AccessLogListProps) {
  const [filter, setFilter] = useState<DataCategory | null>(null);

  const categories = [...new Set(entries.map((e) => e.dataCategory))];
  const filtered = filter
    ? entries.filter((e) => e.dataCategory === filter)
    : entries;

  return (
    <View style={styles.container}>
      <Typography variant="h3" color="primary" style={styles.title}>
        Access Log
      </Typography>

      {/* Filter chips */}
      <View style={styles.filters}>
        <Pressable
          style={[styles.filterChip, !filter && styles.filterChipActive]}
          onPress={() => setFilter(null)}
        >
          <Typography
            variant="caption"
            style={[styles.filterText, !filter ? styles.filterTextActive : undefined]}
          >
            All
          </Typography>
        </Pressable>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            style={[
              styles.filterChip,
              filter === cat && styles.filterChipActive,
              filter === cat && {
                backgroundColor: colors.dataCategory[cat],
              },
            ]}
            onPress={() => setFilter(filter === cat ? null : cat)}
          >
            <Typography
              variant="caption"
              style={[
                styles.filterText,
                filter === cat ? styles.filterTextActive : undefined,
              ]}
            >
              {DATA_CATEGORY_LABELS[cat]}
            </Typography>
          </Pressable>
        ))}
      </View>

      {/* Log entries */}
      {filtered.map((entry) => {
        const iconName = orgIconNames[entry.organizationType] || ('building' as IconName);
        return (
          <View key={entry.id} style={styles.entry}>
            <View style={styles.entryIcon}>
              <FontAwesome name={iconName} size={18} color={colors.text.secondary} />
            </View>
            <View style={styles.entryContent}>
              <Typography variant="bodyBold" color="primary" numberOfLines={1}>
                {entry.organizationName}
              </Typography>
              <View style={styles.entryMeta}>
                <Badge
                  text={DATA_CATEGORY_LABELS[entry.dataCategory]}
                  size="sm"
                />
                <Typography variant="caption" color="tertiary">
                  {formatRelativeTime(entry.timestamp)}
                </Typography>
              </View>
              {entry.accessedBy && (
                <Typography variant="caption" color="secondary" numberOfLines={1}>
                  {entry.accessedBy}
                </Typography>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  title: {
    marginBottom: spacing.md,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    backgroundColor: colors.surface.card,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  filterText: {
    color: colors.text.secondary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.text.inverse,
  },
  entry: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.surface.card,
    borderRadius: radii.md,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  entryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  entryContent: {
    flex: 1,
  },
  entryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
});
