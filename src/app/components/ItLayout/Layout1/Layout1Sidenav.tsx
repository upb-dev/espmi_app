import { Hidden, Switch, Theme } from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { themeShadows } from "../../../components/ItTheme/themeColors";
import useSettings from "../../../hooks/useSettings";
import { sidenavCompactWidth, sideNavWidth } from "../../../utils/constant";
import { convertHexToRGB } from "../../../utils/utils";
import React from "react";
import Brand from "../../Brand";
import Sidenav from "../../Sidenav";

interface SidebarNavRootProps {
  theme?: Theme;
  width: number;
  primarybg: string;
  bgimgurl: string;
}

export const SidebarNavRoot = styled(Box)(
  ({ theme, width, primarybg, bgimgurl }: SidebarNavRootProps) => ({
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: width,
    boxShadow: themeShadows[8],
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top",
    backgroundSize: "cover",
    zIndex: 111,
    overflow: "hidden",
    color: theme?.palette.text.primary,
    transition: "all 250ms ease-in-out",
    backgroundImage: `linear-gradient(to bottom, rgba(${primarybg}, 0.96), rgba(${primarybg}, 0.96)), url(${bgimgurl})`,
    "&:hover": {
      width: sideNavWidth,
      "& .sidenavHoverShow": {
        display: "block",
      },
      "& .compactNavItem": {
        width: "100%",
        maxWidth: "100%",
        "& .nav-bullet": {
          display: "block",
        },
        "& .nav-bullet-text": {
          display: "none",
        },
      },
    },
  })
);

const NavListBox = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const Layout1Sidenav = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode, bgImgURL } = leftSidebar;

  const getSidenavWidth = () => {
    switch (mode) {
      case "compact":
        return sidenavCompactWidth;
      default:
        return sideNavWidth;
    }
  };
  const primaryRGB = convertHexToRGB(theme.palette.primary.main);

  const updateSidebarMode = (sidebarSettings: Record<string, any>) => {
    updateSettings({
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  const handleSidenavToggle = () => {
    updateSidebarMode({ mode: mode === "compact" ? "full" : "compact" });
  };

  return (
    <SidebarNavRoot
      bgimgurl={bgImgURL}
      primarybg={primaryRGB}
      width={getSidenavWidth()}
    >
      <NavListBox>
        <Brand>
          <Hidden smDown>
            <Switch
              onChange={handleSidenavToggle}
              checked={leftSidebar.mode !== "full"}
              color="secondary"
              size="small"
            />
          </Hidden>
        </Brand>
        <Sidenav children />
      </NavListBox>
    </SidebarNavRoot>
  );
};

export default React.memo(Layout1Sidenav);
