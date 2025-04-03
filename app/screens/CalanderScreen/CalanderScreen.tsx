import React, { useState } from 'react';
import { StyleSheet, Modal, View, ScrollView ,Text, Button} from 'react-native';
import Month from '@/app/screens/CalanderScreen/Month';
import DateUtils from '@/app/utils/DateUtils';
import { useLocation } from '@/app/hooks/LocationContext';

const CalendarScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DateUtils | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleDayPress = (day: DateUtils) => {
      setSelectedDay(day); // Set the clicked day
      setModalVisible(true); // Show the modal
  };

  const closeModal = () => {
      setModalVisible(false);
      setSelectedDay(null); // Clear the selected day
  };

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
        startDate={month.getJewishStartAndEndMonth().startOfMonth}
        endDate={month.getJewishStartAndEndMonth().endOfMonth}
        onDayPress={handleDayPress}
        />
      ))}
      </ScrollView>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        {selectedDay && (
          <>
          <Text style={styles.modalTitle}>Day Details</Text>
          <Text>Jewish Date: {selectedDay.toJewishString()}</Text>
          <Text>Gregorian Date: {selectedDay.toGregorianString()}</Text>
          <Text>Parasha: {selectedDay.getParash()}</Text>
          <Text>Yom Tov: {selectedDay.getYomTov()}</Text>
          <Text>Omer Counting: {selectedDay.getOmerCounting()}</Text>
          {/* Add options to edit events, add messages, etc. */}
          <Button title="Edit Events" onPress={() => console.log('Edit events')} />
          </>
        )}
        <Button title="Close" onPress={closeModal} />
        </View>
      </View>
      </Modal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
      width: '80%',
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
  },
  modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
  },
});


export default CalendarScreen;