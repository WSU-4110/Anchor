
jest.mock('react-native', () => ({
  useColorScheme: jest.fn(()=> 'dark')
}));

import { useColorScheme } from '../hooks/use-color-scheme';

describe('useColorScheme.native', () => {
  test('returns native scheme', () => {
    const r = useColorScheme();
    expect(r).toBe('dark');
  });
});
