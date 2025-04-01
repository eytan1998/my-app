import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext'; // Import the custom hook
import { useLanguage } from '../../hooks/LanguageContext';
import { LocationProvider, useLocation } from '../../hooks/LocationContext';
import DaysHeader from './DaysHeader';
import Day from './Day';
import Month from './Month';
import { ComplexZmanimCalendar, GeoLocation } from 'kosher-zmanim';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { currentCoordinates } = useLocation();
  const { translations } = useLanguage();
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(startDate.getMonth() + 1);

    // Create a GeoLocation object with the correct timezone
    const geoLocation = new GeoLocation(
      'locationName',
      currentCoordinates.latitude,
      currentCoordinates.longitude,
      currentCoordinates.altitude || 0,
      'Asia/Jerusalem' // Correct timezone
    );
  
    // Create a ComplexZmanimCalendar object
    const czc = new ComplexZmanimCalendar(geoLocation);
  
    // Set the calendar to the current date
    czc.setDate(new Date());
  
    const sunriseUTC = new Date(czc.getSunrise()).toLocaleTimeString();

      console.log('Sunrise (local):',sunriseUTC );

  return (
    
    <View style={styles.container}>
      <Text>
      {currentCoordinates.latitude} {currentCoordinates.longitude} {currentCoordinates.altitude}
      {/* {"\n"+translations.sunrise}: {sunriseUTC.toString()} {"\n"+translations.sunset}: {sunsetLocal} */}
    </Text>
      <DaysHeader />
      <Month startDate={startDate} endDate={endDate} />
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 5,
      backgroundColor: '#fff',
  },
});
export default HomeScreen;
