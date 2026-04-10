import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TldrCard as TldrCardType } from '@/src/schema/types';
import { colors, spacing, radii, shadows } from '@/src/theme/tokens';
import { Typography } from '@/src/components/ui/Typography';

interface TldrCardsProps {
  cards: TldrCardType[];
  onCardPress?: (sectionIds: string[]) => void;
}

export function TldrCards({ cards, onCardPress }: TldrCardsProps) {
  return (
    <View style={styles.container}>
      <Typography variant="h2" color="primary" style={styles.heading}>
        Here's what you need to know
      </Typography>
      <Typography variant="caption" color="tertiary" style={styles.subheading}>
        Tap any card for the full details
      </Typography>
      {cards.map((card, index) => (
        <Pressable
          key={index}
          style={({ pressed }) => [
            styles.card,
            {
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            },
          ]}
          onPress={() => onCardPress?.(card.relatedSectionIds)}
        >
          <View style={styles.iconRow}>
            <View style={styles.iconCircle}>
              <FontAwesome
                name={card.icon as any}
                size={20}
                color={colors.text.primary}
              />
            </View>
          </View>
          <Typography variant="h3" color="primary" style={styles.title}>
            {card.title}
          </Typography>
          <Typography variant="body" color="secondary" style={styles.description}>
            {card.description}
          </Typography>
          <Typography variant="caption" color="tertiary" style={styles.tapHint}>
            Tap for details
          </Typography>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  heading: {
    marginBottom: spacing.xs,
  },
  subheading: {
    marginBottom: spacing.lg,
  },
  card: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.surface.border,
    backgroundColor: colors.surface.card,
    ...shadows.sm,
  },
  iconRow: {
    marginBottom: spacing.sm,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: spacing.xs,
  },
  description: {
    marginBottom: spacing.sm,
  },
  tapHint: {
    fontWeight: '600',
    fontSize: 13,
  },
});
