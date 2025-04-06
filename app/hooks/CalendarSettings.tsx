import React, { createContext, useContext, useState, useEffect } from 'react';
import StorageService from '@/app/utils/StorageService';

export enum CalendarType {
    Gregorian = 'gregorian',
    Jewish = 'jewish',
}

// Default values for settings
const DEFAULT = {
    calendarType: CalendarType.Jewish,
    showOmer: true,
    showYomTov: true,
    showParash: true,
};

interface CalendarSettingsContextProps {
    calendarType: CalendarType;
    showOmer: boolean;
    showYomTov: boolean;
    showParash: boolean;
    setCalendarType: (type: CalendarType) => void;
    toggleShowOmer: () => void;
    toggleShowYomTov: () => void;
    toggleShowParash: () => void;
}

const CalendarSettingsContext = createContext<CalendarSettingsContextProps | undefined>(undefined);

export const CalendarSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [calendarType, setCalendarTypeState] = useState<CalendarType>(DEFAULT.calendarType);
    const [showOmer, setShowOmerState] = useState(DEFAULT.showOmer);
    const [showYomTov, setShowYomTovState] = useState(DEFAULT.showYomTov);
    const [showParash, setShowParashState] = useState(DEFAULT.showParash);

    // Keys for AsyncStorage
    const STORAGE_KEYS = {
        calendarType: 'calendarType',
        showOmer: 'showOmer',
        showYomTov: 'showYomTov',
        showParash: 'showParash',
    };

    // Load settings from AsyncStorage when the provider initializes
    useEffect(() => {
        const loadSettings = async () => {
            const savedCalendarType = await StorageService.load(STORAGE_KEYS.calendarType);
            const savedShowOmer = await StorageService.load(STORAGE_KEYS.showOmer);
            const savedShowYomTov = await StorageService.load(STORAGE_KEYS.showYomTov);
            const savedShowParash = await StorageService.load(STORAGE_KEYS.showParash);

            setCalendarTypeState(savedCalendarType ? (savedCalendarType as CalendarType) : DEFAULT.calendarType);
            setShowOmerState(savedShowOmer ? savedShowOmer === 'true' : DEFAULT.showOmer);
            setShowYomTovState(savedShowYomTov ? savedShowYomTov === 'true' : DEFAULT.showYomTov);
            setShowParashState(savedShowParash ? savedShowParash === 'true' : DEFAULT.showParash);
        };

        loadSettings();
    }, []);

    // Save `calendarType` to AsyncStorage
    const setCalendarType = async (type: CalendarType) => {
        setCalendarTypeState(type);
        await StorageService.save(STORAGE_KEYS.calendarType, type);
    };

    // Save `showOmer` to AsyncStorage
    const toggleShowOmer = async () => {
        setShowOmerState((prev) => {
            const newValue = !prev;
            StorageService.save(STORAGE_KEYS.showOmer, newValue.toString());
            return newValue;
        });
    };

    // Save `showYomTov` to AsyncStorage
    const toggleShowYomTov = async () => {
        setShowYomTovState((prev) => {
            const newValue = !prev;
            StorageService.save(STORAGE_KEYS.showYomTov, newValue.toString());
            return newValue;
        });
    };

    // Save `showParash` to AsyncStorage
    const toggleShowParash = async () => {
        setShowParashState((prev) => {
            const newValue = !prev;
            StorageService.save(STORAGE_KEYS.showParash, newValue.toString());
            return newValue;
        });
    };

    return (
        <CalendarSettingsContext.Provider
            value={{
                calendarType,
                showOmer,
                showYomTov,
                showParash,
                setCalendarType,
                toggleShowOmer,
                toggleShowYomTov,
                toggleShowParash,
            }}
        >
            {children}
        </CalendarSettingsContext.Provider>
    );
};

export const useCalendarSettings = () => {
    const context = useContext(CalendarSettingsContext);
    if (!context) {
        throw new Error('useCalendarSettings must be used within a CalendarSettingsProvider');
    }
    return context;
};