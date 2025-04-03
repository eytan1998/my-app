import { addDays, format } from 'date-fns';
import { ComplexZmanimCalendar, GeoLocation, HebrewDateFormatter, JewishCalendar } from 'kosher-zmanim';
import { Coordinates } from '../hooks/LocationContext';

/**
 * Utility class for handling dates, including Jewish calendar calculations and zmanim.
 */
class DateUtils {
    private date: Date;
    private coordinates: Coordinates;

    /**
     * Constructor for DateUtils.
     * @param date - The date to initialize with. Defaults to the current date.
     * @param coordinates - The geographical coordinates for zmanim calculations.
     */
    constructor(date: Date = new Date(), coordinates: Coordinates) {
        this.date = date;
        this.coordinates = coordinates;
    }

    /**
     * Gets the current date.
     */
    get currentDate(): Date {
        return this.date;
    }
    

    /**
     * Checks if the current date is today.
     */
    isToday(): boolean {
        const today = new Date();
        return (
            this.date.getDate() === today.getDate() &&
            this.date.getMonth() === today.getMonth() &&
            this.date.getFullYear() === today.getFullYear()
        );
    }

    /**
     * Compares the current date with another DateUtils instance.
     * @param date - Another DateUtils instance to compare with.
     */
    isEqual(date: DateUtils): boolean {
        return (
            this.date.getDate() === date.currentDate.getDate() &&
            this.date.getMonth() === date.currentDate.getMonth() &&
            this.date.getFullYear() === date.currentDate.getFullYear()
        );
    }
    /**
     * Compares the current date with another DateUtils instance.
     * @param date - Another DateUtils instance to compare with.
     */
    isDateEqual(date: Date): boolean {
        return (
            this.date.getDate() === date.getDate() &&
            this.date.getMonth() === date.getMonth() &&
            this.date.getFullYear() === date.getFullYear()
        );
    }

    /**
     * Gets the specified zman (halachic time) for the current date and location.
     * @param zman - The zman to calculate.
     */
    getZman(zman: zmanim): string {
        // Create a GeoLocation object with the correct timezone
        const geoLocation = new GeoLocation(
            'locationName',
            this.coordinates.latitude,
            this.coordinates.longitude,
            this.coordinates.altitude || 0,
            'Asia/Jerusalem' // Correct timezone
        );

        // Create a ComplexZmanimCalendar object
        const czc = new ComplexZmanimCalendar(geoLocation);

        // Set the calendar to the current date
        czc.setDate(this.date);

        switch (zman) {
            case zmanim.Sunrise:
                return format(new Date(czc.getSunrise()), 'HH:mm');
            case zmanim.Sunset:
                return format(new Date(czc.getSunset()), 'HH:mm');
            case zmanim.PlagMincha:
                return format(new Date(czc.getPlagHamincha(czc.getSunrise(), czc.getSunset())), 'HH:mm');
            case zmanim.TzetKochavim:
                return format(new Date(czc.getTzaisGeonim4Point61Degrees()), 'HH:mm');
            default:
                throw new Error('Invalid zman');
        }
    }

    /**
     * Gets the Jewish day of the month for the current date.
     */
    getJewishDateDay(): string {
        const jewishCalendar = new JewishCalendar(this.date);
        const hebrewDateFormatter = new HebrewDateFormatter();
        return hebrewDateFormatter.formatHebrewNumber(jewishCalendar.getJewishDayOfMonth()).toString();
    }

    /**
     * Gets the Gregorian day of the month for the current date.
     */
    getGregorianDateDay(): string {
        return this.date.getDate().toString();
    }

    /**
     * Sets a new date.
     * @param newDate - The new date to set.
     */
    setDate(newDate: Date) {
        this.date = newDate;
    }

    /**
     * Sets new geographical coordinates.
     * @param newCoordinates - The new coordinates to set.
     */
    setCoordinates(newCoordinates: Coordinates) {
        this.coordinates = newCoordinates;
    }

    /**
     * Gets the weekly Torah portion (Parasha) for the current date.
     */
    getParash(): string | null {
        const jewishCalendar = new JewishCalendar(this.date);
        const hebrewDateFormatter = new HebrewDateFormatter();
        hebrewDateFormatter.setHebrewFormat(true);
        return jewishCalendar.getParsha() ? hebrewDateFormatter.formatParsha(jewishCalendar) : null;
    }

    /**
     * Gets the Yom Tov (Jewish holiday) for the current date, if applicable.
     */
    getYomTov(): string | null {
        const jewishCalendar = new JewishCalendar(this.date);
        const hebrewDateFormatter = new HebrewDateFormatter();
        hebrewDateFormatter.setHebrewFormat(true);
        return jewishCalendar.isYomTov() ? hebrewDateFormatter.formatYomTov(jewishCalendar) : null;
    }

    /**
     * Gets the Omer counting for the current date, if applicable.
     */
    getOmerCounting(): string | null {
        const jewishCalendar = new JewishCalendar(this.date);
        const hebrewDateFormatter = new HebrewDateFormatter();
        hebrewDateFormatter.setHebrewFormat(true);
        return hebrewDateFormatter.formatOmer(jewishCalendar);
    }
    /**
     * Gets the start and end of the current Gregorian month.
     */
    getGregorianStartAndEndMonth(): { startOfMonth: Date; endOfMonth: Date } {
      const startOfMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
      const endOfMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
      return { startOfMonth, endOfMonth };
    }

    /**
     * Gets the start and end of the current Jewish month.
     */
    getJewishStartAndEndMonth(): { startOfMonth: Date; endOfMonth: Date } {
        const jewishCalendar = new JewishCalendar(this.date);
        const startOfMonthJew = new JewishCalendar(this.date);
        startOfMonthJew.setJewishDayOfMonth(1);

        const endOfMonthJew = new JewishCalendar(this.date);
        endOfMonthJew.setJewishDayOfMonth(jewishCalendar.getDaysInJewishMonth());

        const startOfMonth = new Date(startOfMonthJew.getDate());
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(endOfMonthJew.getDate());
        endOfMonth.setHours(23, 59, 59, 999);

        return { startOfMonth, endOfMonth };
    }

    /**
     * Gets the title of the current month, combining both Jewish and Gregorian months.
     */
    getMonthTitle(): string {
        // todo MAKE getGregorianStartAndEndMonth FROM ABOVE AND NOT STATIC
        const { startOfMonth: startDate, endOfMonth: endDate } = this.getJewishStartAndEndMonth();
        const hebrewDateFormatter = new HebrewDateFormatter();
        hebrewDateFormatter.setHebrewFormat(true);

        const startJewishCalendar = new JewishCalendar(startDate);
        const endJewishCalendar = new JewishCalendar(endDate);

        const startMonthJewish = hebrewDateFormatter.formatMonth(startJewishCalendar);
        const endMonthJewish = hebrewDateFormatter.formatMonth(endJewishCalendar);
        const yearJewish = hebrewDateFormatter.formatHebrewNumber(startJewishCalendar.getJewishYear()).toString();

        const startMonthGreg = startDate.toLocaleString('default', { month: 'long' });
        const endMonthGreg = endDate.toLocaleString('default', { month: 'long' });
        const yearGreg = startDate.getFullYear();

        // Handle cases where the Jewish months differ
        const jewishMonthTitle =
            startMonthJewish != endMonthJewish
                ? `${startMonthJewish} - ${endMonthJewish} ${yearJewish}`
                : `${startMonthJewish} ${yearJewish}`;

        // Handle cases where the Gregorian months differ
        const gregorianMonthTitle =
            startMonthGreg !== endMonthGreg
                ? `${startMonthGreg} - ${endMonthGreg} ${yearGreg}`
                : `${startMonthGreg} ${yearGreg}`;

        // Combine both Jewish and Gregorian month titles
        return `${jewishMonthTitle} | ${gregorianMonthTitle}`;
    }
}

/**
 * Enum for zmanim (halachic times).
 */
export enum zmanim {
    Sunrise = 'sunrise',
    Sunset = 'sunset',
    PlagMincha = 'plagMincha',
    TzetKochavim = 'tzetKochavim',
}

export default DateUtils;