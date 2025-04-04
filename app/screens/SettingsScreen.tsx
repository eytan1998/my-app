import React from 'react';
import { View, Button, Text, Switch } from 'react-native';
import { useTheme } from '@/app/hooks/ThemeContext';
import { useLanguage } from '@/app/hooks/LanguageContext';
import { useCalendarSettings,CalendarType } from '@/app/hooks/CalendarSettings';
import { directions, languages } from '@/assets/LanguageConfig';

export default function SettingsScreen() {
    const { theme } = useTheme();
    const { language, setLanguage, direction } = useLanguage();
    const {
        calendarType,
        showOmer,
        showYomTov,
        showParash,
        setCalendarType,
        toggleShowOmer,
        toggleShowYomTov,
        toggleShowParash,
    } = useCalendarSettings();

    const toggleLanguage = () => {
        const nextLanguage = language === languages.en ? languages.he : languages.en;
        setLanguage(nextLanguage);
    };

    return (
        <View style={{ flex: 1, padding: 16, alignItems: direction === directions.rtl ? 'flex-end' : 'flex-start' }}>
            <Text>Language: {language}</Text>
            <Button title="Toggle Language" onPress={toggleLanguage} />

            {/* <Text>Theme: {theme}</Text> */}
            {/* Add a button or toggle for theme switching if needed */}

            <Text>Calendar Type</Text>
            <Button
                title={`Switch to ${calendarType === CalendarType.Gregorian ? CalendarType.Jewish : CalendarType.Gregorian} Calendar`}
                onPress={() => setCalendarType(calendarType === CalendarType.Gregorian ? CalendarType.Jewish : CalendarType.Gregorian)}
            />

            <Text>Show Omer</Text>
            <Switch value={showOmer} onValueChange={toggleShowOmer} />

            <Text>Show Yom Tov</Text>
            <Switch value={showYomTov} onValueChange={toggleShowYomTov} />

            <Text>Show Parash</Text>
            <Switch value={showParash} onValueChange={toggleShowParash} />
        </View>
    );
}