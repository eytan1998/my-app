import { PrishaType, PrishaTimeMapping } from '../Prisha';

describe('PrishaType', () => {
  it('should contain expected enum values', () => {
    expect(PrishaType.VESET_HACHODESH_BEFORE_SUNRISE).toBe('VESET_HACHODESH_BEFORE_SUNRISE');
    expect(PrishaType.OT_ZARIHA_ONAA_BENONIT_DAY).toBe('OT_ZARIHA_ONAA_BENONIT_DAY');
  });

  it('should have unique enum values', () => {
    const values = Object.values(PrishaType);
    const unique = new Set(values);
    expect(unique.size).toBe(values.length);
  });
});

describe('PrishaTimeMapping', () => {
  it('should map BEFORE_SUNRISE types to 1', () => {
    expect(PrishaTimeMapping[PrishaType.VESET_HACHODESH_BEFORE_SUNRISE]).toBe(1);
    expect(PrishaTimeMapping[PrishaType.OT_ZARIHA_ONAA_BENONIT_BEFORE_SUNRISE]).toBe(1);
  });

  it('should map DAY types to 2', () => {
    expect(PrishaTimeMapping[PrishaType.VESET_HAFLAGA_DAY]).toBe(2);
    expect(PrishaTimeMapping[PrishaType.OT_ZARIHA_VESET_HAFLAGA_DAY]).toBe(2);
  });

  it('should map AFTER_SUNSET types to 3', () => {
    expect(PrishaTimeMapping[PrishaType.ONAA_BENONIT_AFTER_SUNSET]).toBe(3);
    expect(PrishaTimeMapping[PrishaType.OT_ZARIHA_VESET_HAFLAGA_AFTER_SUNSET]).toBe(3);
  });

  it('should have a mapping for every PrishaType', () => {
    Object.values(PrishaType).forEach(type => {
      expect(PrishaTimeMapping[type]).toBeDefined();
      expect([1, 2, 3]).toContain(PrishaTimeMapping[type]);
    });
  });

});
