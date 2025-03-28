import React, { createContext, useState, useContext } from 'react';
import * as Location from 'expo-location';

export interface Coordinates {
  latitude: number;
  longitude: number;
  altitude: number | undefined;
  toString: () => string;
}

interface LocationContext {
  currentCoordinates: Coordinates;
  setCurrentCoordinates: (coordinates: Coordinates) => void;
  setCurrentCoordinatesWithAdress: (address: string) => void;
}

const LocationContext = createContext<LocationContext | undefined>(undefined);

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
      altitude: 700});

  const setCurrentCoordinates = (coordinates: Coordinates) => {
    setCurrentLocation(coordinates);
  };
  const setCurrentCoordinatesWithAdress = async (address: string) => {
    try {

          // Request location permissions
      await requestLocationPermissions();

      const geocode = await Location.geocodeAsync(address); // Ensure function is imported
      if (geocode.length === 0) {
        throw new Error('Address not found');
      }
      const { latitude, longitude, altitude } = geocode[0];
      setCurrentCoordinates({ latitude, longitude, altitude });
    } catch (error) {
      console.error('Error during geocoding:', error);
    }
   };
  return (
    <LocationContext.Provider value={{ currentCoordinates: currentCoordinates,
     setCurrentCoordinates: setCurrentLocation,
      setCurrentCoordinatesWithAdress: setCurrentCoordinatesWithAdress }}>
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