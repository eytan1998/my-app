import React, { useState } from 'react';
import { StyleSheet, Modal, View, ScrollView ,Text, Button} from 'react-native';
import Month from '@/app/screens/CalanderScreen/Month';
import DateUtils, { zmanim } from '@/app/utils/DateUtils';
import {handleAction} from '@/app/utils/EventActionUtils';
import { useLanguage } from '@/app/hooks/LanguageContext';
import { useLocation } from '@/app/hooks/LocationContext';
import { useCalendarSettings } from '@/app/hooks/CalendarSettings';
import DaysHeader from './DaysHeader';
import { EventType,Events} from '@/assets/Models/Events/Events';

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

  const { currentCoordinates,selectedLocation} = useLocation();
  const { calendarType} = useCalendarSettings();
  const { isHebrew, translations} = useLanguage();

  // Initialize with two months: current and previous
  const [months, setMonths] = useState(() => {
    const currentDate = new Date();
    const currentMonth = new DateUtils(currentDate, currentCoordinates, isHebrew() ,calendarType);

    const previousMonthDate = new Date(currentDate);
    previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
    const previousMonth = new DateUtils(previousMonthDate, currentCoordinates, isHebrew() ,calendarType);

    return [previousMonth, currentMonth];
  });

  const addMonthToTop = () => {
    setMonths((prevMonths) => {
      const firstMonth = prevMonths[0];
      const previousMonthDate = new Date(firstMonth.currentDate);
      previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
      const newMonth = new DateUtils(previousMonthDate, currentCoordinates, isHebrew() ,calendarType);
      return [newMonth, ...prevMonths];
    });
  };

  const addMonthToBottom = () => {
    setMonths((prevMonths) => {
      const lastMonth = prevMonths[prevMonths.length - 1];
      const nextMonthDate = new Date(lastMonth.currentDate);
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
      const newMonth = new DateUtils(nextMonthDate, currentCoordinates, isHebrew() ,calendarType);
      return [...prevMonths, newMonth];
    });
  };


  const testEvent = EventType.STAIN;
  const actionsForTestEvent = Events.getActionsForEvent(testEvent);

  return (
    <View style={styles.container}>
      <DaysHeader />
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
        {months.map((month, index) => {
          const { startOfMonth, endOfMonth } = month.getStartAndEndMonth();
          return (
            <Month
              key={index}
              startDate={startOfMonth}
              endDate={endOfMonth}
              onDayPress={handleDayPress}
            />
          );
        })}
      </ScrollView>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedDay && (
              <>
                <Text style={styles.modalTitle}>Day Details</Text>
                <Text>The zmanim are according to location: {selectedLocation}</Text>
                <Text>Jewish Date: {selectedDay.toJewishString()}</Text>
                <Text>{translations.sunrise}: {selectedDay.getZman(zmanim.Sunrise)}</Text>
                <Text>{translations.plag_mincha}: {selectedDay.getZman(zmanim.PlagMincha)}</Text>
                <Text>{translations.sunset}: {selectedDay.getZman(zmanim.Sunset)}</Text>
                <Text>{translations.tzet_kochavim}: {selectedDay.getZman(zmanim.TzetKochavim)}</Text>
                <Text>Gregorian Date: {selectedDay.toGregorianString()}</Text>
                <Text>Parasha: {selectedDay.getParash()}</Text>
                <Text>Yom Tov: {selectedDay.getYomTov()}</Text>
                <Text>Omer Counting: {selectedDay.getOmerCounting()}</Text>

                {/* Dynamically render buttons for actions */}
                {actionsForTestEvent.map((action) => (
                  <Button
                    key={action}
                    title={`Perform ${action}`}
                    onPress={() => {
                      if (selectedDay) {
                        handleAction(selectedDay, action);
                      }
                    }}
                  />
                ))}
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