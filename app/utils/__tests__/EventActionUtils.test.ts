import EventActionUtils, { handleAction } from '../EventActionUtils';
import { Action, EventType } from '@/assets/Models/Events/Events';
import { log, LogLevel } from '@/app/utils/Logger';
import DateUtils from '@/app/utils/DateUtils';

jest.mock('@/assets/firebase/firebaseService', () => ({
  addEventToDay: jest.fn(),
  removeEventFromDay: jest.fn(),
}));
jest.mock('@/app/utils/Logger', () => ({
  log: jest.fn(),
  LogLevel: {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    DEBUG: 'DEBUG',
  },
}));

const { addEventToDay, removeEventFromDay } = require('@/assets/firebase/firebaseService');

describe('EventActionUtils', () => {
  const userId = 'user1';
  const date = { currentDate: new Date('2023-01-01') } as DateUtils;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls addEventToDay for ADD_DAY_VESET', () => {
    handleAction(userId, date, Action.ADD_DAY_VESET);
    expect(addEventToDay).toHaveBeenCalledWith(userId, date.currentDate, EventType.FIRST_DAY_OF_VESET_IN_DAY);
    expect(log).toHaveBeenCalledWith(LogLevel.INFO, expect.stringContaining('ADD_DAY_VESET'), expect.any(String));
  });

  it('calls addEventToDay for ADD_NIGHT_VESET', () => {
    handleAction(userId, date, Action.ADD_NIGHT_VESET);
    expect(addEventToDay).toHaveBeenCalledWith(userId, date.currentDate, EventType.FIRST_DAY_OF_VESET_IN_NIGHT);
  });

  it('calls addEventToDay for ADD_STAIN', () => {
    handleAction(userId, date, Action.ADD_STAIN);
    expect(addEventToDay).toHaveBeenCalledWith(userId, date.currentDate, EventType.STAIN);
  });

  it('calls removeEventFromDay for DELETE', () => {
    handleAction(userId, date, Action.DELETE);
    expect(removeEventFromDay).toHaveBeenCalledWith(userId, date.currentDate);
  });

  it('calls addEventToDay for HAPSEK_TAHOR_VEST', () => {
    handleAction(userId, date, Action.HAPSEK_TAHOR_VEST);
    expect(addEventToDay).toHaveBeenCalledWith(userId, date.currentDate, EventType.VESET_TO_CLEAN);
  });

  it('calls addEventToDay for HAPSEK_TAHOR_STAIN', () => {
    handleAction(userId, date, Action.HAPSEK_TAHOR_STAIN);
    expect(addEventToDay).toHaveBeenCalledWith(userId, date.currentDate, EventType.STAIN_TO_CLEAN);
  });

  it('logs for HAPSEK_TAMEI_VEST and does not call addEventToDay', () => {
    handleAction(userId, date, Action.HAPSEK_TAMEI_VEST);
    expect(addEventToDay).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith(LogLevel.INFO, expect.stringContaining('HAPSEK_TAMEI_VEST'), expect.any(String));
  });

  it('logs for HAPSEK_TAMEI_STAIN and does not call addEventToDay', () => {
    handleAction(userId, date, Action.HAPSEK_TAMEI_STAIN);
    expect(addEventToDay).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith(LogLevel.INFO, expect.stringContaining('HAPSEK_TAMEI_STAIN'), expect.any(String));
  });

  it('logs for ADD_MORE_VESET and does not call addEventToDay', () => {
    handleAction(userId, date, Action.ADD_MORE_VESET);
    expect(addEventToDay).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith(LogLevel.INFO, expect.stringContaining('ADD_MORE_VESET'), expect.any(String));
  });

  it('logs error if action is unknown', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    handleAction(userId, date, 'UNKNOWN_ACTION' as any);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('No handler found for action'));
    spy.mockRestore();
  });
});
