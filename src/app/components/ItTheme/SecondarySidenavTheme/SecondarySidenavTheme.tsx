import { ThemeProvider, Theme } from "@mui/material";
import { ReactNode } from "react";
interface SecondarySidenavThemeProps {
  theme: Theme;
  classes: any;
  children: ReactNode;
  open: boolean;
}

const SecondarySidenavTheme = ({
  theme,
  classes,
  children,
  open,
}: SecondarySidenavThemeProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default SecondarySidenavTheme;
