import React from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useContractStore } from '@/src/store/useContractStore';
import { usePatientStore } from '@/src/store/usePatientStore';
import { getSharedDataCategories } from '@/src/schema/consent';
import { colors, spacing, radii, shadows, typography } from '@/src/theme/tokens';
import { Typography } from '@/src/components/ui/Typography';
import { Badge } from '@/src/components/ui/Badge';
import { ProgressBar } from '@/src/components/ui/ProgressBar';
import { Card } from '@/src/components/ui/Card';

type IconName = React.ComponentProps<typeof FontAwesome>['name'];

const orgIconNames: Record<string, IconName> = {
  hospital: 'hospital-o',
  telehealth: 'mobile-phone',
  research: 'flask',
  clinic: 'medkit',
  insurer: 'building-o',
  pharmacy: 'plus-square-o',
};

export default function ContractListScreen() {
  const router = useRouter();
  const contracts = useContractStore((s) => s.contracts);
  const consentStates = useContractStore((s) => s.consentStates);
  const signatures = useContractStore((s) => s.signatures);
  const profile = usePatientStore((s) => s.profile);

  const contractList = Object.values(contracts);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Welcome header */}
      <View style={styles.welcomeHeader}>
        <Typography variant="h1" color="primary">
          Your Health{'\n'}Agreements
        </Typography>
        <Typography variant="body" color="secondary" style={styles.welcomeSubtitle}>
          {contractList.length} active agreement{contractList.length !== 1 ? 's' : ''} with healthcare providers
        </Typography>
      </View>

      {/* Quick stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.primary[50] }]}>
          <Typography variant="h2" style={{ color: colors.primary[700] }}>
            {contractList.length}
          </Typography>
          <Typography variant="caption" color="secondary">
            Agreements
          </Typography>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.accent[50] }]}>
          <Typography variant="h2" style={{ color: colors.accent[700] }}>
            {Object.values(signatures).reduce((sum, sigs) => sum + sigs.length, 0)}
          </Typography>
          <Typography variant="caption" color="secondary">
            Receipts
          </Typography>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.sentiment.cautionLight }]}>
          <Typography variant="h2" style={{ color: '#92400E' }}>
            {contractList.filter((c) => c.previousVersion).length}
          </Typography>
          <Typography variant="caption" color="secondary">
            Updates
          </Typography>
        </View>
      </View>

      {/* Contract cards */}
      {contractList.map((contract) => {
        const consentState = consentStates[contract.id] || {};
        const sharedCategories = getSharedDataCategories(
          contract.consentItems,
          consentState
        );
        const totalCategories = new Set(
          contract.consentItems.map((i) => i.dataCategory)
        ).size;
        const shareRatio = totalCategories > 0 ? sharedCategories.length / totalCategories : 0;
        const iconName = orgIconNames[contract.metadata.organization.type] || ('building' as IconName);
        const hasDiff = !!contract.previousVersion;
        const receiptCount = (signatures[contract.id] || []).length;

        return (
          <Pressable
            key={contract.id}
            style={({ pressed }) => [
              styles.contractCard,
              pressed && styles.contractCardPressed,
            ]}
            onPress={() => router.push(`/contract/${contract.id}`)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.orgIcon}>
                <FontAwesome name={iconName} size={22} color={colors.text.secondary} />
              </View>
              <View style={styles.cardTitleArea}>
                <Typography variant="h3" color="primary" numberOfLines={1}>
                  {contract.metadata.organization.name}
                </Typography>
                <Typography variant="caption" color="tertiary">
                  {contract.metadata.title}
                </Typography>
              </View>
              {hasDiff && (
                <Badge text="UPDATED" size="sm" />
              )}
            </View>

            {/* Data sharing indicator */}
            <View style={styles.shareIndicator}>
              <View style={styles.shareTextRow}>
                <Typography variant="caption" color="secondary">
                  Data shared
                </Typography>
                <Typography variant="caption" color="primary" style={{ fontWeight: '600' }}>
                  {sharedCategories.length} of {totalCategories} categories
                </Typography>
              </View>
              <ProgressBar
                progress={shareRatio}
                color={
                  shareRatio > 0.7
                    ? colors.sentiment.caution
                    : colors.accent[500]
                }
              />
            </View>

            {/* Footer badges */}
            <View style={styles.cardFooter}>
              <Badge text={`v${contract.version}`} size="sm" />
              {contract.metadata.regulatoryFramework.map((fw) => (
                <Badge key={fw} text={fw} size="sm" />
              ))}
              {receiptCount > 0 && (
                <Badge
                  text={`${receiptCount} receipt${receiptCount > 1 ? 's' : ''}`}
                  size="sm"
                />
              )}
            </View>
          </Pressable>
        );
      })}

      {contractList.length === 0 && (
        <Card style={styles.emptyCard}>
          <Typography variant="h3" color="tertiary" style={styles.emptyText}>
            No active agreements
          </Typography>
          <Typography variant="body" color="tertiary" style={styles.emptyText}>
            Health agreements with your providers will appear here.
          </Typography>
        </Card>
      )}
    </ScrollView>
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
  welcomeHeader: {
    marginBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
  welcomeSubtitle: {
    marginTop: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    borderRadius: radii.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  contractCard: {
    backgroundColor: colors.surface.card,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  contractCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  orgIcon: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.surface.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  cardTitleArea: {
    flex: 1,
  },
  shareIndicator: {
    marginBottom: spacing.md,
  },
  shareTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  emptyCard: {
    alignItems: 'center',
    padding: spacing.xxl,
  },
  emptyText: {
    textAlign: 'center',
  },
});
