import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

import { LocationProvider, useLocation} from '../../hooks/LocationContext';

const LocationSettingsScreen: React.FC = () => {
  const [savedLocations, setSavedLocations] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string>(''); // Add state for currentLocation
  const { currentCoordinates,setCurrentCoordinatesWithAdress} = useLocation(); // Access coordinates from the context

  const handleSaveLocation = () => {
    // Logic to save the current location
    if (currentLocation.trim()) {
      setSavedLocations([...savedLocations, currentLocation]);
      setCurrentLocation(''); // Clear the input after saving
    }
  };

  const handleTextChange = (text: string) => {
    setCurrentLocation(text); // Update the currentLocation state
  };

  const handleSelectLocation = (address: string) => {
    console.log('Selected address:', address);
    setCurrentCoordinatesWithAdress(address);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Settings</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={currentLocation}
        onChangeText={handleTextChange} // Use the handler function
      />
      <Button title="Save Location" onPress={handleSaveLocation} />
      <Text style={styles.subtitle}>Saved Locations:</Text>
      <FlatList
        data={savedLocations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <Text>{item}</Text>
            <Button title="Select" onPress={() => handleSelectLocation(item)} />
          </View>
        )}
      />
      <Text style={styles.coordinates}>
          Current Coordinates: {`Lat: ${currentCoordinates.latitude}
          Lng: ${currentCoordinates.longitude}
          elevation: ${currentCoordinates.altitude}`}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  coordinates: {
    marginTop: 16,
    fontSize: 14,
    color: '#555',
  },
});

export default LocationSettingsScreen;