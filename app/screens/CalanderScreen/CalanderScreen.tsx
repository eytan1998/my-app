import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext'; // Import the custom hook
import { useLanguage } from '../../hooks/LanguageContext';
import { LocationProvider, useLocation } from '../../hooks/LocationContext';
import DaysHeader from './DaysHeader';
import Day from './Day';
import Month from './Month';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { currentCoordinates: currentLocation } = useLocation();
  const { translations } = useLanguage();
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(startDate.getMonth() + 1);

  return (
    
    <View style={styles.container}>
      <Text>
      {currentLocation.latitude} {currentLocation.longitude} {currentLocation.altitude}
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
