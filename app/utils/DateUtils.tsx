import { addDays, format } from 'date-fns';
import { ComplexZmanimCalendar, GeoLocation, HebrewDateFormatter, JewishCalendar } from 'kosher-zmanim';
import { Coordinates } from '../hooks/LocationContext';


class DateUtils {
    private date: Date;
    private coordinates: Coordinates;


    constructor(date: Date = new Date(), coordinates: Coordinates) {
        this.date = date;
        this.coordinates = coordinates;
    }

    get currentDate(): Date {
      return this.date;
    }
    isToday(): boolean {
      const today = new Date();
      return (
        this.date.getDate() === today.getDate() &&
        this.date.getMonth() === today.getMonth() &&
        this.date.getFullYear() === today.getFullYear()
      );
    }
    isEqual(date: DateUtils): boolean {
      return (
        this.date.getDate() === date.currentDate.getDate() &&
        this.date.getMonth() === date.currentDate.getMonth() &&
        this.date.getFullYear() === date.currentDate.getFullYear()
      );
    }
    getZman(zman :zmanim): string {
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
    getJewishDateDay(): string {
        const jewishCalendar = new JewishCalendar(this.date);
        const hebrewDateFormatter = new HebrewDateFormatter();
        return hebrewDateFormatter.formatHebrewNumber(jewishCalendar.getJewishDayOfMonth()).toString();
    }
    getGregorianDateDay(): string {
        return this.date.getDate().toString();
    }
    setDate(newDate: Date) {
        this.date = newDate;
    }

    setCoordinates(newCoordinates: Coordinates) {
        this.coordinates = newCoordinates;
    }
    getParash(): string | null {
      const jewishCalendar = new JewishCalendar(this.date);
      const hebrewDateFormatter = new HebrewDateFormatter();
      hebrewDateFormatter.setHebrewFormat(true);
      return jewishCalendar.getParsha() ? hebrewDateFormatter.formatParsha(jewishCalendar) : null;
    }
    getYomTov(): string | null {
      const jewishCalendar = new JewishCalendar(this.date);
      const hebrewDateFormatter = new HebrewDateFormatter();
      hebrewDateFormatter.setHebrewFormat(true);
      return jewishCalendar.isYomTov() ? hebrewDateFormatter.formatYomTov(jewishCalendar) : null;
    }
    getOmerCounting(): string | null {
      const jewishCalendar = new JewishCalendar(this.date);
      const hebrewDateFormatter = new HebrewDateFormatter();
      hebrewDateFormatter.setHebrewFormat(true);
      return hebrewDateFormatter.formatOmer(jewishCalendar);

    }
    getGregorianStartAndEndMonth(): { startOfDay: Date; endOfDay: Date } {
      const startOfDay = new Date(this.date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
      endOfDay.setHours(23, 59, 59, 999);

      return { startOfDay, endOfDay };
    }
    getJewishStartAndEndMonth(): { startOfDay: Date; endOfDay: Date } {
      const jewishCalendar = new JewishCalendar(this.date);
      const startOfMonth = new JewishCalendar(this.date);
      startOfMonth.setJewishDayOfMonth(1);

      const endOfMonth = new JewishCalendar(this.date);
      endOfMonth.setJewishDayOfMonth(jewishCalendar.getDaysInJewishMonth());

      const startOfDay = new Date(startOfMonth.getDate());
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(endOfMonth.getDate());
      endOfDay.setHours(23, 59, 59, 999);

      return { startOfDay, endOfDay };
    }
    getMonthTitle(): string {
      // todo MAKE getGregorianStartAndEndMonth FROM ABOVE AND NOT STATIC
      const { startOfDay: startDate, endOfDay: endDate } = this.getGregorianStartAndEndMonth();
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
      return `${jewishMonthTitle} / ${gregorianMonthTitle}`;
  }
}

export enum zmanim {
    Sunrise = 'sunrise',
    Sunset = 'sunset',
    PlagMincha = 'plagMincha',
    TzetKochavim = 'tzetKochavim',
  }
export default DateUtils;