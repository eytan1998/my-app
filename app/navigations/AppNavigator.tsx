import React from 'react';
import LoginScreen from '@/app/screens/Auth/LoginScreen';
import SignupScreen from '@/app/screens/Auth/SignUpScreen';
import ForgotPasswordScreen from '@/app/screens/Auth/ForgotPasswordScreen';
import DrawerLayout from '@/app/navigations/DrawerLayout';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Drawer: undefined;
};
const Stack = createNativeStackNavigator<AuthStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false}} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Drawer" component={DrawerLayout} options={{ headerShown: false }} />
  </Stack.Navigator>
  );
}
export default AppNavigator;