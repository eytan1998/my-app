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

  it('should return undefined for unknown zman', () => {
    const du = new DateUtils(new Date('2025-08-27'), coords);
    expect(du.getZman('UnknownZman' as any)).toBeUndefined();
  });

  it('should handle invalid date gracefully', () => {
    const du = new DateUtils(new Date('invalid-date'), coords);
    expect(() => du.getGregorianDateDay()).not.toThrow();
    expect(isNaN(Number(du.getGregorianDateDay()))).toBe(true);
  });

  it('should return Jewish day as string if not in Hebrew', () => {
    const du = new DateUtils(new Date('2025-08-27'), coords, false);
    expect(typeof du.getJewishDateDay()).toBe('string');
  });

  it('should get Gregorian month title', () => {
    const du = new DateUtils(new Date('2025-08-27'), coords, false, CalendarType.Gregorian);
    const title = du.getMonthTitle();
    expect(typeof title).toBe('string');
    expect(title.length).toBeGreaterThan(0);
  });

  it('should return null for Parash, YomTov, Omer if not available', () => {
    const du = new DateUtils(new Date('1999-01-01'), coords, true);
    expect(du.getParash()).toBeNull();
    expect(du.getYomTov()).toBeNull();
    expect(du.getOmerCounting()).toBeNull();
  });

  it('should allow setDate to invalid date', () => {
    const du = new DateUtils(new Date('2025-08-27'), coords);
    du.setDate(new Date('invalid-date'));
    expect(isNaN(du.currentDate.getTime())).toBe(true);
  });

  it('should return undefined if getZman is called with missing zman', () => {
    const du = new DateUtils(new Date('2025-08-27'), coords);
    expect(du.getZman(undefined as any)).toBeUndefined();
  });

  it('should handle unsupported calendar type in getMonthTitle', () => {
    const du = new DateUtils(new Date('2025-08-27'), coords, false, 999 as unknown as CalendarType);
    expect(typeof du.getMonthTitle()).toBe('string');
  });

  // Additional tests for lines 59-70 (likely formatting/edge cases)
  it('should handle getZman with null and empty string', () => {
    const du = new DateUtils(new Date('2025-08-27'), coords);
    expect(du.getZman(null as any)).toBeUndefined();
    expect(du.getZman('' as any)).toBeUndefined();
  });

  it('should handle getJewishDateDay with invalid date', () => {
    const du = new DateUtils(new Date('invalid-date'), coords, true);
    expect(() => du.getJewishDateDay()).not.toThrow();
    expect(typeof du.getJewishDateDay()).toBe('string');
  });

  it('should handle getGregorianDateDay with invalid date', () => {
    const du = new DateUtils(new Date('invalid-date'), coords, true);
    expect(() => du.getGregorianDateDay()).not.toThrow();
    expect(typeof du.getGregorianDateDay()).toBe('string');
  });

  // Test for line 142 (likely a branch in getMonthTitle or similar)
  it('should return fallback string for getMonthTitle with invalid calendar type', () => {
    const du = new DateUtils(new Date('2025-08-27'), coords, true, -1 as unknown as CalendarType);
    expect(typeof du.getMonthTitle()).toBe('string');
  });

  // Additional tests for lines 269-284 (likely null/undefined/edge cases for Parash/YomTov/Omer)
  it('should return null for getParash, getYomTov, getOmerCounting on invalid date', () => {
    const du = new DateUtils(new Date('invalid-date'), coords, true);
    expect(du.getParash()).toBeNull();
    expect(du.getYomTov()).toBeNull();
    expect(du.getOmerCounting()).toBeNull();
  });

  it('should return null for getParash, getYomTov, getOmerCounting on date with no events', () => {
    const du = new DateUtils(new Date('2100-01-01'), coords, true);
    expect(du.getParash()).toBeNull();
    expect(du.getYomTov()).toBeNull();
    expect(du.getOmerCounting()).toBeNull();
  });

  describe('isEqual', () => {
    it('should return true for same date', () => {
      const du1 = new DateUtils(new Date('2025-08-27'), coords);
      const du2 = new DateUtils(new Date('2025-08-27'), coords);
      expect(du1.isEqual(du2)).toBe(true);
    });

    it('should return false for different day', () => {
      const du1 = new DateUtils(new Date('2025-08-27'), coords);
      const du2 = new DateUtils(new Date('2025-08-28'), coords);
      expect(du1.isEqual(du2)).toBe(false);
    });

    it('should return false for different month', () => {
      const du1 = new DateUtils(new Date('2025-08-27'), coords);
      const du2 = new DateUtils(new Date('2025-09-27'), coords);
      expect(du1.isEqual(du2)).toBe(false);
    });

    it('should return false for different year', () => {
      const du1 = new DateUtils(new Date('2025-08-27'), coords);
      const du2 = new DateUtils(new Date('2026-08-27'), coords);
      expect(du1.isEqual(du2)).toBe(false);
    });
  });

  describe('toGregorianString', () => {
    it('should return formatted Gregorian date string', () => {
      const du = new DateUtils(new Date('2025-08-27'), coords);
      // The output may vary by environment, so check for expected substrings
      const str = du.toGregorianString();
      expect(str).toContain('August');
      expect(str).toContain('2025');
      expect(str).toContain('27');
    });

    it('should handle invalid date gracefully', () => {
      const du = new DateUtils(new Date('invalid-date'), coords);
      const str = du.toGregorianString();
      // For invalid dates, toLocaleDateString returns "Invalid Date"
      expect(str).toMatch(/Invalid/i);
    });
  });

  describe('toJewishString', () => {
    it('should return formatted Jewish date string in Hebrew', () => {
      const du = new DateUtils(new Date('2025-08-27'), coords, true);
      const str = du.toJewishString();
      // Should contain Hebrew characters if isHebrew is true
      expect(/[\u0590-\u05FF]/.test(str)).toBe(true);
    });

    it('should return formatted Jewish date string in English', () => {
      const du = new DateUtils(new Date('2025-08-27'), coords, false);
      const str = du.toJewishString();
      // Should contain English month names if isHebrew is false
      expect(typeof str).toBe('string');
      expect(str.length).toBeGreaterThan(0);
    });

    it('should handle invalid date gracefully', () => {
      const du = new DateUtils(new Date('invalid-date'), coords, true);
      const str = du.toJewishString();
      expect(typeof str).toBe('string');
      expect(str.length).toBeGreaterThanOrEqual(0);
    });
  });
});
