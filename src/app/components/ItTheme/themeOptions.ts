import { red } from "@mui/material/colors";
import { components } from "./components";
import { ThemeOptions } from "@mui/material";

interface CusomThemeOptions extends ThemeOptions {
  status?: {
    danger?: string;
  };
}

const themeOptions: CusomThemeOptions = {
  typography: {
    fontSize: 14,
    body1: { fontSize: "14px" },
  },

  status: { danger: red[500] },
  components: { ...components },
};

export default themeOptions;
