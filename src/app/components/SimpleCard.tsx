import { Card } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";

const CardRoot = styled(Card)(() => ({
  height: "100%",
  padding: "20px 24px",
}));

interface CartTitleProps {
  subtitle?: string;
}
const CardTitle = styled("div")<CartTitleProps>(({ subtitle }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
  marginBottom: subtitle ? "16px" : undefined,
}));

export interface SimpleCardProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: any;
}

const SimpleCard: React.FC<SimpleCardProps> = ({
  children,
  title,
  subtitle,
  icon,
}) => {
  return (
    <CardRoot elevation={6}>
      <CardTitle subtitle={subtitle}>{title}</CardTitle>
      {subtitle && <Box sx={{ mb: 2 }}>{subtitle}</Box>}
      {children}
    </CardRoot>
  );
};

export default SimpleCard;
