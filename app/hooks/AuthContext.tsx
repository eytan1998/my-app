import React, { createContext, useContext, useEffect, useState } from 'react';
import { sendPasswordResetEmail, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, UserCredential, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/assets/firebase/firebaseConfig';

interface AuthContextType {
  currentUser: any;
  userId: string;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!currentUser;

  // Extract userId from currentUser
  const userId = currentUser?.uid || null;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Send verification email after account creation
    await sendEmailVerification(userCredential.user);
    return userCredential;
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, userId, login, signup, logout, resetPassword, isAuthenticated }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;