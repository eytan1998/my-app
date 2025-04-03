import React from 'react';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import DrawerLayout from './DrawerLayout';
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