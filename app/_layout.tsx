import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useContractStore } from '@/src/store/useContractStore';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const loadContracts = useContractStore((s) => s.loadContracts);

  useEffect(() => {
    loadContracts();
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#F8FAFC' },
          headerTintColor: '#1E3A5F',
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: '#F8FAFC' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="contract/[id]/index"
          options={{ title: 'Contract', headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="contract/[id]/diff"
          options={{ title: 'What Changed', presentation: 'modal' }}
        />
        <Stack.Screen
          name="contract/[id]/receipt"
          options={{ title: 'Consent Receipt', presentation: 'modal' }}
        />
        <Stack.Screen
          name="onboarding/index"
          options={{ headerShown: false, presentation: 'fullScreenModal' }}
        />
      </Stack>
    </>
  );
}
