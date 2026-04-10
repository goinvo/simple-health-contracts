import React from 'react';
import { ScrollView, View, Pressable, StyleSheet, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useContractStore } from '@/src/store/useContractStore';
import { mockAccessLog } from '@/src/mock/accessLog';
import { colors, spacing, radii, shadows } from '@/src/theme/tokens';
import { Typography } from '@/src/components/ui/Typography';
import { Card } from '@/src/components/ui/Card';
import { DataMap } from '@/src/components/dashboard/DataMap';
import { AccessLogList } from '@/src/components/dashboard/AccessLogList';

export default function DashboardScreen() {
  const contracts = useContractStore((s) => s.contracts);
  const consentStates = useContractStore((s) => s.consentStates);
  const router = useRouter();

  const contractList = Object.values(contracts);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Typography variant="h1" color="primary">
          Your Data Map
        </Typography>
        <Typography variant="body" color="secondary" style={styles.subtitle}>
          See who has your health data and why
        </Typography>
      </View>

      {/* Data Map Visualization */}
      <Card style={styles.mapCard} variant="elevated">
        <DataMap
          contracts={contractList}
          consentStates={consentStates}
          onNodePress={(contractId) =>
            router.push(`/contract/${contractId}`)
          }
        />
      </Card>

      {/* Quick Actions */}
      <View style={styles.actions}>
        <Pressable
          style={[styles.actionButton, { backgroundColor: colors.primary[500] }]}
          onPress={() =>
            Alert.alert(
              'Export Your Data',
              'In a production app, this would generate a FHIR R4 JSON export of all your health records and open the system share sheet.',
              [{ text: 'Got it' }]
            )
          }
        >
          <FontAwesome name="upload" size={24} color={colors.text.inverse} style={styles.actionIcon} />
          <Typography variant="bodyBold" style={styles.actionText}>
            Export My Data
          </Typography>
          <Typography variant="caption" style={styles.actionCaption}>
            FHIR R4 Format
          </Typography>
        </Pressable>

        <Pressable
          style={[styles.actionButton, { backgroundColor: colors.sentiment.warning }]}
          onPress={() =>
            Alert.alert(
              'Right to Be Forgotten',
              'In a production app, this would generate formal data deletion requests for each organization holding your data, pre-filled with your information and citing your legal rights under HIPAA/CCPA.',
              [{ text: 'Got it' }]
            )
          }
        >
          <FontAwesome name="trash-o" size={24} color={colors.text.inverse} style={styles.actionIcon} />
          <Typography variant="bodyBold" style={styles.actionText}>
            Right to Be Forgotten
          </Typography>
          <Typography variant="caption" style={styles.actionCaption}>
            Generate Requests
          </Typography>
        </Pressable>
      </View>

      {/* Access Log */}
      <Card style={styles.logCard} variant="elevated">
        <AccessLogList entries={mockAccessLog} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface.background,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  header: {
    padding: spacing.md,
    paddingTop: spacing.sm,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  mapCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  actionButton: {
    flex: 1,
    borderRadius: radii.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.md,
  },
  actionIcon: {
    marginBottom: spacing.sm,
  },
  actionText: {
    color: colors.text.inverse,
    textAlign: 'center',
  },
  actionCaption: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: spacing.xs,
  },
  logCard: {
    marginHorizontal: spacing.md,
  },
});
