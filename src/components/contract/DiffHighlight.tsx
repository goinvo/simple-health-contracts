import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ContractClause, ClauseDiff } from '@/src/schema/types';
import { colors, spacing, radii, shadows } from '@/src/theme/tokens';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Typography } from '@/src/components/ui/Typography';

interface DiffHighlightProps {
  clause: ContractClause & { diff: ClauseDiff };
}

const changeTypeStyles: Record<string, { bg: string; textColor: string; label: string; variant: 'positive' | 'caution' | 'warning' | 'neutral' }> = {
  added: { bg: colors.diff.added, textColor: colors.diff.addedText, label: 'Added', variant: 'positive' },
  modified: { bg: colors.diff.modified, textColor: colors.diff.modifiedText, label: 'Modified', variant: 'caution' },
  removed: { bg: colors.diff.removed, textColor: colors.diff.removedText, label: 'Removed', variant: 'warning' },
  unchanged: { bg: 'transparent', textColor: colors.text.secondary, label: 'Unchanged', variant: 'neutral' },
};

const impactLevelStyles: Record<string, { variant: 'positive' | 'neutral' | 'caution' | 'warning' }> = {
  none: { variant: 'neutral' },
  low: { variant: 'positive' },
  medium: { variant: 'caution' },
  high: { variant: 'warning' },
};

export function DiffHighlight({ clause }: DiffHighlightProps) {
  const changeStyle = changeTypeStyles[clause.diff.changeType];
  const impactStyle = impactLevelStyles[clause.diff.impactLevel];

  if (clause.diff.changeType === 'unchanged') return null;

  return (
    <Card style={{ ...styles.card, borderLeftColor: changeStyle.textColor }} variant="elevated">
      <View style={styles.header}>
        <Badge text={changeStyle.label} />
        {clause.diff.impactLevel !== 'none' && (
          <Badge text={`${clause.diff.impactLevel.toUpperCase()} IMPACT`} />
        )}
      </View>

      {clause.diff.impactSummary && (
        <View style={[styles.impactBanner, { backgroundColor: changeStyle.bg }]}>
          <Typography variant="bodyBold" style={{ color: changeStyle.textColor }}>
            What this means for you:
          </Typography>
          <Typography variant="body" style={{ color: changeStyle.textColor }}>
            {clause.diff.impactSummary}
          </Typography>
        </View>
      )}

      {clause.diff.changeType === 'modified' && clause.diff.previousLayers && (
        <View style={styles.comparison}>
          <View style={[styles.versionBlock, { backgroundColor: colors.diff.removed }]}>
            <Typography variant="label" style={{ color: colors.diff.removedText }}>
              PREVIOUS
            </Typography>
            <Typography variant="body" style={{ color: colors.diff.removedText }}>
              {clause.diff.previousLayers.plain}
            </Typography>
          </View>
          <View style={[styles.versionBlock, { backgroundColor: colors.diff.added }]}>
            <Typography variant="label" style={{ color: colors.diff.addedText }}>
              CURRENT
            </Typography>
            <Typography variant="body" style={{ color: colors.diff.addedText }}>
              {clause.layers.plain}
            </Typography>
          </View>
        </View>
      )}

      {clause.diff.changeType === 'added' && (
        <View style={[styles.newClause, { backgroundColor: colors.diff.added }]}>
          <Typography variant="body" style={{ color: colors.diff.addedText }}>
            {clause.layers.plain}
          </Typography>
        </View>
      )}

      {clause.diff.changeType === 'removed' && clause.diff.previousLayers && (
        <View style={[styles.removedClause, { backgroundColor: colors.diff.removed }]}>
          <Typography variant="body" style={{ color: colors.diff.removedText, textDecorationLine: 'line-through' }}>
            {clause.diff.previousLayers.plain}
          </Typography>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  impactBanner: {
    padding: spacing.md,
    borderRadius: radii.md,
    marginBottom: spacing.sm,
  },
  comparison: {
    gap: spacing.sm,
  },
  versionBlock: {
    padding: spacing.md,
    borderRadius: radii.md,
  },
  newClause: {
    padding: spacing.md,
    borderRadius: radii.md,
  },
  removedClause: {
    padding: spacing.md,
    borderRadius: radii.md,
  },
});
