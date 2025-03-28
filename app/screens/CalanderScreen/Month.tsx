import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { directions, languages } from '@/assets/LanguageConfig';
import { useLanguage } from '../../hooks/LanguageContext';

interface MonthProps {
    startDate: Date;
    endDate: Date;
}

const Month: React.FC<MonthProps> = ({ startDate, endDate }) => {
    const {direction} = useLanguage();

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
                    <Text style={styles.dayText}>{day.getDate()}</Text>
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
                const renderedWeek = direction === directions.rtl? [...week].reverse() : week;

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
     
            {renderGrid(days)}
        </View>
    );
};

const styles = StyleSheet.create({
    monthGrid: {
        flex: 1,
        padding: 1,
    },

    dayHeader: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    daySlot: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
        margin: 2,
    },
    dayText: {
        fontSize: 14,
    },
    emptySlot: {
        flex: 1,
        height: 50,
        margin: 2,
    },
});

export default Month;