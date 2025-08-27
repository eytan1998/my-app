import AsyncStorage from '@react-native-async-storage/async-storage';
import {log,LogLevel} from '@/app/utils/Logger';

const fileName = 'StorageService.ts';
const StorageService = {
    // Save a key-value pair
    async save(key: string, value: string) {
        try {
            await AsyncStorage.setItem(key, value);
            log(LogLevel.DEBUG,`Saved ${key}: ${value}`);
        } catch (error) {
            console.error(`Error saving ${key}:`, error);
        }
    },

    // Retrieve a value by key
    async load(key: string): Promise<string | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            log(LogLevel.DEBUG,`Loaded ${key}: ${value}`,fileName);
            return value;
        } catch (error) {
            log(LogLevel.ERROR,`Error loading ${key}:`,fileName, error);
            return null;
        }
    },

    // Remove a key-value pair
    async remove(key: string) {
        try {
            await AsyncStorage.removeItem(key);
            log(LogLevel.DEBUG,`Removed ${key}`,fileName);
        } catch (error) {
            log(LogLevel.ERROR,`Error removing ${key}:`,fileName, error);
        }
    },

    // Clear all stored data
    async clear() {
        try {
            await AsyncStorage.clear();
            log(LogLevel.DEBUG,'Cleared all AsyncStorage data',fileName);
        } catch (error) {
            log(LogLevel.ERROR,'Error clearing AsyncStorage:',fileName, error);
        }
    },
};

export default StorageService;