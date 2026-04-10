import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useContractStore } from '@/src/store/useContractStore';
import { diffContracts } from '@/src/schema/diff';
import { colors, spacing, radii, shadows } from '@/src/theme/tokens';
import { Typography } from '@/src/components/ui/Typography';
import { Badge } from '@/src/components/ui/Badge';
import { Card } from '@/src/components/ui/Card';
import { DiffHighlight } from '@/src/components/contract/DiffHighlight';

export default function DiffScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const contract = useContractStore((s) => s.contracts[id!]);
  const previousVersion = useContractStore((s) => s.previousVersions[id!]);

  if (!contract || !previousVersion) {
    return (
      <View style={styles.errorContainer}>
        <Typography variant="h2" color="tertiary">
          No changes to display
        </Typography>
        <Typography variant="body" color="tertiary" style={styles.errorSubtitle}>
          This contract has no previous version to compare against.
        </Typography>
      </View>
    );
  }

  const diff = diffContracts(previousVersion, contract);

  return (
    <>
      <Stack.Screen
        options={{
          title: `Changes: ${contract.metadata.organization.name}`,
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Version header */}
        <Card style={styles.versionHeader} variant="elevated">
          <View style={styles.versionRow}>
            <View style={styles.versionBlock}>
              <Typography variant="label" color="tertiary">
                PREVIOUS
              </Typography>
              <Typography variant="h2" color="secondary">
                v{diff.fromVersion}
              </Typography>
            </View>
            <FontAwesome name="long-arrow-right" size={20} color={colors.text.tertiary} />
            <View style={styles.versionBlock}>
              <Typography variant="label" color="tertiary">
                CURRENT
              </Typography>
              <Typography variant="h2" color="primary">
                v{diff.toVersion}
              </Typography>
            </View>
          </View>
        </Card>

        {/* Summary stats */}
        <View style={styles.statsRow}>
          {diff.summary.added > 0 && (
            <View style={[styles.statBadge, { backgroundColor: colors.diff.added }]}>
              <Typography variant="h3" style={{ color: colors.diff.addedText }}>
                +{diff.summary.added}
              </Typography>
              <Typography variant="caption" style={{ color: colors.diff.addedText }}>
                Added
              </Typography>
            </View>
          )}
          {diff.summary.modified > 0 && (
            <View style={[styles.statBadge, { backgroundColor: colors.diff.modified }]}>
              <Typography variant="h3" style={{ color: colors.diff.modifiedText }}>
                ~{diff.summary.modified}
              </Typography>
              <Typography variant="caption" style={{ color: colors.diff.modifiedText }}>
                Modified
              </Typography>
            </View>
          )}
          {diff.summary.removed > 0 && (
            <View style={[styles.statBadge, { backgroundColor: colors.diff.removed }]}>
              <Typography variant="h3" style={{ color: colors.diff.removedText }}>
                -{diff.summary.removed}
              </Typography>
              <Typography variant="caption" style={{ color: colors.diff.removedText }}>
                Removed
              </Typography>
            </View>
          )}
          {diff.summary.highImpactChanges > 0 && (
            <View style={[styles.statBadge, { backgroundColor: colors.sentiment.warningLight }]}>
              <Typography variant="h3" style={{ color: colors.sentiment.warning }}>
                {diff.summary.highImpactChanges}
              </Typography>
              <Typography variant="caption" style={{ color: colors.sentiment.warning }}>
                High Impact
              </Typography>
            </View>
          )}
        </View>

        {/* Changed sections */}
        {diff.sections
          .filter((section) => section.hasChanges)
          .map((section) => (
            <View key={section.sectionId} style={styles.section}>
              <Typography variant="h3" color="primary" style={styles.sectionTitle}>
                {section.title}
              </Typography>
              {section.clauses
                .filter((c) => c.diff.changeType !== 'unchanged')
                .map((clause) => (
                  <DiffHighlight key={clause.id} clause={clause} />
                ))}
            </View>
          ))}

        {/* Unchanged sections summary */}
        {diff.sections.filter((s) => !s.hasChanges).length > 0 && (
          <Card style={styles.unchangedCard}>
            <Typography variant="bodyBold" color="tertiary">
              {diff.sections.filter((s) => !s.hasChanges).length} section
              {diff.sections.filter((s) => !s.hasChanges).length > 1 ? 's' : ''}{' '}
              unchanged
            </Typography>
            <Typography variant="caption" color="tertiary">
              {diff.sections
                .filter((s) => !s.hasChanges)
                .map((s) => s.title)
                .join(', ')}
            </Typography>
          </Card>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  errorSubtitle: {
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  versionHeader: {
    marginBottom: spacing.md,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  versionBlock: {
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    flexWrap: 'wrap',
  },
  statBadge: {
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
    flex: 1,
    minWidth: 80,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  unchangedCard: {
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface.divider,
  },
});
