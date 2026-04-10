import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ContractClause, ViewLayer } from '@/src/schema/types';
import { colors, spacing, radii, shadows } from '@/src/theme/tokens';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Typography } from '@/src/components/ui/Typography';

interface ClauseCardProps {
  clause: ContractClause;
  layer: ViewLayer;
}

const importanceBadge: Record<string, { text: string; variant: 'positive' | 'neutral' | 'caution' | 'warning' }> = {
  standard: { text: 'Standard', variant: 'neutral' },
  notable: { text: 'Notable', variant: 'caution' },
  critical: { text: 'Critical', variant: 'warning' },
};

export function ClauseCard({ clause, layer }: ClauseCardProps) {
  const [showLegal, setShowLegal] = useState(false);
  const badge = importanceBadge[clause.importance];

  const renderContent = () => {
    switch (layer) {
      case 'plain':
        return (
          <View>
            <Typography variant="body" color="primary">
              {clause.layers.plain}
            </Typography>
            <Pressable
              style={styles.toggleLegal}
              onPress={() => setShowLegal(!showLegal)}
            >
              <Typography variant="caption" style={styles.toggleText}>
                {showLegal ? 'Hide legal text ▲' : 'See legal text ▼'}
              </Typography>
            </Pressable>
            {showLegal && (
              <View style={styles.legalInline}>
                <Typography variant="legal" color="tertiary">
                  {clause.layers.legal}
                </Typography>
              </View>
            )}
          </View>
        );

      case 'legal':
        return (
          <Typography variant="legal" color="secondary" style={styles.legalText}>
            {clause.layers.legal}
          </Typography>
        );

      case 'visual':
        if (clause.layers.visual) {
          return (
            <View>
              <View style={styles.visualPlaceholder}>
                <View style={styles.visualIconContainer}>
                  <FontAwesome
                    name={
                      clause.layers.visual.type === 'data-flow'
                        ? 'random'
                        : clause.layers.visual.type === 'timeline'
                        ? 'calendar'
                        : clause.layers.visual.type === 'checklist'
                        ? 'check-square-o'
                        : 'columns'
                    }
                    size={24}
                    color={colors.text.secondary}
                  />
                </View>
                {clause.layers.visual.type === 'checklist' &&
                  (clause.layers.visual.data.items as { text: string; included: boolean }[]).map(
                    (item, i) => (
                      <View key={i} style={styles.checklistItem}>
                        <View style={styles.checklistItemRow}>
                          <FontAwesome
                            name={item.included ? 'check' : 'times'}
                            size={14}
                            color={item.included ? colors.text.primary : colors.text.tertiary}
                            style={styles.checkIcon}
                          />
                          <Typography variant="body" color="primary">
                            {item.text}
                          </Typography>
                        </View>
                      </View>
                    )
                  )}
                {clause.layers.visual.type === 'data-flow' &&
                  (clause.layers.visual.data.edges as { from: string; to: string; label: string }[]).map(
                    (edge, i) => {
                      const nodes = clause.layers.visual!.data.nodes as { id: string; label: string }[];
                      const fromNode = nodes.find((n) => n.id === edge.from);
                      const toNode = nodes.find((n) => n.id === edge.to);
                      return (
                        <View key={i} style={styles.flowItem}>
                          <Typography variant="bodyBold" color="primary">
                            {fromNode?.label}
                          </Typography>
                          <View style={styles.flowArrowRow}>
                            <FontAwesome name="long-arrow-right" size={12} color={colors.text.tertiary} />
                            <Typography variant="caption" color="tertiary">
                              {edge.label}
                            </Typography>
                            <FontAwesome name="long-arrow-right" size={12} color={colors.text.tertiary} />
                          </View>
                          <Typography variant="bodyBold" color="primary">
                            {toNode?.label}
                          </Typography>
                        </View>
                      );
                    }
                  )}
                {clause.layers.visual.type === 'timeline' &&
                  (clause.layers.visual.data.events as { label: string; offset: number; unit?: string }[]).map(
                    (event, i) => (
                      <View key={i} style={styles.timelineItem}>
                        <View style={[styles.timelineDot, i === 0 && styles.timelineDotFirst]} />
                        <View style={styles.timelineContent}>
                          <Typography variant="bodyBold" color="primary">
                            {event.label}
                          </Typography>
                          {event.offset > 0 && (
                            <Typography variant="caption" color="tertiary">
                              +{event.offset} {event.unit || 'years'}
                            </Typography>
                          )}
                        </View>
                      </View>
                    )
                  )}
              </View>
              <Typography variant="caption" color="tertiary" style={styles.visualCaption}>
                {clause.layers.visual.caption}
              </Typography>
            </View>
          );
        }
        return (
          <Typography variant="body" color="primary">
            {clause.layers.plain}
          </Typography>
        );

      default:
        return null;
    }
  };

  if (layer === 'tldr') return null;

  return (
    <Card style={styles.card} variant="elevated">
      <View style={styles.header}>
        <Badge text={badge.text} />
      </View>
      {renderContent()}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  toggleLegal: {
    marginTop: spacing.sm,
    paddingVertical: spacing.xs,
  },
  toggleText: {
    color: colors.primary[500],
    fontWeight: '600',
  },
  legalInline: {
    marginTop: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.surface.divider,
    borderRadius: radii.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary[200],
  },
  legalText: {
    fontStyle: 'italic',
  },
  visualPlaceholder: {
    paddingVertical: spacing.sm,
  },
  visualIconContainer: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  checklistItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkIcon: {
    width: 16,
  },
  visualCaption: {
    textAlign: 'center',
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
  checklistItem: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  flowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  flowArrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.text.tertiary,
    marginTop: 4,
    marginRight: spacing.md,
  },
  timelineDotFirst: {
    backgroundColor: colors.text.primary,
  },
  timelineContent: {
    flex: 1,
  },
});
