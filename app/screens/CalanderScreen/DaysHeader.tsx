import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../../hooks/LanguageContext';
import { directions } from '@/assets/LanguageConfig';


const DaysHeader = () => {
  const {translations,direction} = useLanguage();
  const days = translations.daysOfWeek;
  
  return (
    <View
      style={{
      flexDirection: direction === directions.rtl ? 'row-reverse' : 'row',
      justifyContent: 'space-around',
      padding: 10,
      marginVertical: 1, // Adds floating effect
      backgroundColor: '#f9f9f9', // Optional: Adds a subtle background
      elevation: 2, // Optional: Adds shadow for floating effect (Android)
      shadowColor: '#000', // Optional: Shadow for iOS
      shadowOffset: { width: 0, height: 2 }, // Optional: Shadow for iOS
      shadowOpacity: 0.2, // Optional: Shadow for iOS
      shadowRadius: 4, // Optional: Shadow for iOS
      }}
    >
      {days.map((day, index) => (
      <React.Fragment key={index}>
        <View style={{ alignItems: 'center', flex: 1 }}>
        <Text>{day}</Text>
        </View>
        {index < days.length - 1 && (
        <View
          style={{
          width: 1,
          backgroundColor: '#ccc',
          marginHorizontal: 5,
          }}
        />
        )}
      </React.Fragment>
      ))}
    </View>
  );
};
export default DaysHeader;