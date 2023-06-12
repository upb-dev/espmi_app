import {
  Box,
  Button,
  Card,
  Drawer,
  Icon,
  IconButton,
  Link,
  styled,
  ThemeProvider,
  Tooltip,
  useTheme,
} from "@mui/material";
import useSettings from "../../hooks/useSettings";
import { Fragment, useState } from "react";
import Scrollbar from "react-perfect-scrollbar";
import { themeShadows } from "../ItTheme/themeColors";
import { H5, Span } from "../Typography";
import BadgeSelected from "./BadgeSelected";
import { ItLayoutSettingsType } from "../ItLayout/settings";
import { themes } from "../ItTheme/initThemes";

interface LabelProps {
  onClick: () => void;
}

const Label = styled(Span)<LabelProps>(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1rem",
  cursor: "pointer",
  borderRadius: "4px",
  marginBottom: "2.5rem",
  letterSpacing: "1.5px",
  padding: ".25rem .5rem",
  transform: "rotate(90deg)",
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.primary.dark,
  "&:hover, &.open": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

const ItCustomaizer = styled("div")(({ theme }) => ({
  top: 0,
  right: 0,
  zIndex: 50,
  width: 320,
  display: "flex",
  height: "100vh",
  position: "fixed",
  paddingBottom: "32px",
  flexDirection: "column",
  boxShadow: themeShadows[12],
  background: theme.palette.background.default,
  "& .helpText": { margin: "0px .5rem 1rem" },
}));

const LayoutBox = styled(BadgeSelected)(() => ({
  width: "100%",
  height: "152px !important",
  cursor: "pointer",
  marginTop: "12px",
  marginBottom: "12px",
  "& .layout-name": { display: "none" },
  "&:hover .layout-name": {
    zIndex: 12,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    background: "rgba(0,0,0,0.3)",
  },
}));

const Controller = styled("div")(() => ({
  minHeight: 58,
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
  padding: "14px 20px",
  boxShadow: themeShadows[6],
  justifyContent: "space-between",
}));

const IMG = styled("img")(() => ({ width: "100%" }));

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: "16px",
  paddingRight: "16px",
}));

const ItCustomizer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { settings, updateSettings } = useSettings();
  const secondary = theme.palette.text.secondary;

  const tooglePanel = () => setOpen(!open);

  const handleTabChange = (index: number) => setTabIndex(index);

  const activeTheme =
    settings.themes![settings.activeTheme as keyof typeof settings.themes];

  return (
    <Fragment>
      <Tooltip title="Theme Settings" placement="left">
        <Label className="open" onClick={tooglePanel}>
          DEMOS
        </Label>
      </Tooltip>

      <ThemeProvider theme={activeTheme}>
        <Drawer
          open={open}
          anchor="right"
          variant="temporary"
          onClose={tooglePanel}
          ModalProps={{ keepMounted: true }}
        >
          <ItCustomaizer>
            <Controller>
              <Box display="flex">
                <Icon className="icon" color="primary">
                  settings
                </Icon>
                <H5 sx={{ ml: 1, fontSize: "1rem" }}>Theme Settings</H5>
              </Box>

              <IconButton onClick={tooglePanel}>
                <Icon className="icon">close</Icon>
              </IconButton>
            </Controller>

            <Box px={3} mb={2} display="flex">
              <Button
                variant="outlined"
                onClick={() => handleTabChange(0)}
                color={tabIndex === 0 ? "secondary" : "primary"}
                sx={{ mr: 2 }}
              >
                Demos
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleTabChange(1)}
                color={tabIndex === 1 ? "secondary" : "primary"}
              >
                Settings
              </Button>
            </Box>

            <StyledScrollBar options={{ suppressScrollX: true }}>
              {tabIndex === 0 && (
                <Box sx={{ mb: 4, mx: 3 }}>
                  <Box sx={{ color: secondary }}>Layouts</Box>

                  <Box display="flex" flexDirection="column">
                    {demoLayouts.map((layout) => (
                      <LayoutBox
                        key={layout.name}
                        color="secondary"
                        badgeContent={"Pro"}
                        invisible={!layout.isPro}
                      >
                        <Card
                          elevation={4}
                          sx={{ position: "relative" }}
                          onClick={() => updateSettings(layout.options)}
                        >
                          <Box
                            sx={{ overflow: "hidden" }}
                            className="layout-name"
                          >
                            <Button variant="contained" color="secondary">
                              {layout.name}
                            </Button>
                          </Box>

                          <IMG src={layout.thumbnail} alt={layout.name} />
                        </Card>
                      </LayoutBox>
                    ))}
                  </Box>
                </Box>
              )}

              {/* END LAYOUT */}
              {tabIndex === 1 && (
                <div>
                  <div className="helpText">
                    We used React context API to control layout. Check out the{" "}
                    <Link
                      href="http://demos.ui-lib.com/matx-react-doc/layout.html"
                      target="_blank"
                    >
                      Documentation
                    </Link>
                  </div>
                </div>
              )}
            </StyledScrollBar>
          </ItCustomaizer>
        </Drawer>
      </ThemeProvider>
    </Fragment>
  );
};

export interface DemoLayouts {
  isPro: boolean;
  name: string;
  thumbnail: string;
  options: ItLayoutSettingsType;
}
const demoLayouts: DemoLayouts[] = [
  {
    isPro: false,
    name: "Light Sidebar",
    thumbnail: "/assets/images/screenshots/layout1-customizer.png",
    options: {
      activeTheme: "blue",
      activeLayout: "layout1",
      perfectScrollbar: false,
      themes: themes,

      layout1Settings: {
        topbar: { theme: "blueDark", fixed: true, show: true },
        leftSidebar: {
          mode: "full",
          theme: "whiteBlue",
          bgOpacity: 0.98,
          bgImgURL: "/assets/images/sidebar/sidebar-bg-dark.jpg",
          show: true,
        },
      },
      secondarySidebar: {
        show: true,
        open: false,
        theme: "slateDark1",
      },
      footer: {
        show: true,
        fixed: false,
        theme: "slateDark1",
      },
    },
  },
  {
    isPro: false,
    name: "Compact Sidebar",
    thumbnail: "/assets/images/screenshots/layout5-customizer.png",
    options: {
      activeTheme: "blue",
      activeLayout: "layout1",
      perfectScrollbar: false,
      themes: themes,

      layout1Settings: {
        topbar: { theme: "whiteBlue", fixed: true, show: true },
        leftSidebar: {
          mode: "compact",
          theme: "slateDark1",
          bgOpacity: 0.92,
          bgImgURL: "/assets/images/sidebar/sidebar-bg-dark.jpg",
          show: true,
        },
      },
      secondarySidebar: {
        show: true,
        open: false,
        theme: "slateDark1",
      },
      footer: {
        show: true,
        fixed: false,
        theme: "slateDark1",
      },
    },
  },
  {
    isPro: false,
    name: "Dark Sidebar",
    thumbnail: "/assets/images/screenshots/layout1-blue-customizer.png",
    options: {
      activeTheme: "blue",
      activeLayout: "layout1",
      perfectScrollbar: false,
      themes: themes,
      layout1Settings: {
        topbar: { theme: "blueDark", fixed: true, show: true },
        leftSidebar: {
          mode: "full",
          theme: "slateDark1",
          bgOpacity: 0.92,
          bgImgURL: "/assets/images/sidebar/sidebar-bg-dark.jpg",
          show: true,
        },
      },
      secondarySidebar: {
        show: true,
        open: false,
        theme: "slateDark1",
      },
      footer: {
        show: true,
        fixed: false,
        theme: "slateDark1",
      },
    },
  },
];

export default ItCustomizer;
