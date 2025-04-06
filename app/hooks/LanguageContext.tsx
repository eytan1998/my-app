// Provides context and functionality for managing the application's language settings.
// This includes toggling between supported languages, persisting the selected language,
// and updating the layout direction (RTL or LTR) based on the language.

import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageConfig, directions, languages } from '@/assets/LanguageConfig';
import { Translations } from '@/assets/translations';

interface LanguageContextType {
  /**
   * The current language of the application.
   */
  language: languages;

  /**
   * Toggles the language between Hebrew and English.
   */
  toggleLanguage: () => void;

  /**
   * The current layout direction (RTL or LTR) based on the language.
   */
  direction: directions;

  /**
   * The translations for the current language.
   */
  translations: typeof Translations[languages];

  /**
   * Checks if the current language is Hebrew.
   * @returns {boolean} True if the language is Hebrew, otherwise false.
   */
  isHebrew: () => boolean;
}

// Default language for the application.
export const DEFAULT_LANGUAGE = languages.he;

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
  // State for the current language, direction, and translations.
  const [language, setLanguageState] = useState<languages>(DEFAULT_LANGUAGE);
  const [direction, setDirection] = useState<directions>(LanguageConfig[DEFAULT_LANGUAGE].direction);
  const [translations, setTranslations] = useState<typeof Translations[languages]>(
    Translations[DEFAULT_LANGUAGE]
  );

  // Load saved language from AsyncStorage when the provider initializes.
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = (await AsyncStorage.getItem(STORAGE_KEYS.appLanguage)) as languages | null;
      if (savedLanguage && LanguageConfig[savedLanguage]) {
        setLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, []);

  /**
   * Sets the application's language and persists it in AsyncStorage.
   * Updates the layout direction and translations accordingly.
   * @param lang The language to set.
   */
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

  /**
   * Toggles the application's language between Hebrew and English.
   */
  const toggleLanguage = async () => {
    const nextLanguage = language === languages.he ? languages.en : languages.he; // Toggle between Hebrew and English
    await setLanguage(nextLanguage);
  };

  /**
   * Checks if the current language is Hebrew.
   * @returns {boolean} True if the language is Hebrew, otherwise false.
   */
  const isHebrew = () => language === languages.he;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, direction, translations, isHebrew }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;