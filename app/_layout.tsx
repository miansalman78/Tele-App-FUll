import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ScriptProvider } from '../contexts/ScriptContext';
import { VolumeProvider } from '../contexts/VolumeContext';
// Import polyfills for AWS SDK compatibility
import '../utils/polyfills';
import React from 'react';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <VolumeProvider>
      <ScriptProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="screens/videoShoot"
            options={{
              headerShown: false,
              title: 'Video Shoot',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="screens/EditVideo"
            options={{
              headerShown: false,
              presentation: 'card',
              animation: 'slide_from_right',
              title: 'Edit Video',
            }}
          />
          <Stack.Screen
            name="screens/Preview"
            options={{
              headerShown: false,
              presentation: 'card',
              animation: 'slide_from_right',
              title: 'Preview',
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ScriptProvider>
    </VolumeProvider>
  );
}