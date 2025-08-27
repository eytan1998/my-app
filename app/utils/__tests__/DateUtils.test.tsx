import DateUtils, { zmanim } from './../DateUtils';
import { Coordinates } from '@/app/hooks/LocationContext';
import { CalendarType } from '@/app/hooks/CalendarSettings';

const coords: Coordinates = { latitude: 32.46080875481211, longitude: 35.04786943938415, altitude: 0, toString: () => '31.778, 35.235' };
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  mergeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
  multiMerge: jest.fn(),
}));

describe('DateUtils', () => {
  it('should set and get date correctly', () => {
    const du = new DateUtils(new Date('2025-08-27'), coords);
    expect(du.currentDate.toISOString()).toBe('2025-08-27T00:00:00.000Z');

    const newDate = new Date('2025-08-28');
    du.setDate(newDate);
    expect(du.currentDate).toEqual(newDate);
  });

  it('should detect today correctly', () => {
    const today = new Date();
    const du = new DateUtils(today, coords);
    expect(du.isToday()).toBe(true);

    const du2 = new DateUtils(new Date('2000-01-01'), coords);
    expect(du2.isToday()).toBe(false);
  });

  it('should calculate Zmanim correctly', () => {
    const du = new DateUtils(new Date('2025-08-27'), coords);
    expect(du.getZman(zmanim.Sunrise)).toBe('06:11');
    expect(du.getZman(zmanim.PlagMincha)).toBe('17:49');
    expect(du.getZman(zmanim.Sunset)).toBe('19:10');
    expect(du.getZman(zmanim.TzetKochavim)).toBe('19:28');
  });

  it('should return Jewish and Gregorian day correctly', () => {
    const du = new DateUtils(new Date('2025-08-27'), coords, true);
    expect(du.getJewishDateDay()).toBe('ג׳');
    expect(du.getGregorianDateDay()).toBe('27');
  });

  it('should get month title correctly', () => {
    const du = new DateUtils(new Date('2025-08-27'), coords, true, CalendarType.Jewish);
    const title = du.getMonthTitle();
    expect(title).toContain('אלול');
  });

  it('should return Parash, YomTov and Omer', () => {
    const du = new DateUtils(new Date('2025-08-30'), coords, true);
    expect(du.getParash()).toBe('שופטים');
    expect(du.getYomTov()).toBe(null);
    expect(du.getOmerCounting()).toBe(null);
  });
});
