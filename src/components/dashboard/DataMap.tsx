import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DynamicContract, DATA_CATEGORY_LABELS } from '@/src/schema/types';
import { ConsentState, getSharedDataCategories } from '@/src/schema/consent';
import { colors, spacing, radii, shadows } from '@/src/theme/tokens';
import { Typography } from '@/src/components/ui/Typography';
import { Badge } from '@/src/components/ui/Badge';

interface DataMapProps {
  contracts: DynamicContract[];
  consentStates: Record<string, ConsentState>;
  onNodePress?: (contractId: string) => void;
}

interface OrgNode {
  contractId: string;
  name: string;
  type: string;
  sharedCategories: string[];
  x: number;
  y: number;
}

const orgIconNames: Record<string, React.ComponentProps<typeof FontAwesome>['name']> = {
  hospital: 'hospital-o',
  telehealth: 'mobile-phone',
  research: 'flask',
  clinic: 'medkit',
  insurer: 'building-o',
  pharmacy: 'plus-square-o',
};

export function DataMap({ contracts, consentStates, onNodePress }: DataMapProps) {
  const width = 340;
  const height = 340;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 130;

  const orgNodes: OrgNode[] = contracts.map((contract, index) => {
    const angle = (2 * Math.PI * index) / contracts.length - Math.PI / 2;
    const shared = getSharedDataCategories(
      contract.consentItems,
      consentStates[contract.id] || {}
    );
    return {
      contractId: contract.id,
      name: contract.metadata.organization.name,
      type: contract.metadata.organization.type,
      sharedCategories: shared,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        {/* Connection lines */}
        {orgNodes.map((node) => {
          const lineCount = Math.min(node.sharedCategories.length, 5);
          return node.sharedCategories.slice(0, 5).map((category, i) => {
            const offset = (i - (lineCount - 1) / 2) * 3;
            return (
              <Line
                key={`${node.contractId}-${category}`}
                x1={centerX + offset}
                y1={centerY}
                x2={node.x + offset}
                y2={node.y}
                stroke={colors.text.tertiary}
                strokeWidth={1.5}
                strokeOpacity={0.4}
              />
            );
          });
        })}

        {/* Center patient node */}
        <Circle cx={centerX} cy={centerY} r={30} fill={colors.text.primary} />
        <SvgText
          x={centerX}
          y={centerY + 6}
          textAnchor="middle"
          fill="white"
          fontSize={13}
          fontWeight="600"
        >
          YOU
        </SvgText>

        {/* Org nodes */}
        {orgNodes.map((node) => (
          <React.Fragment key={node.contractId}>
            <Circle
              cx={node.x}
              cy={node.y}
              r={24}
              fill={colors.surface.card}
              stroke={colors.surface.border}
              strokeWidth={1.5}
            />
          </React.Fragment>
        ))}
      </Svg>

      {/* Overlay FontAwesome icons on org nodes (SVG can't render them) */}
      {orgNodes.map((node) => (
        <View
          key={`icon-${node.contractId}`}
          style={[
            styles.orgIconOverlay,
            { left: node.x - 12, top: node.y - 12 },
          ]}
          pointerEvents="none"
        >
          <FontAwesome
            name={orgIconNames[node.type] || 'building'}
            size={16}
            color={colors.text.secondary}
          />
        </View>
      ))}

      {/* Labels below the map */}
      <View style={styles.nodeList}>
        {orgNodes.map((node) => (
          <Pressable
            key={node.contractId}
            style={styles.nodeItem}
            onPress={() => onNodePress?.(node.contractId)}
          >
            <View style={styles.nodeItemHeader}>
              <FontAwesome
                name={orgIconNames[node.type] || 'building'}
                size={16}
                color={colors.text.secondary}
                style={styles.nodeIcon}
              />
              <Typography variant="bodyBold" color="primary" numberOfLines={1}>
                {node.name}
              </Typography>
            </View>
            <View style={styles.categoryRow}>
              {node.sharedCategories.length === 0 ? (
                <Typography variant="caption" color="tertiary">
                  No data shared
                </Typography>
              ) : (
                <Typography variant="caption" color="secondary">
                  {node.sharedCategories.length} data{' '}
                  {node.sharedCategories.length === 1 ? 'category' : 'categories'} shared
                </Typography>
              )}
            </View>
            <View style={styles.badgeRow}>
              {node.sharedCategories.slice(0, 3).map((cat) => (
                <Badge
                  key={cat}
                  text={DATA_CATEGORY_LABELS[cat as keyof typeof DATA_CATEGORY_LABELS]}
                  size="sm"
                />
              ))}
              {node.sharedCategories.length > 3 && (
                <Badge
                  text={`+${node.sharedCategories.length - 3}`}
                  size="sm"
                />
              )}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.md,
  },
  orgIconOverlay: {
    position: 'absolute',
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeList: {
    width: '100%',
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  nodeItem: {
    backgroundColor: colors.surface.card,
    borderRadius: radii.md,
    padding: spacing.md,
    ...shadows.sm,
  },
  nodeItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nodeIcon: {
    marginRight: spacing.sm,
  },
  categoryRow: {
    marginTop: spacing.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
});
