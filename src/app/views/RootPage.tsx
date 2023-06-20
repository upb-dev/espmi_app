import { styled, Box } from "@mui/material";
import Breadcrumb, { RouteSegment } from "../components/Breadcrumb";
import React from "react";

interface RootPageProps {
  children: React.ReactNode;
  form?: React.ReactNode;
  routeSegments: RouteSegment[];
}

const RootPage: React.FC<RootPageProps> = (props) => {
  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

  const HeaderContainer = styled(Box)(() => ({
    paddingBottom: 16,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }));
  return (
    <Container>
      <HeaderContainer>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={props.routeSegments} />
        </Box>
        {props.form}
      </HeaderContainer>
      {props.children}
    </Container>
  );
};

export default React.memo(RootPage);
