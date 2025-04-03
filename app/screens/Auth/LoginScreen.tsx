import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigations/AppNavigator';
import { FontAwesome } from '@expo/vector-icons';
import { useLanguage } from '@/app/hooks/LanguageContext';
import { useAuth } from '@/app/hooks/AuthContext';

// Type-safe navigation
type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<AuthNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { translations } = useLanguage();
  const {currentUser, login } = useAuth(); // Access login function from context

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(translations.Error, translations.AllFieldsRequired);
      return;
    }

    try {
      await login(email, password);
      // Check if email is verified
      if (currentUser && !currentUser.emailVerified) {
        Alert.alert(translations.Error, translations.VerifyEmail);
        return;
      }
      navigation.replace('Drawer');


    } catch (error: any) {
      let errorMessage = translations.LoginFailed; // Default error message
      console.error(error);
      if (error.message.includes('auth/invalid-email')) {
        errorMessage += "\n" + translations.InvalidEmail;
      }
      if (error.message.includes('auth/user-not-found')) {
        errorMessage += "\n" + translations.UserNotFound;
      }
      if (error.message.includes('auth/wrong-password')) {
        errorMessage += "\n" + translations.WrongPassword;
      }
      if (error.message.includes('auth/user-disabled')) {
        errorMessage += "\n" + translations.UserDisabled;
      }
      if (error.message.includes('auth/too-many-requests')) {
        errorMessage += "\n" + translations.TooManyRequests;
      }
      if (error.message.includes('auth/requires-recent-login')) {
        errorMessage += "\n" + translations.RequiresRecentLogin;
      }
      if (error.message.includes('auth/network-request-failed')) {
        errorMessage += "\n" + translations.NetworkRequestFailed;
      }
      if (error.message.includes('auth/invalid-user-token')) {
        errorMessage += "\n" + translations.InvalidUserToken;
      }
      if (error.message.includes('auth/app-not-authorized')) {
        errorMessage += "\n" + translations.AppNotAuthorized;
      }
      if (error.message.includes('auth/operation-not-allowed')) {
        errorMessage += "\n" + translations.OperationNotAllowed;
      }
      Alert.alert(translations.Error, errorMessage);
    }
  };

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      <Image source={require('../../../assets/images/icon.png')} style={styles.logo} />
      <Text style={styles.title}>{translations.welcome}</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={translations.Email}
          placeholderTextColor="#bbb"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={translations.Password}
          placeholderTextColor="#bbb"
          // secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      {/* Forgot Password */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>{translations.ForgotPassword}</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>{translations.Login}</Text>
      </TouchableOpacity>

      {/* Signup Navigation */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>{translations.DontHaveAccount}<Text style={styles.signupLink}>{translations.Signup}</Text></Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: 'white',
  },
  forgotPasswordText: {
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'right',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#FF6B6B',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: 'white',
    marginTop: 15,
  },
  signupLink: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
});
