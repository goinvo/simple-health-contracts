import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useContractStore } from '@/src/store/useContractStore';
import { colors, spacing } from '@/src/theme/tokens';
import { Typography } from '@/src/components/ui/Typography';
import { ReceiptCard } from '@/src/components/receipt/ReceiptCard';

export default function ReceiptScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const contract = useContractStore((s) => s.contracts[id!]);
  const signatures = useContractStore((s) => s.signatures[id!]) ?? [];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Consent Receipts',
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {signatures.length === 0 ? (
          <View style={styles.empty}>
            <FontAwesome name="file-text-o" size={48} color={colors.text.tertiary} style={styles.emptyIcon} />
            <Typography variant="h3" color="tertiary" style={styles.emptyTitle}>
              No receipts yet
            </Typography>
            <Typography variant="body" color="tertiary" style={styles.emptyText}>
              Sign the contract to generate your first cryptographic consent receipt.
            </Typography>
          </View>
        ) : (
          <>
            <Typography variant="h2" color="primary" style={styles.title}>
              Your Consent History
            </Typography>
            <Typography variant="body" color="secondary" style={styles.subtitle}>
              Each receipt is cryptographically linked to the previous one, creating a
              tamper-proof chain of your consent decisions.
            </Typography>

            {[...signatures].reverse().map((sig, index) => (
              <View key={sig.id}>
                {index === 0 && (
                  <Typography variant="label" color="secondary" style={styles.latestLabel}>
                    LATEST
                  </Typography>
                )}
                {index === 1 && signatures.length > 1 && (
                  <Typography variant="label" color="tertiary" style={styles.previousLabel}>
                    PREVIOUS
                  </Typography>
                )}
                <ReceiptCard
                  signature={sig}
                  contract={contract}
                />
              </View>
            ))}
          </>
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
    paddingVertical: spacing.md,
    paddingBottom: spacing.xxl,
  },
  title: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  subtitle: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  latestLabel: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xs,
  },
  previousLabel: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    marginTop: spacing.xxl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    marginBottom: spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
  },
});
