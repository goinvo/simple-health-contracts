import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '@/src/theme/tokens';

type IconName = React.ComponentProps<typeof FontAwesome>['name'];

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export function Icon({ name, size = 18, color = colors.text.primary }: IconProps) {
  return <FontAwesome name={name} size={size} color={color} />;
}

// Mapping from semantic concepts to FontAwesome icon names
export const icons = {
  // Organization types
  hospital: 'hospital-o' as IconName,
  telehealth: 'mobile-phone' as IconName,
  research: 'flask' as IconName,
  clinic: 'medkit' as IconName,
  insurer: 'building-o' as IconName,
  pharmacy: 'plus-square-o' as IconName,
  organization: 'building' as IconName,

  // TL;DR / contract concepts
  careTeam: 'stethoscope' as IconName,
  lock: 'lock' as IconName,
  billing: 'credit-card' as IconName,
  researchOpt: 'eyedropper' as IconName,
  thirdParty: 'exchange' as IconName,
  encrypted: 'shield' as IconName,
  cloud: 'cloud' as IconName,
  analytics: 'bar-chart' as IconName,
  ai: 'microchip' as IconName,
  hospitalShare: 'share-alt' as IconName,
  dna: 'heartbeat' as IconName,
  clock: 'clock-o' as IconName,
  deidentified: 'user-secret' as IconName,
  findings: 'search' as IconName,
  partners: 'globe' as IconName,

  // Layer switcher
  tldr: 'bolt' as IconName,
  plain: 'comment-o' as IconName,
  legal: 'gavel' as IconName,
  visual: 'area-chart' as IconName,

  // UI actions
  user: 'user-o' as IconName,
  export: 'upload' as IconName,
  trash: 'trash-o' as IconName,
  receipt: 'file-text-o' as IconName,
  check: 'check' as IconName,
  close: 'times' as IconName,
  chevronRight: 'chevron-right' as IconName,
  chevronDown: 'chevron-down' as IconName,
  expand: 'chevron-down' as IconName,
  collapse: 'chevron-up' as IconName,
  settings: 'cog' as IconName,
  privacy: 'lock' as IconName,
  compliance: 'clipboard' as IconName,
  app: 'mobile' as IconName,

  // Visual layer
  dataFlow: 'random' as IconName,
  timeline: 'calendar' as IconName,
  checklist: 'check-square-o' as IconName,
  comparison: 'columns' as IconName,

  // Onboarding
  agreements: 'file-text-o' as IconName,
  consent: 'sliders' as IconName,
  proof: 'key' as IconName,
} as const;
