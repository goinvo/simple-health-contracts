import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ConsentItem, DATA_CATEGORY_LABELS, USE_PURPOSE_LABELS } from '@/src/schema/types';
import { colors, spacing, radii } from '@/src/theme/tokens';
import { Toggle } from '@/src/components/ui/Toggle';
import { Badge } from '@/src/components/ui/Badge';
import { Typography } from '@/src/components/ui/Typography';
import { formatDaysRemaining } from '@/src/utils/format';

interface ConsentToggleProps {
  item: ConsentItem;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function ConsentToggle({ item, value, onValueChange }: ConsentToggleProps) {
  const expiresAt = item.expiresAfterDays
    ? new Date(Date.now() + item.expiresAfterDays * 24 * 60 * 60 * 1000).toISOString()
    : undefined;

  return (
    <View style={styles.container}>
      <View style={styles.badges}>
        <Badge
          text={DATA_CATEGORY_LABELS[item.dataCategory]}
          size="sm"
        />
        <Badge
          text={USE_PURPOSE_LABELS[item.purpose]}
          size="sm"
        />
      </View>
      <Toggle
        value={value}
        onValueChange={onValueChange}
        label={item.description}
        disabled={item.required}
        locked={item.required}
        lockReason={item.required ? 'Required for service — cannot be disabled' : undefined}
      />
      {item.thirdParties && item.thirdParties.length > 0 && (
        <View style={styles.thirdParties}>
          <Typography variant="caption" color="tertiary">
            Shared with:{' '}
            {item.thirdParties.map((tp) => tp.name).join(', ')}
          </Typography>
        </View>
      )}
      {expiresAt && (
        <View style={styles.expiry}>
          <FontAwesome name="clock-o" size={12} color={colors.text.tertiary} style={{ marginRight: 4 }} />
          <Typography variant="caption" color="tertiary">
            {formatDaysRemaining(expiresAt)}
          </Typography>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface.card,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.surface.border,
  },
  badges: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  thirdParties: {
    marginTop: spacing.xs,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.surface.divider,
  },
  expiry: {
    marginTop: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
