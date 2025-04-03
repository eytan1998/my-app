import { EventType } from '../Models/Events/Events'; // Import EventType enum

//prisha is global,and not daily
// Class for a calendar day
export class CalendarDay {
  event?: EventType; // Optional event
  message?: string; // Optional message

  constructor(
    event?: EventType,
    message?: string
  ) {
    this.event = event;
    this.message = message;
  }

  // Method to convert the object to a format suitable for NoSQL storage
  toDatabaseObject() {
    return {
      event: this.event,
      message: this.message,
    };
  }

  // Static method to create a CalendarDay instance from a database object
  static fromDatabaseObject(dbObject: any): CalendarDay {
    return new CalendarDay(
      dbObject.prisha,
      dbObject.event,
    );
  }
}