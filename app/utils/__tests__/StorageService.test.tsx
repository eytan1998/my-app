import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageService from '../StorageService';

// Mock AsyncStorage with in-memory store
const store: Record<string, string> = {};

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn((key, value) => {
    store[key] = value;
    return Promise.resolve();
  }),
  getItem: jest.fn((key) => Promise.resolve(store.hasOwnProperty(key) ? store[key] : null)),
  removeItem: jest.fn((key) => {
    delete store[key];
    return Promise.resolve();
  }),
  mergeItem: jest.fn(),
  clear: jest.fn(() => {
    Object.keys(store).forEach(k => delete store[k]);
    return Promise.resolve();
  }),
  getAllKeys: jest.fn(() => Promise.resolve(Object.keys(store))),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
  multiMerge: jest.fn(),
}));

// Suppress console.error during tests
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore?.();
});

describe('StorageService', () => {
  beforeEach(async () => {
    await StorageService.clear();
    jest.clearAllMocks();
  });

  it('saves a value', async () => {
    await StorageService.save('testKey', 'testValue');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('testKey', 'testValue');
  });

  it('loads a value', async () => {
    await AsyncStorage.setItem('testKey', 'testValue');
    const value = await StorageService.load('testKey');
    expect(value).toBe('testValue');
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('testKey');
  });

  it('removes a value', async () => {
    await AsyncStorage.setItem('testKey', 'testValue');
    await StorageService.remove('testKey');
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('testKey');
    const value = await AsyncStorage.getItem('testKey');
    expect(value).toBeNull();
  });

  it('clears all values', async () => {
    await AsyncStorage.setItem('a', '1');
    await AsyncStorage.setItem('b', '2');
    await StorageService.clear();
    expect(AsyncStorage.clear).toHaveBeenCalled();
    const a = await AsyncStorage.getItem('a');
    const b = await AsyncStorage.getItem('b');
    expect(a).toBeNull();
    expect(b).toBeNull();
  });

  it('handles errors gracefully', async () => {
    (AsyncStorage.setItem as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Failed');
    });
    await StorageService.save('key', 'value'); // should not throw
  });
});
