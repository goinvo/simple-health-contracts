import React, { useState } from 'react';
import { ScrollView, View, Pressable, StyleSheet, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useContractStore } from '@/src/store/useContractStore';
import { usePatientStore } from '@/src/store/usePatientStore';
import { ViewLayer } from '@/src/schema/types';
import { colors, spacing, radii, shadows } from '@/src/theme/tokens';
import { Typography } from '@/src/components/ui/Typography';
import { Badge } from '@/src/components/ui/Badge';
import { LayerSwitcher } from '@/src/components/contract/LayerSwitcher';
import { TldrCards } from '@/src/components/contract/TldrCards';
import { ClauseCard } from '@/src/components/contract/ClauseCard';
import { ConsentToggle } from '@/src/components/contract/ConsentToggle';
import { ConsentMatrix } from '@/src/components/contract/ConsentMatrix';
import { SectionHeader } from '@/src/components/contract/SectionHeader';

const EMPTY_CONSENT: Record<string, boolean> = {};
const EMPTY_SIGS: any[] = [];

export default function ContractViewerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const contract = useContractStore((s) => s.contracts[id!]);
  const consentState = useContractStore((s) => s.consentStates[id!]) ?? EMPTY_CONSENT;
  const setConsent = useContractStore((s) => s.setConsent);
  const signContract = useContractStore((s) => s.signContract);
  const signatures = useContractStore((s) => s.signatures[id!]) ?? EMPTY_SIGS;
  const profile = usePatientStore((s) => s.profile);

  const [activeLayer, setActiveLayer] = useState<ViewLayer>('tldr');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [showMatrix, setShowMatrix] = useState(false);

  if (!contract) {
    return (
      <View style={styles.errorContainer}>
        <Typography variant="h2" color="tertiary">
          Contract not found
        </Typography>
      </View>
    );
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const handleSign = () => {
    if (!profile) return;
    const receipt = signContract(contract.id, profile.id);
    Alert.alert(
      'Contract Signed',
      `Your consent decisions have been cryptographically recorded.\n\nReceipt hash: ${receipt.signatureHash.slice(0, 16)}...`,
      [
        { text: 'View Receipt', onPress: () => router.push(`/contract/${id}/receipt`) },
        { text: 'OK' },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: contract.metadata.organization.name,
        }}
      />
      <View style={styles.container}>
        <LayerSwitcher activeLayer={activeLayer} onLayerChange={setActiveLayer} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Contract header */}
          <View style={styles.header}>
            <Typography variant="h2" color="primary">
              {contract.metadata.title}
            </Typography>
            <View style={styles.metaRow}>
              <Badge text={`v${contract.version}`} size="sm" />
              {contract.metadata.regulatoryFramework.map((fw) => (
                <Badge key={fw} text={fw} size="sm" />
              ))}
              {contract.previousVersion && (
                <Pressable
                  onPress={() => router.push(`/contract/${id}/diff`)}
                >
                  <Badge text="VIEW CHANGES" size="sm" />
                </Pressable>
              )}
            </View>
            <Typography variant="caption" color="tertiary" style={styles.metaDate}>
              Effective: {new Date(contract.metadata.effectiveDate).toLocaleDateString()}
              {contract.metadata.expirationDate &&
                ` · Expires: ${new Date(contract.metadata.expirationDate).toLocaleDateString()}`}
            </Typography>
          </View>

          {/* TL;DR Layer */}
          {activeLayer === 'tldr' && (
            <TldrCards
              cards={contract.metadata.tldr}
              onCardPress={(sectionIds) => {
                setActiveLayer('plain');
                setExpandedSections(new Set(sectionIds));
              }}
            />
          )}

          {/* Sections for non-TL;DR layers */}
          {activeLayer !== 'tldr' && (
            <View style={styles.sections}>
              {contract.sections.map((section) => {
                const isExpanded = expandedSections.has(section.id);
                const sectionConsents = contract.consentItems.filter((ci) =>
                  section.relatedConsentItemIds.includes(ci.id)
                );

                return (
                  <View key={section.id} style={styles.sectionBlock}>
                    <SectionHeader
                      title={section.title}
                      clauseCount={section.clauses.length}
                      consentCount={sectionConsents.length}
                      isExpanded={isExpanded}
                      onToggle={() => toggleSection(section.id)}
                    />

                    {isExpanded && (
                      <View style={styles.sectionContent}>
                        {/* Clauses */}
                        {section.clauses.map((clause) => (
                          <ClauseCard
                            key={clause.id}
                            clause={clause}
                            layer={activeLayer}
                          />
                        ))}

                        {/* Related consent toggles */}
                        {sectionConsents.length > 0 && (
                          <View style={styles.consentSection}>
                            <Typography
                              variant="label"
                              color="secondary"
                              style={styles.consentLabel}
                            >
                              YOUR CONSENT CHOICES
                            </Typography>
                            {sectionConsents.map((item) => (
                              <ConsentToggle
                                key={item.id}
                                item={item}
                                value={consentState[item.id] ?? item.defaultValue}
                                onValueChange={(value) =>
                                  setConsent(contract.id, item.id, value)
                                }
                              />
                            ))}
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                );
              })}

              {/* Consent Matrix Toggle */}
              <Pressable
                style={styles.matrixToggle}
                onPress={() => setShowMatrix(!showMatrix)}
              >
                <Typography variant="bodyBold" style={styles.matrixToggleText}>
                  {showMatrix ? 'Hide' : 'Show'} Full Consent Matrix
                </Typography>
              </Pressable>

              {showMatrix && (
                <ConsentMatrix
                  items={contract.consentItems}
                  consentState={consentState}
                  onToggle={(consentItemId, value) =>
                    setConsent(contract.id, consentItemId, value)
                  }
                />
              )}
            </View>
          )}
        </ScrollView>

        {/* Bottom action bar */}
        <View style={styles.actionBar}>
          {signatures.length > 0 && (
            <Pressable
              style={styles.receiptButton}
              onPress={() => router.push(`/contract/${id}/receipt`)}
            >
              <Typography variant="bodyBold" style={styles.receiptButtonText}>
                View Receipt
              </Typography>
            </Pressable>
          )}
          <Pressable
            style={[styles.signButton, signatures.length > 0 && styles.signButtonSmall]}
            onPress={handleSign}
          >
            <Typography variant="bodyBold" style={styles.signButtonText}>
              {signatures.length > 0 ? 'Update & Sign' : 'Review & Sign'}
            </Typography>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface.background,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.divider,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  metaDate: {
    marginTop: spacing.sm,
  },
  sections: {
    paddingHorizontal: spacing.sm,
  },
  sectionBlock: {
    marginBottom: spacing.xs,
  },
  sectionContent: {
    padding: spacing.sm,
  },
  consentSection: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.surface.divider,
  },
  consentLabel: {
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  matrixToggle: {
    margin: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.primary[50],
    borderRadius: radii.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary[200],
    borderStyle: 'dashed',
  },
  matrixToggleText: {
    color: colors.primary[700],
  },
  actionBar: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.surface.card,
    borderTopWidth: 1,
    borderTopColor: colors.surface.border,
    gap: spacing.sm,
    ...shadows.lg,
  },
  signButton: {
    flex: 1,
    backgroundColor: colors.primary[500],
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  signButtonSmall: {
    flex: 2,
  },
  signButtonText: {
    color: colors.text.inverse,
  },
  receiptButton: {
    flex: 1,
    backgroundColor: colors.surface.background,
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  receiptButtonText: {
    color: colors.primary[700],
  },
});
