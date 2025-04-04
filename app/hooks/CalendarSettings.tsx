import React, { createContext, useContext, useState } from 'react';

export enum CalendarType {
    Gregorian = 'gregorian',
    Jewish = 'jewish',
}
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
    const [calendarType, setCalendarType] = useState<CalendarType>(CalendarType.Jewish);
    const [showOmer, setShowOmer] = useState(true);
    const [showYomTov, setShowYomTov] = useState(true);
    const [showParash, setShowParash] = useState(true);

    const toggleShowOmer = () => setShowOmer((prev) => !prev);
    const toggleShowYomTov = () => setShowYomTov((prev) => !prev);
    const toggleShowParash = () => setShowParash((prev) => !prev);

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