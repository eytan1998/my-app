import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { directions, languages } from '@/assets/LanguageConfig';
import { useLanguage } from '@/app/hooks/LanguageContext';
import { useLocation } from '@/app/hooks/LocationContext';
import { useCalendarSettings } from '@/app/hooks/CalendarSettings';
import Day from '@/app/screens/CalanderScreen/Day';
import DateUtils from '@/app/utils/DateUtils';

interface MonthProps {
    startDate: Date;
    endDate: Date;
    onDayPress : (day: DateUtils) => void;
}

const Month: React.FC<MonthProps> = ({ startDate, endDate, onDayPress }) => {
    const { calendarType } = useCalendarSettings();
    const { direction,isHebrew } = useLanguage();
    const { currentCoordinates } = useLocation();
    const dateUtils = new DateUtils(startDate, currentCoordinates,isHebrew(),calendarType );

    const getDaysInRange = (start: Date, end: Date): Date[] => {
        const days: Date[] = [];
        let current = new Date(start);

        while (current <= end) {
            days.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }

        return days;
    };

    const renderGrid = (days: Date[]) => {
        const grid: JSX.Element[] = [];
        let week: JSX.Element[] = [];

        days.forEach((day, index) => {
            if (index === 0) {
                // Fill empty slots for the first week
                for (let i = 0; i < day.getDay(); i++) {
                    week.push(<View key={`empty-${i}`} style={styles.emptySlot} />);
                }
            }

            week.push(
                <View key={day.toISOString()} style={styles.daySlot}>
                    <Day
                        givenDay={new DateUtils(day,currentCoordinates,isHebrew(),calendarType)}
                        events={
                            <>
                                {/* Add any icons or elements to represent events here */}
                            </>
                        }
                        onDayPress={onDayPress}
                    />
                </View>
            );

            if (day.getDay() === 6 || index === days.length - 1) {
                // Add empty slots to fill the last week if it's the last day
                if (index === days.length - 1) {
                    for (let i = day.getDay() + 1; i <= 6; i++) {
                        week.push(<View key={`empty-${i}`} style={styles.emptySlot} />);
                    }
                }

                // Reverse the week if direction is RTL
                const renderedWeek = direction === directions.rtl ? [...week].reverse() : week;

                // End of the week or last day
                grid.push(
                    <View key={`week-${grid.length}`} style={styles.weekRow}>
                        {renderedWeek}
                    </View>
                );
                week = [];
            }
        });

        return grid;
    };

    const days = getDaysInRange(startDate, endDate);

    return (
        <View style={styles.monthGrid}>
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {dateUtils.getMonthTitle()}
                </Text>
            </View>
            {renderGrid(days)}
        </View>
    );
};

const styles = StyleSheet.create({
    monthGrid: {
        flex: 1,
        padding: 1,
    },
    weekRow: {
        flexDirection: 'row',
    },
    daySlot: {
        flex: 1, // Ensures each day takes an equal portion of the row
        alignItems: 'center',
        justifyContent: 'center',
        height : 120,
        
        margin: 1, // Small margin for spacing
    },
    emptySlot: {
        flex: 1, // Ensures empty slots take the same space as day slots
        height : 120,
        margin: 1,
    },
});

export default Month;