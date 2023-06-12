import { themeShadows } from "./themeColors";
import { ComponentsProps } from "@mui/material";
import { CSSObject } from "@mui/system";

interface MUIDataTableBodyCellProps {
  styleOverrides?: {
    root?: CSSObject;
  };
  // tambahkan properti lain yang diperlukan
}

interface MUIDataTableSelectCellProps {
  styleOverrides?: {
    root?: CSSObject;
  };
  // tambahkan properti lain yang diperlukan
}

interface MUIDataTableHeadCellProps {
  styleOverrides?: {
    root?: CSSObject;
  };
  // tambahkan properti lain yang diperlukan
}

interface MuiExpansionPanelProps {
  styleOverrides?: {
    root?: CSSObject;
  };
  // tambahkan properti lain yang diperlukan
}

interface Components {
  MuiTable: ComponentsProps["MuiTable"] & {
    styleOverrides?: {
      root?: CSSObject;
    };
  };
  MuiTableCell: ComponentsProps["MuiTableCell"] & {
    styleOverrides?: {
      head?: CSSObject;
      root?: CSSObject;
    };
  };
  MuiButton: ComponentsProps["MuiButton"] & {
    styleOverrides?: {
      root?: CSSObject;
      contained?: CSSObject;
    };
  };
  MUIDataTableSelectCell: MUIDataTableSelectCellProps;
  MUIDataTableHeadCell: MUIDataTableHeadCellProps;
  MUIDataTableBodyCell: MUIDataTableBodyCellProps;
  MuiCssBaseline: ComponentsProps["MuiCssBaseline"] & {
    styleOverrides?: {
      "*": CSSObject;
      html: CSSObject;
      body: CSSObject;
      a: CSSObject;
      "#root": CSSObject;
      "#nprogress .bar": CSSObject;
    };
  };
  MuiFab: ComponentsProps["MuiFab"] & {
    styleOverrides?: {
      root?: CSSObject;
    };
  };
  MuiAccordion: ComponentsProps["MuiAccordion"] & {
    styleOverrides?: {
      root?: CSSObject;
    };
  };
  MuiTooltip: ComponentsProps["MuiTooltip"] & {
    styleOverrides?: {
      tooltip?: CSSObject;
    };
  };
  MuiMenuItem: ComponentsProps["MuiMenuItem"] & {
    styleOverrides?: {
      root?: CSSObject;
    };
  };

  MuiExpansionPanel: MuiExpansionPanelProps;
  MuiCard: ComponentsProps["MuiCard"] & {
    styleOverrides?: {
      root?: CSSObject;
    };
  };

  // Tambahkan tipe komponen lain yang ada dalam objek 'components'
}
export const components: Components = {
  MuiTable: {
    styleOverrides: {
      root: {
        tableLayout: "fixed",
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: {
        fontSize: "13px",
        padding: "12px 0px",
      },
      root: {
        fontSize: "14px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        padding: "12px 8px 12px 0px",
      },
    },
  },
  MUIDataTableSelectCell: {
    styleOverrides: {
      root: {
        paddingLeft: 12,
      },
    },
  },
  MUIDataTableHeadCell: {
    styleOverrides: {
      root: {
        paddingLeft: 16,
      },
    },
  },
  MUIDataTableBodyCell: {
    styleOverrides: {
      root: {
        paddingLeft: 8,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        fontSize: "14px",
        textTransform: "none",
        fontWeight: "400",
      },
      contained: {
        boxShadow: themeShadows[8],
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      "*": {
        boxSizing: "border-box",
      },
      html: {
        MozOsxFontSmoothing: "grayscale",
        WebkitFontSmoothing: "antialiased",
        height: "100%",
        width: "100%",
      },
      body: {
        height: "100%",
      },
      a: {
        textDecoration: "none",
        color: "inherit",
      },
      "#root": {
        height: "100%",
      },
      "#nprogress .bar": {
        zIndex: "2000 !important",
      },
    },
  },
  MuiFab: {
    styleOverrides: {
      root: {
        boxShadow: themeShadows[12],
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        "&:before": {
          display: "none",
        },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        fontSize: "11px",
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        fontSize: "0.875rem",
      },
    },
  },
  MuiExpansionPanel: {
    styleOverrides: {
      root: {
        "&:before": {
          display: "none",
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        boxShadow:
          "0px 3px 3px -2px rgb(0 0 0 / 6%), 0px 3px 4px 0px rgb(0 0 0 / 4%), 0px 1px 8px 0px rgb(0 0 0 / 4%) !important",
      },
    },
  },
};
