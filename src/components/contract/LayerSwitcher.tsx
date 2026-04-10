import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ViewLayer } from '@/src/schema/types';
import { colors, radii, spacing, shadows } from '@/src/theme/tokens';
import { Typography } from '@/src/components/ui/Typography';

type IconName = React.ComponentProps<typeof FontAwesome>['name'];

const LAYERS: { key: ViewLayer; label: string; icon: IconName }[] = [
  { key: 'tldr', label: 'TL;DR', icon: 'bolt' },
  { key: 'plain', label: 'Plain', icon: 'comment-o' },
  { key: 'legal', label: 'Legal', icon: 'gavel' },
  { key: 'visual', label: 'Visual', icon: 'area-chart' },
];

interface LayerSwitcherProps {
  activeLayer: ViewLayer;
  onLayerChange: (layer: ViewLayer) => void;
}

export function LayerSwitcher({ activeLayer, onLayerChange }: LayerSwitcherProps) {
  return (
    <View style={styles.container}>
      <View style={styles.pillBar}>
        {LAYERS.map((layer) => {
          const isActive = activeLayer === layer.key;
          return (
            <Pressable
              key={layer.key}
              style={[styles.pill, isActive ? styles.pillActive : undefined]}
              onPress={() => onLayerChange(layer.key)}
            >
              <FontAwesome
                name={layer.icon}
                size={12}
                color={isActive ? colors.text.inverse : colors.text.secondary}
                style={styles.pillIcon}
              />
              <Typography
                variant="caption"
                style={[styles.pillText, isActive ? styles.pillTextActive : undefined]}
              >
                {layer.label}
              </Typography>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface.background,
  },
  pillBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface.card,
    borderRadius: radii.xl,
    padding: 3,
    ...shadows.sm,
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  pillActive: {
    backgroundColor: colors.primary[500],
    ...shadows.md,
  },
  pillIcon: {
    marginTop: 1,
  },
  pillText: {
    color: colors.text.secondary,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  pillTextActive: {
    color: colors.text.inverse,
  },
});
