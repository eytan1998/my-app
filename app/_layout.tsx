import React from 'react';
import { LanguageProvider } from './hooks/LanguageContext';
import DrawerLayout from './navigations/DrawerLayout'; // Import the separated DrawerLayout
import { LocationProvider } from './hooks/LocationContext';

export default function Layout() {
  return (
    <LanguageProvider>
        <LocationProvider>
            <DrawerLayout />
        </LocationProvider>
    </LanguageProvider>

  );
}