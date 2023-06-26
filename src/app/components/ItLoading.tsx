import { CircularProgress } from "@mui/material";
import { Box, styled } from "@mui/system";

const StyledLoading = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "auto",
    height: "25px",
  },
  "& .circleProgress": {
    position: "absolute",
    left: -7,
    right: 0,
    top: "calc(50% - 25px)",
  },
}));

const ItLoading = () => {
  return (
    <StyledLoading>
      <Box position="relative">
        <img
          style={{
            width: "auto",
            height: "25px",
          }}
          src="/assets/images/logo_perguruanTinggi_1.png"
          alt=""
        />
        <CircularProgress className="circleProgress" />
      </Box>
    </StyledLoading>
  );
};

export default ItLoading;
