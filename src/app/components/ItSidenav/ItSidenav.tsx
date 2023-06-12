import { Box, styled, useMediaQuery, useTheme, SxProps } from "@mui/material";
import { HTMLAttributes, ReactNode } from "react";

interface SideNavProps extends HTMLAttributes<HTMLDivElement> {
  width: string;
}

const SideNav = styled("div")<SideNavProps>(({ theme, width }) => ({
  zIndex: 91,
  width: width,
  overflow: "hidden",
  position: "relative",
  transition: "width 250ms ease",
  background: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    top: 0,
    left: 0,
    bottom: 0,
    position: "absolute",
  },
}));

const SideNavOverlay = styled("div")(() => ({
  zIndex: 90,
  width: "100%",
  height: "100%",
  position: "absolute",
  background: "rgba(0, 0, 0, 0.74)",
}));

interface ItSidenavProps {
  sx?: SxProps;
  open: boolean;
  children: ReactNode;
  toggleSidenav: () => void;
  width?: string;
}
const ItSidenav = ({
  sx,
  open,
  children,
  toggleSidenav,
  width = "220px",
}: ItSidenavProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box height="100%" display="flex">
      <SideNav sx={sx} width={open || !isMobile ? width : "0px"}>
        {children}
      </SideNav>

      {open && isMobile && <SideNavOverlay onClick={toggleSidenav} />}
    </Box>
  );
};

export default ItSidenav;
