import { addDays, format } from 'date-fns';
import { ComplexZmanimCalendar, GeoLocation } from 'kosher-zmanim';
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

    setDate(newDate: Date) {
        this.date = newDate;
    }

    setCoordinates(newCoordinates: Coordinates) {
        this.coordinates = newCoordinates;
    }

    
}

export enum zmanim {
    Sunrise = 'sunrise',
    Sunset = 'sunset',
    PlagMincha = 'plagMincha',
    TzetKochavim = 'tzetKochavim',
  }
export default DateUtils;