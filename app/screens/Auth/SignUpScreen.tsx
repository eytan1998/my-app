import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/app/navigations/AppNavigator';
import { FontAwesome } from '@expo/vector-icons';
import { useLanguage } from '@/app/hooks/LanguageContext';
import { useAuth } from '@/app/hooks/AuthContext';

// Type-safe navigation
type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

export default function SignupScreen() {
  const navigation = useNavigation<AuthNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { translations, direction} = useLanguage();
  const {signup} = useAuth();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert(translations.Error, translations.AllFieldsRequired);
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(translations.Error, translations.PasswordsDoNotMatch);
      return;
    }
    try {
      signup(email, password);
      Alert.alert(translations.Success, translations.AccountCreated);
      navigation.navigate('Login')


    } catch (error: any) {
      let errorMessage = translations.UnknownError; // Default error message
      console.error(error);
      if (error.message.includes('email-already-in-use')) {
        errorMessage += "\n" + translations.EmailAlreadyInUse;
      }
      if (error.message.includes('auth/invalid-email')) {
        errorMessage += "\n" + translations.InvalidEmail;
      }
      if (error.message.includes('auth/weak-password')) {
        errorMessage += "\n" + translations.WeakPassword;
      }
      Alert.alert(translations.Error, errorMessage);
    }
  };

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      <Image source={require('../../../assets/images/icon.png')} style={styles.logo} />
      <Text style={styles.title}>{translations.CreateAccount}</Text>

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

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={translations.ConfirmPassword}
          placeholderTextColor="#bbb"
          // secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Signup Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>{translations.Signup}</Text>
      </TouchableOpacity>

      {/* Login Navigation */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>{translations.AlreadyHaveAccount}<Text style={styles.loginLink}>{translations.Login}</Text></Text>
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
  signupButton: {
    backgroundColor: '#FF6B6B',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: 'white',
    marginTop: 15,
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
});
