import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radii } from '@/src/theme/tokens';

interface ProgressBarProps {
  progress: number; // 0-1
  color?: string;
  height?: number;
}

export function ProgressBar({
  progress,
  color = colors.accent[500],
  height = 6,
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <View style={[styles.track, { height }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress * 100}%`,
            backgroundColor: color,
            height,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: colors.surface.border,
    borderRadius: radii.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: radii.full,
  },
});
