import { Box, styled } from "@mui/material";
import useSettings from "../hooks/useSettings";
import { Span } from "./Typography";
import React from "react";

const BrandRoot = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 18px 20px 29px",
}));

const StyledSpan = styled(Span)(({ mode }: { mode: string }) => ({
  fontSize: 18,
  marginLeft: ".5rem",
  display: mode === "compact" ? "none" : "block",
}));

const Brand = ({ children }: { children: React.ReactNode }) => {
  const { settings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;

  return (
    <BrandRoot>
      <Box display="flex" alignItems="center">
        <img
          style={{ width: "auto", height: "40px" }}
          src="/assets/images/logo_perguruanTinggi_1.png"
          alt=""
        />

        <StyledSpan mode={mode} className="sidenavHoverShow">
          ESPMI
        </StyledSpan>
      </Box>

      <Box
        className="sidenavHoverShow"
        sx={{ display: mode === "compact" ? "none" : "block" }}
      >
        {children || null}
      </Box>
    </BrandRoot>
  );
};

export default Brand;
