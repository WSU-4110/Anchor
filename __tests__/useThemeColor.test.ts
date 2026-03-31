
import { useThemeColor } from '../hooks/use-theme-color';

jest.mock('../hooks/use-color-scheme', () => ({
  useColorScheme: jest.fn(()=> 'dark')
}));

describe('useThemeColor', () => {
  test('returns theme color', () => {
    const c = useThemeColor({}, 'tint');
    expect(c).toBeDefined();
  });
});
