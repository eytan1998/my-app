import { Events, EventType, Action } from '../Events/Events';

describe('Events', () => {
  it('returns correct actions for known event', () => {
    expect(Events.getActionsForEvent(EventType.STAIN)).toContain(Action.DELETE);
    expect(Events.getActionsForEvent(EventType.STAIN)).toContain(Action.HAPSEK_TAHOR_STAIN);
  });

  it('returns default actions for null event', () => {
    expect(Events.getActionsForEvent(null)).toEqual([
      Action.ADD_DAY_VESET,
      Action.ADD_NIGHT_VESET,
      Action.ADD_STAIN,
    ]);
  });

  it('returns default actions for undefined event', () => {
    expect(Events.getActionsForEvent(null)).toEqual([
      Action.ADD_DAY_VESET,
      Action.ADD_NIGHT_VESET,
      Action.ADD_STAIN,
    ]);
  });

  it('returns empty array for unknown event', () => {
    expect(Events.getActionsForEvent('UNKNOWN' as any)).toEqual([]);
  });

  it('returns correct icon for known event', () => {
    const icon = Events.getIconForEvent(EventType.CLEAN);
    expect(icon).toBeDefined();
  });

  it('returns default icon for null event', () => {
    expect(Events.getIconForEvent(null)).toBe('');
  });

  it('returns default icon for undefined event', () => {
    expect(Events.getIconForEvent(null)).toBe('');
  });

  it('returns undefined for unknown event icon', () => {
    expect(Events.getIconForEvent('UNKNOWN' as any)).toBeUndefined();
  });

  it('returns empty array for completely invalid type in getActionsForEvent', () => {
    expect(Events.getActionsForEvent(123 as any)).toEqual([]);
  });

  it('returns undefined for completely invalid type in getIconForEvent', () => {
    expect(Events.getIconForEvent(123 as any)).toBeUndefined();
  });

  it('EventType enum contains expected values', () => {
    expect(EventType.FIRST_DAY_OF_VESET_IN_DAY).toBe('FIRST_DAY_OF_VESET_IN_DAY');
    expect(EventType.STAIN).toBe('STAIN');
  });

  it('Action enum contains expected values', () => {
    expect(Action.ADD_DAY_VESET).toBe('ADD_DAY_VESET');
    expect(Action.HAPSEK_TAHOR_STAIN).toBe('HAPSEK_TAHOR_STAIN');
  });
});
