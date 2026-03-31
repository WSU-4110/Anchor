
jest.mock('react', () => ({
  useState: jest.fn(()=>[false, jest.fn()]),
  useEffect: jest.fn()
}));

jest.mock('react-native', () => ({
  useColorScheme: jest.fn(()=> 'dark')
}));

import { useColorScheme } from '../hooks/use-color-scheme.web';

describe('useColorScheme.web', () => {
  test('returns light before hydration', () => {
    const r = useColorScheme();
    expect(r).toBe('light');
  });
});
