import { styled } from "@mui/material";
import React from "react";

const Container = styled("div")(() => ({
  height: "100%",
  display: "flex",
  position: "relative",
}));

const ItSidenavContainer = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default ItSidenavContainer;
