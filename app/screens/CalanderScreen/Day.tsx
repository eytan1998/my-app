import DateUtils from '@/app/utils/DateUtils';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableWithoutFeedback } from 'react-native';

interface DayProps {
    givenDay: DateUtils;
    selectedDay: DateUtils | null; 
    onDaySelect: (day: DateUtils) => void; // Callback to update the selected day
    events?: React.ReactNode; // Icons or elements to represent events
}

const Day: React.FC<DayProps> = ({ givenDay,selectedDay,onDaySelect }) => {
    // Check if the given day is today
    const isToday = givenDay.isToday(); // Assuming `isToday` is a method in DateUtils
    const [dynamicStyle, setDynamicStyle] = React.useState({});
    const isSelected = selectedDay && selectedDay.isEqual(givenDay); 

    return (
        <TouchableWithoutFeedback onPress={() => onDaySelect(givenDay)}>
            <View style={[styles.container, isSelected && styles.selectedOutline]}>
                {/* Top-left: Image */}
                <View style={styles.topLeft}>
                    <Image source={require('@/assets/images/blue.png')} style={styles.image} />
                </View>
                {/* Top-right: Jewish Date */}
                <View style={styles.topRight}>
                    <Text
                        style={[
                            styles.jewishDate,
                            givenDay.getJewishDateDay() === 'א׳' && {
                                fontWeight: 'bold',
                                backgroundColor: '#ff6666',
                                color: '#ffffff',
                                borderRadius: 4,
                                padding: 1,
                            },
                        ]}
                    >
                        {givenDay.getJewishDateDay()}
                    </Text>
                </View>

                {/* Center: Icons and Text */}
                <View style={styles.centerContent}>
                    <Text style={styles.eventText}>{givenDay.getParash()}</Text>
                    <Text style={styles.eventText}>{givenDay.getYomTov()}</Text>
                    <Text style={styles.eventText}>{givenDay.getOmerCounting()}</Text>
                    {/* Three red lines with 1:2:1 ratio */}
                    <View style={styles.redLinesContainer}>
                        <View style={[styles.redLine, { flex: 1 }]} />
                        <View style={[styles.redLine, { flex: 2 }]} />
                        <View style={[styles.redLine, { flex: 1 }]} />
                    </View>
                </View>

                {/* Bottom-left: Gregorian Date */}
                <View style={styles.bottomLeft}>
                    <Text
                        style={[
                            styles.jewishDate,
                            givenDay.getGregorianDateDay() === '1' && {
                                fontWeight: 'bold',
                                backgroundColor: '#ff6666',
                                color: '#ffffff',
                                borderRadius: 4,
                                padding: 1,
                            },
                        ]}
                    >
                        {givenDay.getGregorianDateDay()}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Make the width flexible to fit within a row of 7
        height: 120, // Adjustable height for the day box
        backgroundColor: '#f9f9f9',
        position: 'relative',
        width: (Dimensions.get('window').width / 7) - 4, // Divide the screen width by 7 for a week view
    },
    selectedOutline: {
        borderWidth: 2,
        borderColor: '#007BFF',
    },
    todayOutline: {
        borderWidth: 2, // Thicker border for today
        borderColor: '#007BFF', // Blue outline for today
    },
    topLeft: {
        position: 'absolute',
        top: 4,
        left: 4,
    },
    image: {
        width: 20, // Adjust the width of the image
        height: 20, // Adjust the height of the image
    },
    topRight: {
        position: 'absolute',
        top: 4,
        right: 4,
    },
    bottomLeft: {
        position: 'absolute',
        bottom: 4,
        left: 4,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    redLinesContainer: {
        flexDirection: 'row',
        width: '100%', // Make the container span the full width
        marginTop: 8, // Add spacing below the red lines
    },
    redLine: {
        height: 8, // Height of each red line
        backgroundColor: '#ff6666', // Lighter shade of red
        borderRadius: 2, // Rounded edges for the lines
        marginHorizontal: 1, // Add spacing between the lines
    },
    jewishDate: {
        fontSize: 12,
        color: '#666',
    },
    gregorianDate: {
        fontSize: 12,
        color: '#666',
    },
    eventText: {
        fontSize: 6,
        color: '#222',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Day;