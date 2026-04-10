import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { usePatientStore } from '@/src/store/usePatientStore';
import { colors, spacing, radii, shadows } from '@/src/theme/tokens';
import { Typography } from '@/src/components/ui/Typography';

type IconName = React.ComponentProps<typeof FontAwesome>['name'];

const PAGES: { icon: IconName; title: string; description: string }[] = [
  {
    icon: 'file-text-o',
    title: 'Your Agreements,\nReimagined',
    description:
      'No more walls of legalese. See what you\'re actually agreeing to with plain English summaries, visual data flows, and interactive consent controls.',
  },
  {
    icon: 'sliders',
    title: 'You Decide\nWho Sees What',
    description:
      'Toggle consent for each type of data and each purpose. Demographics for treatment? Required. Genetic data for pharma research? Your choice. Every decision is granular.',
  },
  {
    icon: 'key',
    title: 'Your Data,\nYour Proof',
    description:
      'Every consent decision is cryptographically signed and chained — creating a tamper-proof record. Export your data in FHIR format. Request deletion anytime.',
  },
];

export default function OnboardingScreen() {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const completeOnboarding = usePatientStore((s) => s.completeOnboarding);

  const currentPage = PAGES[page];
  const isLast = page === PAGES.length - 1;

  const handleNext = () => {
    if (isLast) {
      completeOnboarding();
      router.replace('/(tabs)');
    } else {
      setPage(page + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Skip */}
      <Pressable
        style={styles.skipButton}
        onPress={() => {
          completeOnboarding();
          router.replace('/(tabs)');
        }}
      >
        <Typography variant="bodyBold" color="secondary">
          Skip
        </Typography>
      </Pressable>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <FontAwesome name={currentPage.icon} size={36} color={colors.text.primary} />
        </View>
        <Typography variant="h1" color="primary" style={styles.title}>
          {currentPage.title}
        </Typography>
        <Typography variant="body" color="secondary" style={styles.description}>
          {currentPage.description}
        </Typography>
      </View>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {PAGES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: i === page ? colors.text.primary : colors.surface.border,
                width: i === page ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>

      {/* Action button */}
      <Pressable
        style={styles.button}
        onPress={handleNext}
      >
        <Typography variant="bodyBold" style={styles.buttonText}>
          {isLast ? 'Get Started' : 'Next'}
        </Typography>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface.background,
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: spacing.sm,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.md,
    lineHeight: 36,
  },
  description: {
    lineHeight: 26,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  button: {
    borderRadius: radii.lg,
    padding: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.text.primary,
    ...shadows.md,
  },
  buttonText: {
    color: colors.text.inverse,
    fontSize: 18,
  },
});
