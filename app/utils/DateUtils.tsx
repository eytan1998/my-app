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
      const { startOfDay: startDate, endOfDay: endDate } = this.getJewishStartAndEndMonth();
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
          startMonthJewish !== endMonthJewish
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