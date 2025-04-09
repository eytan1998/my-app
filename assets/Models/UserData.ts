import { EventType } from './Events/Events';

export interface MonthMetadata {
  [date: string]: {
    eventType: EventType | null;
    message: string;
  };
}

export class UserData {
  months: { [month: string]: MonthMetadata };

  constructor(months: { [month: string]: MonthMetadata }) {
    this.months = months;
  }

  // Convert to a format suitable for Firestore
  toDatabaseObject(month: string) {
    return this.months[month] || {};
  }

  // Create a UserData instance from Firestore data
  static fromDatabaseObject(month: string, dbObject: any): MonthMetadata {
    return dbObject || {};
  }
}