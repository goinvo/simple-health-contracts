import React from 'react';
import { Switch, View, StyleSheet } from 'react-native';
import { colors } from '@/src/theme/tokens';
import { Typography } from './Typography';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  locked?: boolean;
  lockReason?: string;
}

export function Toggle({
  value,
  onValueChange,
  label,
  description,
  disabled,
  locked,
  lockReason,
}: ToggleProps) {
  const isDisabled = disabled || locked;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {label && (
          <Typography
            variant="bodyBold"
            color={isDisabled ? 'tertiary' : 'primary'}
          >
            {label}
          </Typography>
        )}
        {description && (
          <Typography variant="caption" color="secondary" style={styles.description}>
            {description}
          </Typography>
        )}
        {locked && lockReason && (
          <Typography variant="caption" color="tertiary" style={styles.lockReason}>
            {lockReason}
          </Typography>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={isDisabled}
        trackColor={{
          false: colors.surface.border,
          true: colors.accent[500],
        }}
        thumbColor={value ? '#FFFFFF' : '#F4F3F4'}
        ios_backgroundColor={colors.surface.border}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  description: {
    marginTop: 2,
  },
  lockReason: {
    marginTop: 2,
    fontStyle: 'italic',
  },
});
