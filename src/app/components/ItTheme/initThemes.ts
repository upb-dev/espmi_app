import { createTheme, ThemeOptions } from "@mui/material";
import { merge } from "lodash";
import { themeColors } from "./themeColors";
import themeOptions from "./themeOptions";

function createItThemes(): Record<string, ThemeOptions> {
  const themes: Record<string, ThemeOptions> = {};

  Object.entries(themeColors).forEach(([key, value]) => {
    themes[key] = createTheme(merge({}, themeOptions, value));
  });

  return themes;
}
export const themes = createItThemes();
