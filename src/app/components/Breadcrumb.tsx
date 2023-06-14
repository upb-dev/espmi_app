import { Breadcrumbs, Hidden, Icon, styled, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
// import { Theme, Palette } from "@mui/material/styles";

// interface CustomPalette extends Palette {
//   text: {
//     primary: string;
//     secondary: string;
//     disable: string;
//     hint: string;
//   };
// }
// interface CustomTheme extends Theme {
//   palette: CustomPalette;
// }

export interface RouteSegment {
  name: string;
  path?: string;
}

const BreadcrumbRoot = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
}));

const BreadcrumbName = styled("h4")(() => ({
  margin: 0,
  fontSize: "16px",
  paddingBottom: "1px",
  verticalAlign: "middle",
  textTransform: "capitalize",
}));

const SubName = styled("span")(({ theme }) => ({
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));

const Separator = styled("h4")(({ theme }) => ({
  margin: 0,
  marginLeft: 8,
  paddingBottom: "3px",
  color: theme.palette.text.primary, // FIXME : ubah primary ke hint
}));

const StyledIcon = styled(Icon)(() => ({
  marginLeft: 8,
  marginBottom: "4px",
  verticalAlign: "middle",
}));

const Breadcrumb = ({ routeSegments }: { routeSegments: RouteSegment[] }) => {
  const theme = useTheme();
  const hint = theme.palette.text.primary; // FIXME : ubah primary ke hint

  return (
    <BreadcrumbRoot>
      {routeSegments ? (
        <Hidden xsDown>
          <BreadcrumbName>
            {routeSegments[routeSegments.length - 1]["name"]}
          </BreadcrumbName>
          <Separator>|</Separator>
        </Hidden>
      ) : null}

      <Breadcrumbs
        separator={<Icon sx={{ color: hint }}>navigate_next</Icon>}
        sx={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <NavLink to="/">
          <StyledIcon color="primary">home</StyledIcon>
        </NavLink>

        {routeSegments
          ? routeSegments.map((route, index) => {
              return index !== routeSegments.length - 1 ? (
                <NavLink key={index} to={route.path!}>
                  <SubName>{route.name}</SubName>
                </NavLink>
              ) : (
                <SubName key={index}>{route.name}</SubName>
              );
            })
          : null}
      </Breadcrumbs>
    </BreadcrumbRoot>
  );
};

export default Breadcrumb;
