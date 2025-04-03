import React from 'react';
import { AuthProvider } from '@/app/hooks/AuthContext';
import { LanguageProvider } from '@/app/hooks/LanguageContext';
import { LocationProvider } from '@/app/hooks/LocationContext';
import AppNavigator from '@/app/navigations/AppNavigator';
import DrawerLayout from '@/app/navigations/DrawerLayout';

export default function Layout() {
  // Android-specific layout
  return (
    <AuthProvider>
    <LanguageProvider>
      <LocationProvider>
        <DrawerLayout />
      </LocationProvider>
    </LanguageProvider>
  </AuthProvider>
  );
}
