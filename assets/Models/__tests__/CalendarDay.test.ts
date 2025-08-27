import { CalendarDay } from '../CalendarDay';
import { EventType } from '../Events/Events';

describe('CalendarDay', () => {
  it('should construct with event and message', () => {
    const day = new CalendarDay(EventType.STAIN, 'Test message');
    expect(day.event).toBe(EventType.STAIN);
    expect(day.message).toBe('Test message');
  });

  it('should construct with no arguments', () => {
    const day = new CalendarDay();
    expect(day.event).toBeUndefined();
    expect(day.message).toBeUndefined();
  });

  it('should convert to database object', () => {
    const day = new CalendarDay(EventType.CLEAN, 'Clean day');
    const dbObj = day.toDatabaseObject();
    expect(dbObj).toEqual({ event: EventType.CLEAN, message: 'Clean day' });
  });

  it('should create from database object', () => {
    const dbObj = { prisha: EventType.MIKVE, event: 'Special event' };
    const day = CalendarDay.fromDatabaseObject(dbObj);
    expect(day.event).toBe(EventType.MIKVE);
    expect(day.message).toBe('Special event');
  });

  it('should handle fromDatabaseObject with missing fields', () => {
    const dbObj = {};
    const day = CalendarDay.fromDatabaseObject(dbObj);
    expect(day.event).toBeUndefined();
    expect(day.message).toBeUndefined();
  });

  it('should handle fromDatabaseObject with only prisha', () => {
    const dbObj = { prisha: EventType.CLEAN };
    const day = CalendarDay.fromDatabaseObject(dbObj);
    expect(day.event).toBe(EventType.CLEAN);
    expect(day.message).toBeUndefined();
  });

  it('should handle fromDatabaseObject with only event', () => {
    const dbObj = { event: 'Just a message' };
    const day = CalendarDay.fromDatabaseObject(dbObj);
    expect(day.event).toBeUndefined();
    expect(day.message).toBe('Just a message');
  });

  it('should handle toDatabaseObject with undefined fields', () => {
    const day = new CalendarDay();
    expect(day.toDatabaseObject()).toEqual({ event: undefined, message: undefined });
  });
});
