import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii, spacing } from '@/src/theme/tokens';
import { Typography } from './Typography';

interface BadgeProps {
  text: string;
  style?: ViewStyle;
  size?: 'sm' | 'md';
}

export function Badge({ text, style, size = 'sm' }: BadgeProps) {
  return (
    <View
      style={[
        styles.base,
        size === 'md' ? styles.md : undefined,
        style,
      ]}
    >
      <Typography
        variant="label"
        style={[
          styles.text,
          size === 'md' ? styles.textMd : undefined,
        ]}
      >
        {text}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.full,
    alignSelf: 'flex-start',
    backgroundColor: '#F1F1F1',
  },
  md: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  text: {
    fontSize: 11,
    textTransform: 'uppercase',
    color: '#4A4A4A',
  },
  textMd: {
    fontSize: 12,
  },
});
