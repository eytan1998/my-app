import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageService = {
    // Save a key-value pair
    async save(key: string, value: string) {
        try {
            await AsyncStorage.setItem(key, value);
            console.log(`Saved ${key}: ${value}`);
        } catch (error) {
            console.error(`Error saving ${key}:`, error);
        }
    },

    // Retrieve a value by key
    async load(key: string): Promise<string | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            console.log(`Loaded ${key}: ${value}`);
            return value;
        } catch (error) {
            console.error(`Error loading ${key}:`, error);
            return null;
        }
    },

    // Remove a key-value pair
    async remove(key: string) {
        try {
            await AsyncStorage.removeItem(key);
            console.log(`Removed ${key}`);
        } catch (error) {
            console.error(`Error removing ${key}:`, error);
        }
    },

    // Clear all stored data
    async clear() {
        try {
            await AsyncStorage.clear();
            console.log('Cleared all AsyncStorage data');
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
        }
    },
};

export default StorageService;