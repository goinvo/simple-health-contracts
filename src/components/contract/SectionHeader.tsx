import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { colors, spacing } from '@/src/theme/tokens';
import { Typography } from '@/src/components/ui/Typography';

interface SectionHeaderProps {
  title: string;
  clauseCount: number;
  consentCount: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function SectionHeader({
  title,
  clauseCount,
  consentCount,
  isExpanded,
  onToggle,
}: SectionHeaderProps) {
  return (
    <Pressable style={styles.container} onPress={onToggle}>
      <View style={styles.left}>
        <Typography variant="h3" color="primary">
          {title}
        </Typography>
        <Typography variant="caption" color="tertiary">
          {clauseCount} clause{clauseCount !== 1 ? 's' : ''}
          {consentCount > 0 && ` · ${consentCount} consent${consentCount !== 1 ? 's' : ''}`}
        </Typography>
      </View>
      <Typography variant="h3" color="tertiary">
        {isExpanded ? '▼' : '▶'}
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.divider,
  },
  left: {
    flex: 1,
  },
});
