import React from 'react';
import { AuthProvider } from '@/app/hooks/AuthContext';
import { LanguageProvider } from '@/app/hooks/LanguageContext';
import { LocationProvider } from '@/app/hooks/LocationContext';
import AppNavigator from '@/app/navigations/AppNavigator';

export default function Layout() {
  // Android-specific layout
  return (
    <AuthProvider>
    <LanguageProvider>
      <LocationProvider>
        <AppNavigator />
      </LocationProvider>
    </LanguageProvider>
  </AuthProvider>
  );
}
