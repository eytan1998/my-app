import React from 'react';
import { AuthProvider } from './hooks/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Auth/LoginScreen';
import SignupScreen from './screens/Auth/SignUpScreen';
import ForgotPasswordScreen from './screens/Auth/ForgotPasswordScreen';
import { createStackNavigator } from '@react-navigation/stack';

import { LanguageProvider } from './hooks/LanguageContext';
import { LocationProvider } from './hooks/LocationContext';
import DrawerLayout from './navigations/DrawerLayout';


export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Drawer: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function Layout() {
  // Android-specific layout
  return  (
    <AuthProvider>
    <LanguageProvider>
      <LocationProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: true, title: "" }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: true, title: "" }} />
            <Stack.Screen name="Drawer" component={DrawerLayout} options={{ headerShown: false }} />
          </Stack.Navigator>
      </LocationProvider>
    </LanguageProvider>
  </AuthProvider>
  );
}