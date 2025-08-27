import { log, LogLevel } from '../Logger';

describe('Logger', () => {
  const originalDev = (global as any).__DEV__;
  let consoleLogSpy: jest.SpyInstance;

  beforeAll(() => {
    (global as any).__DEV__ = true;
  });

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  afterAll(() => {
    (global as any).__DEV__ = originalDev;
  });

  it('logs info messages', () => {
    log(LogLevel.INFO, 'Test info message');
    expect(consoleLogSpy).toHaveBeenCalled();
    expect(consoleLogSpy.mock.calls[0][0]).toContain('[INFO]');
    expect(consoleLogSpy.mock.calls[0][0]).toContain('Test info message');
  });

  it('logs error messages with fileName and data', () => {
    log(LogLevel.ERROR, 'Test error', 'Logger.ts', { foo: 'bar' });
    expect(consoleLogSpy).toHaveBeenCalled();
    expect(consoleLogSpy.mock.calls[0][0]).toContain('[ERROR]');
    expect(consoleLogSpy.mock.calls[0][0]).toContain('Logger.ts');
    expect(consoleLogSpy.mock.calls[0][1]).toEqual({ foo: 'bar' });
  });

  it('does not log if __DEV__ is false', () => {
    (global as any).__DEV__ = false;
    log(LogLevel.DEBUG, 'Should not log');
    expect(consoleLogSpy).not.toHaveBeenCalled();
    (global as any).__DEV__ = true;
  });

  it('LogLevel enum has expected values', () => {
    expect(LogLevel.INFO).toBe('INFO');
    expect(LogLevel.WARN).toBe('WARN');
    expect(LogLevel.ERROR).toBe('ERROR');
    expect(LogLevel.DEBUG).toBe('DEBUG');
  });
});
