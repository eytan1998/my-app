import React from 'react';
import { View, Button, Text, Switch } from 'react-native';
import { useCalendarSettings, CalendarType } from '@/app/hooks/CalendarSettings';
import { useLanguage } from '@/app/hooks/LanguageContext';

export default function SettingsScreen() {
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

    const { toggleLanguage, isHebrew } = useLanguage();
    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text>Language</Text>
            <Button
                title={`Switch to ${isHebrew() ? 'English' : 'Hebrew'}`}
                onPress={toggleLanguage}
            />
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