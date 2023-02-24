import {useColorScheme} from 'react-native';
import {darkTheme, lightTheme} from '../styles/theme';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const theme = isDarkMode ? darkTheme : lightTheme;

  return theme;
};
