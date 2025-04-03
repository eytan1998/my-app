import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';

interface AuthFormProps {
  title: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  signup?: () => void;
  login?: () => void;
}

export default function AuthForm({ title, onSubmit, signup, login }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(email, password);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      {loading ? <ActivityIndicator size="large" /> : <Button title={title} onPress={handleSubmit} />}
      {signup && <Button title="Signup" onPress={signup} />}
      {login && <Button title="Back to Login" onPress={login} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  button: {marginTop:10,},
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
});