import React from 'react';
import { View, Button,Text } from 'react-native';
import { useTheme } from '../hooks/ThemeContext';  // Import the custom hook
import { useLanguage } from '../hooks/LanguageContext';
import { directions, languages } from '../../assets/LanguageConfig';


export default function SettingsScreen() {
    const { theme } = useTheme();
    const { language, setLanguage, direction } = useLanguage();
   
    const toggleLanguage = () => {
       const nextLanguage = language === languages.en ? languages.he : languages.en; // Example toggle
       setLanguage(nextLanguage);
    };
   
    return (
       <View style={{ flex: 1, alignItems: direction === directions.rtl ? 'flex-end' : 'flex-start' }}>
         <Text>{language}</Text>
         <Button title="Toggle Language" onPress={toggleLanguage} />
       </View>
    );
 
}
