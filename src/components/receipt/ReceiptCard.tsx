import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ConsentSignature, DynamicContract } from '@/src/schema/types';
import { colors, spacing, radii, shadows } from '@/src/theme/tokens';
import { Typography } from '@/src/components/ui/Typography';
import { Badge } from '@/src/components/ui/Badge';
import { formatDateTime, truncateHash } from '@/src/utils/format';
import { verifyReceiptChain } from '@/src/utils/crypto';

interface ReceiptCardProps {
  signature: ConsentSignature;
  contract?: DynamicContract;
  onVerify?: () => void;
}

export function ReceiptCard({ signature, contract, onVerify }: ReceiptCardProps) {
  const granted = signature.consentSnapshot.filter((s) => s.granted).length;
  const denied = signature.consentSnapshot.filter((s) => !s.granted).length;
  const isValid = verifyReceiptChain([signature]);

  return (
    <View style={styles.container}>
      {/* Certificate header */}
      <View style={styles.header}>
        <View style={styles.stamp}>
          <FontAwesome name="file-text-o" size={32} color={colors.text.primary} />
        </View>
        <Typography variant="h3" color="primary" style={styles.title}>
          Consent Receipt
        </Typography>
        <Badge
          text={isValid ? 'VERIFIED' : 'INVALID'}
          size="md"
        />
      </View>

      {/* Details */}
      <View style={styles.details}>
        {contract && (
          <DetailRow label="Agreement" value={contract.metadata.title} />
        )}
        <DetailRow
          label="Organization"
          value={contract?.metadata.organization.name || signature.contractId}
        />
        <DetailRow label="Version" value={signature.contractVersion} />
        <DetailRow label="Signed" value={formatDateTime(signature.timestamp)} />
      </View>

      {/* Consent summary */}
      <View style={styles.consentSummary}>
        <Typography variant="bodyBold" color="primary" style={styles.summaryTitle}>
          Consent Decisions
        </Typography>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Typography variant="h2" style={{ color: colors.sentiment.positive }}>
              {granted}
            </Typography>
            <Typography variant="caption" color="secondary">
              Granted
            </Typography>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Typography variant="h2" style={{ color: colors.sentiment.warning }}>
              {denied}
            </Typography>
            <Typography variant="caption" color="secondary">
              Denied
            </Typography>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Typography variant="h2" color="primary">
              {signature.consentSnapshot.length}
            </Typography>
            <Typography variant="caption" color="secondary">
              Total
            </Typography>
          </View>
        </View>
      </View>

      {/* Signature hash */}
      <View style={styles.hashSection}>
        <Typography variant="label" color="tertiary">
          SIGNATURE HASH
        </Typography>
        <Typography
          variant="caption"
          color="secondary"
          style={styles.hash}
          numberOfLines={1}
        >
          {truncateHash(signature.signatureHash, 32)}
        </Typography>
        {signature.previousSignatureHash && (
          <>
            <Typography variant="label" color="tertiary" style={styles.chainLabel}>
              CHAIN LINK
            </Typography>
            <Typography variant="caption" color="tertiary" style={styles.hash}>
              prev: {truncateHash(signature.previousSignatureHash, 20)}
            </Typography>
          </>
        )}
      </View>

      {/* Verify button */}
      <Pressable
        style={({ pressed }) => [
          styles.verifyButton,
          pressed && styles.verifyButtonPressed,
        ]}
        onPress={onVerify}
      >
        <View style={styles.verifyContent}>
          <FontAwesome
            name={isValid ? 'check' : 'times'}
            size={16}
            color={colors.text.inverse}
            style={{ marginRight: 8 }}
          />
          <Typography variant="bodyBold" style={styles.verifyText}>
            {isValid ? 'Integrity Verified' : 'Verification Failed'}
          </Typography>
        </View>
      </Pressable>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Typography variant="caption" color="tertiary" style={styles.detailLabel}>
        {label}
      </Typography>
      <Typography variant="body" color="primary" style={styles.detailValue}>
        {value}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface.card,
    borderRadius: radii.lg,
    padding: spacing.lg,
    margin: spacing.md,
    borderWidth: 2,
    borderColor: colors.primary[200],
    ...shadows.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  stamp: {
    marginBottom: spacing.sm,
  },
  title: {
    marginBottom: spacing.sm,
  },
  details: {
    backgroundColor: colors.surface.background,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.divider,
  },
  detailLabel: {
    flex: 1,
  },
  detailValue: {
    flex: 2,
    textAlign: 'right',
  },
  consentSummary: {
    marginBottom: spacing.md,
  },
  summaryTitle: {
    marginBottom: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface.background,
    borderRadius: radii.md,
    padding: spacing.md,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: colors.surface.border,
  },
  hashSection: {
    backgroundColor: colors.surface.background,
    borderRadius: radii.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  hash: {
    fontFamily: 'SpaceMono',
    marginTop: spacing.xs,
  },
  chainLabel: {
    marginTop: spacing.sm,
  },
  verifyButton: {
    backgroundColor: colors.primary[500],
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  verifyButtonPressed: {
    opacity: 0.8,
  },
  verifyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyText: {
    color: colors.text.inverse,
  },
});
