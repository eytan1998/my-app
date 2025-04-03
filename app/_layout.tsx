import React from 'react';
import { AuthProvider } from './hooks/AuthContext';
import { LanguageProvider } from './hooks/LanguageContext';
import { LocationProvider } from './hooks/LocationContext';
import AppNavigator from './navigations/AppNavigator';

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
