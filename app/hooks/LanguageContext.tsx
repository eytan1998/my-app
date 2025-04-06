import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageConfig, DEFAULT_LANGUAGE, directions, languages } from '@/assets/LanguageConfig';
import { Translations } from '@/assets/translations';

interface LanguageContextType {
  language: languages;
  toggleLanguage: () => void; // Updated to toggle language
  direction: directions;
  translations: typeof Translations[languages];
  isHebrew: () => boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: DEFAULT_LANGUAGE,
  toggleLanguage: () => {
    throw new Error('toggleLanguage must be used within a LanguageProvider');
  },
  direction: LanguageConfig[DEFAULT_LANGUAGE].direction,
  translations: Translations[DEFAULT_LANGUAGE],
  isHebrew: () => false,
});

export const useLanguage = () => useContext(LanguageContext);
// Keys for AsyncStorage
const STORAGE_KEYS = {
  appLanguage: 'appLanguage',
};
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<languages>(DEFAULT_LANGUAGE);
  const [direction, setDirection] = useState<directions>(LanguageConfig[DEFAULT_LANGUAGE].direction);
  const [translations, setTranslations] = useState<typeof Translations[languages]>(
    Translations[DEFAULT_LANGUAGE]
  );

  // Load saved language from AsyncStorage when the provider initializes
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = (await AsyncStorage.getItem(STORAGE_KEYS.appLanguage)) as languages | null;
      if (savedLanguage && LanguageConfig[savedLanguage]) {
        setLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, []);

  // Function to set the language and persist it in AsyncStorage
  const setLanguage = async (lang: languages) => {
    if (!LanguageConfig[lang]) return; // Ensure the language is supported

    setLanguageState(lang);
    setDirection(LanguageConfig[lang].direction);
    setTranslations(Translations[lang]);

    // Update the layout direction
    const isRTL = LanguageConfig[lang].direction === directions.rtl;
    I18nManager.forceRTL(isRTL);

    // Save the selected language to AsyncStorage
    await AsyncStorage.setItem(STORAGE_KEYS.appLanguage, lang);
  };

  // Function to toggle between Hebrew and English
  const toggleLanguage = async () => {
    const nextLanguage = language === languages.he ? languages.en : languages.he; // Toggle between Hebrew and English
    await setLanguage(nextLanguage);
  };

  // Define the isHebrew function
  const isHebrew = () => language === 'he';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, direction, translations, isHebrew }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;