import { CssBaseline, ThemeProvider } from "@mui/material";
import useSettings from "../../hooks/useSettings";
import React from "react";

const ItTheme = ({ children }: { children: React.ReactNode }) => {
  const { settings } = useSettings();
  const activeTheme = { ...settings.themes[settings.activeTheme] };

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ItTheme;
