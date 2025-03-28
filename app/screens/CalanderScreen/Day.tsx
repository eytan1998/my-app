import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

interface DayProps {
    jewishDate: string; // e.g., "1 Tishrei 5784"
    gregorianDate: string; // e.g., "2023-09-16"
    events?: React.ReactNode; // Icons or elements to represent events
}

const Day: React.FC<{ gregorianDate: string }> = ({ gregorianDate }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.gregorianDate}>{gregorianDate}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        width: 120,
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
    },
    dateContainer: {
        marginBottom: 8,
    },
    jewishDate: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    gregorianDate: {
        fontSize: 12,
        color: '#666',
    },
    eventsContainer: {
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4, // Note: `gap` is not supported in React Native styles
    },
});

export default Day;