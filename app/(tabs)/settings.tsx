import React from 'react';
import { ScrollView, View, Pressable, StyleSheet, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { usePatientStore } from '@/src/store/usePatientStore';
import { useContractStore } from '@/src/store/useContractStore';
import { colors, spacing, radii, shadows } from '@/src/theme/tokens';
import { Typography } from '@/src/components/ui/Typography';
import { Card } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { formatDate } from '@/src/utils/format';

export default function SettingsScreen() {
  const profile = usePatientStore((s) => s.profile);
  const signatures = useContractStore((s) => s.signatures);
  const router = useRouter();

  const totalReceipts = Object.values(signatures).reduce(
    (sum, sigs) => sum + sigs.length,
    0
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile card */}
      <Card style={styles.profileCard} variant="elevated">
        <View style={styles.avatar}>
          <FontAwesome name="user-o" size={36} color={colors.text.secondary} />
        </View>
        <Typography variant="h2" color="primary" style={styles.name}>
          {profile?.name || 'Patient'}
        </Typography>
        <Typography variant="body" color="secondary">
          {profile?.email}
        </Typography>
        {profile?.dateOfBirth && (
          <Typography variant="caption" color="tertiary" style={styles.dob}>
            Born {formatDate(profile.dateOfBirth)}
          </Typography>
        )}
        <Badge text={`ID: ${profile?.id}`} size="md" />
      </Card>

      {/* Data ownership section */}
      <Typography variant="h3" color="primary" style={styles.sectionTitle}>
        Data Ownership
      </Typography>

      <Card style={styles.menuCard}>
        <MenuItem
          icon="file-text-o"
          title="Consent Receipts"
          subtitle={`${totalReceipts} signed receipt${totalReceipts !== 1 ? 's' : ''}`}
          onPress={() =>
            Alert.alert(
              'Consent Receipts',
              'View all your cryptographically signed consent receipts by tapping an agreement and then "View Receipt".'
            )
          }
        />
        <View style={styles.divider} />
        <MenuItem
          icon="upload"
          title="Export All Data"
          subtitle="Download in FHIR R4 format"
          onPress={() =>
            Alert.alert(
              'Export Data',
              'In production, this generates a complete FHIR R4 bundle of your health records from all connected providers.'
            )
          }
        />
        <View style={styles.divider} />
        <MenuItem
          icon="search"
          title="Access Audit Log"
          subtitle="See who viewed your data"
          onPress={() => router.push('/(tabs)/dashboard')}
        />
        <View style={styles.divider} />
        <MenuItem
          icon="trash-o"
          title="Right to Be Forgotten"
          subtitle="Request data deletion"
          onPress={() =>
            Alert.alert(
              'Data Deletion',
              'This will generate formal HIPAA/CCPA-compliant deletion requests for all organizations holding your data.'
            )
          }
        />
      </Card>

      {/* App info */}
      <Typography variant="h3" color="primary" style={styles.sectionTitle}>
        About
      </Typography>

      <Card style={styles.menuCard}>
        <MenuItem
          icon="mobile"
          title="Dynamic Contracts"
          subtitle="Version 1.0.0 — Prototype"
        />
        <View style={styles.divider} />
        <MenuItem
          icon="lock"
          title="Privacy & Security"
          subtitle="AES-256 encryption, local-first"
        />
        <View style={styles.divider} />
        <MenuItem
          icon="clipboard"
          title="Regulatory Compliance"
          subtitle="HIPAA, CCPA, GDPR-ready"
        />
      </Card>

      <Typography variant="caption" color="tertiary" style={styles.footer}>
        Your health data belongs to you.{'\n'}
        Dynamic Contracts is a prototype demonstrating how healthcare{'\n'}
        agreements should work — transparent, understandable, and patient-owned.
      </Typography>
    </ScrollView>
  );
}

function MenuItem({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  title: string;
  subtitle: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        pressed && onPress ? styles.menuItemPressed : undefined,
      ]}
      onPress={onPress}
    >
      <View style={styles.menuIconContainer}>
        <FontAwesome name={icon} size={18} color={colors.text.secondary} />
      </View>
      <View style={styles.menuText}>
        <Typography variant="bodyBold" color="primary">
          {title}
        </Typography>
        <Typography variant="caption" color="tertiary">
          {subtitle}
        </Typography>
      </View>
      {onPress && (
        <FontAwesome name="chevron-right" size={12} color={colors.text.tertiary} />
      )}
    </Pressable>
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
  profileCard: {
    alignItems: 'center',
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  name: {
    marginBottom: spacing.xs,
  },
  dob: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  menuCard: {
    marginBottom: spacing.lg,
    padding: 0,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  menuItemPressed: {
    backgroundColor: colors.surface.divider,
  },
  menuIconContainer: {
    width: 28,
    marginRight: spacing.md,
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surface.divider,
    marginLeft: spacing.xxl + spacing.md,
  },
  footer: {
    textAlign: 'center',
    marginTop: spacing.lg,
    lineHeight: 20,
  },
});
