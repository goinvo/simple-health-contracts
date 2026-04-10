import { create } from 'zustand';
import { PatientProfile } from '@/src/schema/types';

interface PatientStore {
  profile: PatientProfile | null;
  hasCompletedOnboarding: boolean;

  setProfile: (profile: PatientProfile) => void;
  completeOnboarding: () => void;
}

export const usePatientStore = create<PatientStore>()((set) => ({
  profile: {
    id: 'patient-001',
    name: 'Alex Rivera',
    dateOfBirth: '1988-03-15',
    email: 'alex.rivera@email.com',
  },
  hasCompletedOnboarding: false,

  setProfile: (profile) => set({ profile }),
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
}));
