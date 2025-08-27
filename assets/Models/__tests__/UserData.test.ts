import { UserData, MonthMetadata } from '../UserData';
import { EventType } from '../Events/Events';

describe('UserData', () => {
  const month = '2024-06';
  const metadata: MonthMetadata = {
    '2024-06-01': { eventType: EventType.STAIN, message: 'Stain event' },
    '2024-06-02': { eventType: null, message: '' },
  };

  it('should construct with months', () => {
    const userData = new UserData({ [month]: metadata });
    expect(userData.months[month]).toEqual(metadata);
  });

  it('should convert to database object for a month', () => {
    const userData = new UserData({ [month]: metadata });
    expect(userData.toDatabaseObject(month)).toEqual(metadata);
  });

  it('should return empty object for missing month in toDatabaseObject', () => {
    const userData = new UserData({});
    expect(userData.toDatabaseObject('missing')).toEqual({});
  });

  it('should create from database object', () => {
    const dbObj = { '2024-06-01': { eventType: EventType.STAIN, message: 'Stain event' } };
    expect(UserData.fromDatabaseObject(month, dbObj)).toEqual(dbObj);
  });

  it('should return empty object from database object if input is null', () => {
    expect(UserData.fromDatabaseObject(month, null)).toEqual({});
  });

  it('should handle empty months object', () => {
    const userData = new UserData({});
    expect(userData.months).toEqual({});
  });

  it('should handle constructor with no months', () => {
    // @ts-expect-error
    const userData = new UserData();
    expect(userData.months).toBeUndefined();
  });

  it('fromDatabaseObject returns {} for undefined dbObject', () => {
    expect(UserData.fromDatabaseObject('2024-06', undefined)).toEqual({});
  });
});
