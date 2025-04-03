import React, { useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import { useLanguage } from '../../hooks/LanguageContext';
import { TextInput, Button, Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const ForgotPasswordScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const { resetPassword } = useAuth();
    const { translations } = useLanguage();

    const handlePasswordReset = async () => {
            try {
                await resetPassword(email);
                Alert.alert(translations.Success, translations.PasswordResetEmailSent);
            } catch (error: any) {
                let errorMessage = ""; // Default error message
                console.error(error);
                if (error.message.includes('auth/invalid-email')) {
                errorMessage += "\n" + translations.InvalidEmail;
                }
                if (error.message.includes('auth/user-not-found')) {
                errorMessage += "\n" + translations.UserNotFound;
                }
                if (error.message.includes('auth/user-disabled')) {
                errorMessage += "\n" + translations.UserDisabled;
                }
                if (error.message.includes('auth/too-many-requests')) {
                errorMessage += "\n" + translations.TooManyRequests;
                }
                if (error.message.includes('auth/network-request-failed')) {
                errorMessage += "\n" + translations.NetworkRequestFailed;
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
        <View style={styles.container}>
            <Text style={styles.title}>{translations.ForgotPassword}</Text>
            <Text style={styles.description}>{translations.PasswordResetInstruction}</Text>

            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={translations.Email}
                keyboardType="email-address"
                style={styles.input}
            />

            <Button title={translations.ResetPassword} onPress={handlePasswordReset} color="#3B71F3" />

            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F4F6FA',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 15,
        marginBottom: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    message: {
        fontSize: 14,
        color: '#e74c3c',
        marginTop: 15,
    },
    link: {
        fontSize: 16,
        color: '#3B71F3',
        marginTop: 20,
        textDecorationLine: 'underline',
    },
});

export default ForgotPasswordScreen;
