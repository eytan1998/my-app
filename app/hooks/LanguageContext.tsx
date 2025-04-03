import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageConfig, DEFAULT_LANGUAGE, directions, languages } from '../../assets/LanguageConfig';
import { Translations } from '../../assets/translations';

interface LanguageContextType {
  language: languages;
  setLanguage: (lang: languages) => void;
  direction: directions;
  translations: typeof Translations[languages]; // Add translations to the context type
}

const LanguageContext = createContext<LanguageContextType>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {
    throw new Error('setLanguage must be used within a LanguageProvider');
  },
  direction: LanguageConfig[DEFAULT_LANGUAGE].direction,
  translations: Translations[DEFAULT_LANGUAGE], // Default translations
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<languages>(DEFAULT_LANGUAGE);
  const [direction, setDirection] = useState<directions>(LanguageConfig[DEFAULT_LANGUAGE].direction);
  const [translations, setTranslations] = useState<typeof Translations[languages]>(
    Translations[DEFAULT_LANGUAGE]
  );

  useEffect(() => {
    // Load saved language from AsyncStorage
    const loadLanguage = async () => {
      const savedLanguage = (await AsyncStorage.getItem('appLanguage')) as languages | null;
      if (savedLanguage && LanguageConfig[savedLanguage]) {
        setLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (lang: languages) => {
    if (!LanguageConfig[lang]) return; // Ensure the language is supported

    setLanguageState(lang);
    setDirection(LanguageConfig[lang].direction);
    setTranslations(Translations[lang]); // Update translations

    // Update the layout direction
    const isRTL = LanguageConfig[lang].direction === directions.rtl;
    I18nManager.forceRTL(isRTL);

    // Save the selected language
    await AsyncStorage.setItem('appLanguage', lang);

  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, direction, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
export default LanguageProvider;