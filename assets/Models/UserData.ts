import { CalendarDay } from './CalendarDay';
import { Prisha } from './Prisha';


export interface Locations {
  [locationId: string]: {
    latitude: number;
    longitude: number;
    name: string;
  };
}

export interface Events {
  [date: string]: CalendarDay;
}

export class UserData {
  locations: Locations;
  prisha: Prisha;
  events: Events;

  constructor(locations: Locations, prisha: Prisha, events: Events) {
    this.locations = locations;
    this.prisha = prisha;
    this.events = events;
  }

  // Convert to a format suitable for Firestore
  toDatabaseObject() {
    return {
      locations: this.locations,
      prisha: this.prisha,
      events: Object.fromEntries(
        Object.entries(this.events).map(([date, event]) => [date, event.toDatabaseObject()])
      ),
    };
  }

  // Create a UserData instance from Firestore data
  static fromDatabaseObject(dbObject: any): UserData {
    const events = Object.fromEntries(
      Object.entries(dbObject.events || {}).map(([date, event]) => [date, CalendarDay.fromDatabaseObject(event)])
    );

    return new UserData(dbObject.locations || {}, dbObject.prisha || {}, events);
  }
}