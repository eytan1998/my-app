import React, { createContext, useState, useContext, useEffect } from 'react';
import * as Location from 'expo-location';
import StorageService from '@/app/utils/StorageService';

export interface Coordinates {
  latitude: number;
  longitude: number;
  altitude: number | undefined;
  toString: () => string;
}

interface LocationContextType {
  currentCoordinates: Coordinates;
  savedLocations: string[];
  selectedLocation: string | null;
  setCurrentCoordinates: (coordinates: Coordinates) => void;
  setCurrentCoordinatesWithAdress: (address: string) => void;
  saveLocation: (address: string) => Promise<void>;
  deleteLocation: (address: string) => Promise<void>;
  setSelectedLocation: (address: string | null) => Promise<void>;
  loadSavedLocations: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const STORAGE_KEYS = {
  savedLocations: 'savedLocations',
  currentCoordinates: 'currentCoordinates',
  selectedLocation: 'selectedLocation',
};

const requestLocationPermissions = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Location permission not granted');
  }
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCoordinates, setCurrentLocation] = useState<Coordinates>({
    latitude: 31.778002796877995,
    longitude: 35.235342741831445,
    altitude: 700,
  });
  const [savedLocations, setSavedLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocationState] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      const locations = await StorageService.load(STORAGE_KEYS.savedLocations);
      if (locations) {
        setSavedLocations(JSON.parse(locations));
      }

      const coordinates = await StorageService.load(STORAGE_KEYS.currentCoordinates);
      if (coordinates) {
        setCurrentLocation(JSON.parse(coordinates));
      }

      const savedSelectedLocation = await StorageService.load(STORAGE_KEYS.selectedLocation);
      if (savedSelectedLocation) {
        setSelectedLocationState(savedSelectedLocation);
      }
    };

    loadInitialData();
  }, []);

  const setCurrentCoordinates = async (coordinates: Coordinates) => {
    setCurrentLocation(coordinates);
    await StorageService.save(STORAGE_KEYS.currentCoordinates, JSON.stringify(coordinates));
  };

  const setCurrentCoordinatesWithAdress = async (address: string) => {
    try {
      await requestLocationPermissions();
      const geocode = await Location.geocodeAsync(address);
      if (geocode.length === 0) {
        throw new Error('Address not found');
      }
      const { latitude, longitude, altitude } = geocode[0];
      const newCoordinates = { latitude, longitude, altitude };
      await setCurrentCoordinates(newCoordinates);
    } catch (error) {
      console.error('Error during geocoding:', error);
    }
  };

  const saveLocation = async (address: string) => {
    if (!address.trim()) return;

    const updatedLocations = [...savedLocations, address];
    setSavedLocations(updatedLocations);
    await StorageService.save(STORAGE_KEYS.savedLocations, JSON.stringify(updatedLocations));
  };

  const deleteLocation = async (address: string) => {
    const updatedLocations = savedLocations.filter((location) => location !== address);
    setSavedLocations(updatedLocations);
    await StorageService.save(STORAGE_KEYS.savedLocations, JSON.stringify(updatedLocations));

    if (selectedLocation === address) {
      await setSelectedLocation(null); // Clear the selected location if it was deleted
    }
  };

  const setSelectedLocation = async (address: string | null) => {
    setSelectedLocationState(address);
    if (address) {
      await setCurrentCoordinatesWithAdress(address); // Update coordinates
      await StorageService.save(STORAGE_KEYS.selectedLocation, address); // Persist the selected location
    } else {
      await StorageService.remove(STORAGE_KEYS.selectedLocation); // Clear the selected location from storage
    }
  };

  const loadSavedLocations = async () => {
    const locations = await StorageService.load(STORAGE_KEYS.savedLocations);
    if (locations) {
      setSavedLocations(JSON.parse(locations));
    }
  };

  return (
    <LocationContext.Provider
      value={{
        currentCoordinates,
        savedLocations,
        selectedLocation,
        setCurrentCoordinates,
        setCurrentCoordinatesWithAdress,
        saveLocation,
        deleteLocation,
        setSelectedLocation,
        loadSavedLocations,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export default LocationProvider;