import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Month from '@/app/screens/CalanderScreen/Month';
import DateUtils from '@/app/utils/DateUtils';
import { useLocation } from '@/app/hooks/LocationContext';

const HomeScreen = () => {
  const { currentCoordinates } = useLocation();

  // Initialize with two months: current and previous
  const [months, setMonths] = useState(() => {
    const currentDate = new Date();
    const currentMonth = new DateUtils(currentDate, currentCoordinates);

    const previousMonthDate = new Date(currentDate);
    previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
    const previousMonth = new DateUtils(previousMonthDate, currentCoordinates);

    return [previousMonth, currentMonth];
  });

  const addMonthToTop = () => {
    setMonths((prevMonths) => {
      const firstMonth = prevMonths[0];
      const previousMonthDate = new Date(firstMonth.currentDate);
      previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
      const newMonth = new DateUtils(previousMonthDate, currentCoordinates);
      return [newMonth, ...prevMonths];
    });
  };

  const addMonthToBottom = () => {
    setMonths((prevMonths) => {
      const lastMonth = prevMonths[prevMonths.length - 1];
      const nextMonthDate = new Date(lastMonth.currentDate);
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
      const newMonth = new DateUtils(nextMonthDate, currentCoordinates);
      return [...prevMonths, newMonth];
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;
          const isScrolledToTop = contentOffset.y <= 0;
          const isScrolledToBottom =
            contentOffset.y + layoutMeasurement.height >= contentSize.height;

          if (isScrolledToTop) {
            console.log('Scrolled to top, adding month to top');
            addMonthToTop();
          }

          if (isScrolledToBottom) {
            console.log('Scrolled to bottom, adding month to bottom');
            addMonthToBottom();
          }
        }}
        scrollEventThrottle={16}
      >
        {months.map((month, index) => (
          <Month
            key={index}
            startDate={month.getGregorianStartAndEndMonth().startOfMonth}
            endDate={month.getGregorianStartAndEndMonth().endOfMonth}
          />
        ))}
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