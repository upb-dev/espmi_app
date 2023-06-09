import { styled } from "@mui/material";

const Container = styled("div")(() => ({
  height: "100%",
  display: "flex",
  position: "relative",
}));

const ItSidenavContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ItSidenavContainer;
