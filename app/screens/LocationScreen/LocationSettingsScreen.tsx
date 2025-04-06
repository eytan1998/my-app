import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useLocation } from '@/app/hooks/LocationContext';


const LocationSettingsScreen: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<string>(''); // Input for new location
  const {
    currentCoordinates,
    savedLocations,
    selectedLocation,
    saveLocation,
    deleteLocation,
    setSelectedLocation,
  } = useLocation(); // Access location context

  const handleSaveLocation = async () => {
    if (currentLocation.trim()) {
      await saveLocation(currentLocation); // Save the location using LocationContext
      setCurrentLocation(''); // Clear the input after saving
    }
  };

  const handleSelectLocation = async (address: string) => {
    console.log('Selected address:', address);
    await setSelectedLocation(address); // Use LocationContext to set the selected location
  };

  const handleDeleteLocation = async (address: string) => {
    await deleteLocation(address); // Delete the location using LocationContext
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Settings</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={currentLocation}
        onChangeText={setCurrentLocation} // Update the currentLocation state
      />
      <Button title="Save Location" onPress={handleSaveLocation} />
      <Text style={styles.subtitle}>Saved Locations:</Text>
      <FlatList
        data={savedLocations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <Text style={selectedLocation === item ? styles.selectedText : undefined}>{item}</Text>
            <Button
              title="Select"
              onPress={() => handleSelectLocation(item)}
              disabled={selectedLocation === item} // Disable if this is the selected location
            />
            <Button
              title="Delete"
              onPress={() => handleDeleteLocation(item)}
              disabled={selectedLocation === item} // Disable if this is the selected location
            />
          </View>
        )}
      />
      {selectedLocation && (
        <Text style={styles.selectedLocation}>
          Selected Location: {selectedLocation}
        </Text>
      )}
      <Text style={styles.coordinates}>
        Current Coordinates: {`Lat: ${currentCoordinates.latitude}, Lng: ${currentCoordinates.longitude}, Elevation: ${currentCoordinates.altitude || 'N/A'}`}
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
  selectedText: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  selectedLocation: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  coordinates: {
    marginTop: 16,
    fontSize: 14,
    color: '#555',
  },
});

export default LocationSettingsScreen;