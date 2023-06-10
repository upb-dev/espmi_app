import { styled } from "@mui/system";
import ItVerticalNav from "../components/ItVerticalNav/ItVerticalNav";
import useSettings from "../hooks/useSettings";
import { navigations } from "../navigations";
import { Fragment } from "react";
import Scrollbar from "react-perfect-scrollbar";

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  position: "relative",
}));

const SideNavMobile = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: "100vw",
  background: "rgba(0, 0, 0, 0.54)",
  zIndex: -1,
  [theme.breakpoints.up("lg")]: { display: "none" },
}));

const Sidenav = ({ children }: { children: React.ReactNode }) => {
  const { settings, updateSettings } = useSettings();

  const updateSidebarMode = (sidebarSettings: any) => {
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings =
      settings[activeLayoutSettingsName as keyof typeof settings];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...(activeLayoutSettings as any),
        leftSidebar: {
          ...(activeLayoutSettings as any).leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        <ItVerticalNav items={navigations} />
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: "close" })} />
    </Fragment>
  );
};

export default Sidenav;
