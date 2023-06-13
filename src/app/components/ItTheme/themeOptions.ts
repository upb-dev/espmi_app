import { red } from "@mui/material/colors";
import { components } from "./components";
import { ThemeOptions, PaletteOptions } from "@mui/material/styles";

interface CustomPaletteOptions extends PaletteOptions{
  text ? : {
    primary? : string;
    secondary? : string;
    disable? : string;
    hint?: string

  }
}
interface CusomThemeOptions extends ThemeOptions {
  status?: {
    danger?: string;
  };
  palette? : CustomPaletteOptions
  
}

const themeOptions: CusomThemeOptions = {
  typography: {
    fontSize: 14,
    body1: { fontSize: "14px" },
  },
  palette: { text: { hint: 'rgba(0, 0, 0, 0.38)' } },
  status: { danger: red[500] },
  components: { ...components },
};

export default themeOptions;
