import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@/app/hooks/ThemeContext'; // Import the custom hook
import { useLanguage } from '@/app/hooks/LanguageContext';
import { LocationProvider, useLocation } from '@/app/hooks/LocationContext';
import DaysHeader from '@/app/screens/CalanderScreen/DaysHeader';
import Day from '@/app/screens/CalanderScreen/Day';
import Month from '@/app/screens/CalanderScreen/Month';

import { ComplexZmanimCalendar, GeoLocation } from 'kosher-zmanim';
import DateUtils, {zmanim} from '@/app/utils/DateUtils';
import { directions } from '@/assets/LanguageConfig';
import { ScrollView } from 'react-native';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { currentCoordinates } = useLocation();
  const { translations, direction } = useLanguage();
  const dateUtils = new DateUtils(new Date(), currentCoordinates);
  const { startOfDay: startDate, endOfDay: endDate } = dateUtils.getJewishStartAndEndMonth();
  return (
    
    <View style={styles.container}>
      <Text style={{ textAlign: direction == directions.rtl ? 'right' : 'left' }}>
      {/* {currentCoordinates.latitude} {currentCoordinates.longitude} {currentCoordinates.altitude} */}
       {+translations.sunrise}: {dateUtils.getZman(zmanim.Sunrise)}
      {"\n"+translations.sunset}: {dateUtils.getZman(zmanim.Sunset)}
        {"\n"+translations.plag_mincha}: {dateUtils.getZman(zmanim.PlagMincha)}
        {"\n"+translations.tzet_kochavim}: {dateUtils.getZman(zmanim.TzetKochavim)}
      {'\n'}
      {'\n'}
      {'\n'}
      </Text>
      <DaysHeader />
        <ScrollView>
          <Month startDate={startDate} endDate={endDate} />
          <Month startDate={startDate} endDate={endDate} />
          <Month startDate={startDate} endDate={endDate} />
          <Month startDate={startDate} endDate={endDate} />
        </ScrollView>
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
