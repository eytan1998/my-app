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

//   it('should return undefined for unknown zman', () => {
//     const du = new DateUtils(new Date('2025-08-27'), coords);
//     expect(du.getZman('UnknownZman' as any)).toBeUndefined();
//   });

//   it('should handle invalid date gracefully', () => {
//     const du = new DateUtils(new Date('invalid-date'), coords);
//     expect(() => du.getGregorianDateDay()).not.toThrow();
//     expect(du.getGregorianDateDay()).toBeNaN();
//   });

//   it('should return Jewish day as number if not in Hebrew', () => {
//     const du = new DateUtils(new Date('2025-08-27'), coords, false);
//     expect(typeof du.getJewishDateDay()).toBe('string');
//   });

//   it('should get Gregorian month title', () => {
//     const du = new DateUtils(new Date('2025-08-27'), coords, false, CalendarType.Gregorian);
//     const title = du.getMonthTitle();
//     expect(typeof title).toBe('string');
//     expect(title.length).toBeGreaterThan(0);
//   });

//   it('should return null for Parash, YomTov, Omer if not available', () => {
//     const du = new DateUtils(new Date('1999-01-01'), coords, true);
//     expect(du.getParash()).toBeNull();
//     expect(du.getYomTov()).toBeNull();
//     expect(du.getOmerCounting()).toBeNull();
//   });

//   it('should allow setDate to invalid date', () => {
//     const du = new DateUtils(new Date('2025-08-27'), coords);
//     du.setDate(new Date('invalid-date'));
//     expect(isNaN(du.currentDate.getTime())).toBe(true);
//   });
});
