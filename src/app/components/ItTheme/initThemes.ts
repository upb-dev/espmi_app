import { ThemeOptions, createTheme } from '@mui/material';
import { forEach } from 'lodash';
import { themeColors } from './themeColors';
import themeOptions from './themeOptions';

function createIthemes() {
  let themes: Record<string, any> = {};

  forEach(themeColors, (value, key) => {
    themes[key] = createTheme(themeOptions as ThemeOptions, value);
  });

  return themes;
}
export const themes = createIthemes();
