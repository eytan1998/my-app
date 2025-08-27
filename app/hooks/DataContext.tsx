import React, { createContext, useContext, useState, useEffect } from 'react';
import { MonthMetadata } from '@/assets/Models/UserData';
import { loadMonthEvents, addEventToDay, removeEventFromDay } from '@/assets/firebase/firebaseService';
import { EventType } from '@/assets/Models/Events/Events';

type DataContextType = {
  monthData: { [month: string]: MonthMetadata };
  getMonthData: (userId: string, month: string) => Promise<MonthMetadata>;
  addEvent: (userId: string, date: Date, eventType: EventType) => Promise<void>;
  removeEvent: (userId: string, date: Date) => Promise<void>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [monthData, setMonthData] = useState<{ [month: string]: MonthMetadata }>({});

  const getMonthData = async (userId: string, month: string): Promise<MonthMetadata> => {
    if (monthData[month]) {
      return monthData[month];
    }
    const data = await loadMonthEvents(userId, month);
    setMonthData(prev => ({ ...prev, [month]: data }));
    return data;
  };

  const addEvent = async (userId: string, date: Date, eventType: EventType) => {
    await addEventToDay(userId, date, eventType);
    const month = getMonthString(date);
    const day = getDayString(date);
    
  };

  const removeEvent = async (userId: string, date: Date) => {
    await removeEventFromDay(userId, date);
    const month = getMonthString(date);
    const day = getDayString(date);
    setMonthData(prev => {
      const updatedMonth = { ...prev[month] };
      delete updatedMonth[day];
      return {
        ...prev,
        [month]: updatedMonth,
      };
    });
  };

  return (
    <DataContext.Provider value={{ monthData, getMonthData, addEvent, removeEvent }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
      throw new Error('useCalendar must be used within a CalendarProvider');
    }
    return context;
  };

// Utility helpers
const getMonthString = (date: Date): string =>
    `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;
  const getDayString = (date: Date): string =>
    `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  