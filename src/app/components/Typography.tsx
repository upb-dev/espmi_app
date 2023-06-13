import { styled, SxProps, Theme } from "@mui/material";
import { Box, BoxProps } from "@mui/material";
import clsx from "clsx";

interface StyledBoxProps extends BoxProps {
  textTransform?: string;
  ellipsis?: boolean;
}

const StyledBox = styled(Box)<StyledBoxProps>`
  ${({ textTransform, ellipsis }) => `
    text-transform: ${textTransform || "none"};
    white-space: ${ellipsis ? "nowrap" : "normal"};
    overflow: ${ellipsis ? "hidden" : "visible"};
    text-overflow: ${ellipsis ? "ellipsis" : "clip"};
  `}
`;
export interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  ellipsis?: boolean;
  textTransform?: any;
  sx?: SxProps<Theme>;
}

export const H1 = ({
  children,
  className,
  ellipsis,
  textTransform,
  ...props
}: TypographyProps) => {
  return (
    <StyledBox
      textTransform={textTransform}
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      component="h1"
      mb={0}
      mt={0}
      fontSize="28px"
      fontWeight="500"
      lineHeight="1.5"
      {...props}
    >
      {children}
    </StyledBox>
  );
};

export const H2 = ({
  children,
  className,
  ellipsis,
  textTransform,
  ...props
}: TypographyProps) => {
  return (
    <StyledBox
      textTransform={textTransform}
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      component="h2"
      mb={0}
      mt={0}
      fontSize="24px"
      fontWeight="500"
      lineHeight="1.5"
      {...props}
    >
      {children}
    </StyledBox>
  );
};

export const H3 = ({
  children,
  className,
  ellipsis,
  textTransform,
  ...props
}: TypographyProps) => {
  return (
    <StyledBox
      textTransform={textTransform}
      ellipsis={ellipsis}
      className={clsx({ [className || ""]: true })}
      component="h3"
      mb={0}
      mt={0}
      fontSize="18px"
      fontWeight="500"
      lineHeight="1.5"
      {...props}
    >
      {children}
    </StyledBox>
  );
};

export const H4 = ({
  children,
  className,
  ellipsis,
  textTransform,
  ...props
}: TypographyProps) => {
  return (
    <StyledBox
      textTransform={textTransform}
      ellipsis={ellipsis}
      className={clsx({
        [className || ""]: true,
      })}
      component="h4"
      mb={0}
      mt={0}
      fontSize="16px"
      fontWeight="500"
      lineHeight="1.5"
      {...props}
    >
      {children}
    </StyledBox>
  );
};

export const H5 = ({
  children,
  className,
  ellipsis,
  textTransform,
  ...props
}: TypographyProps) => {
  return (
    <StyledBox
      textTransform={textTransform}
      ellipsis={ellipsis}
      className={clsx({
        [className || ""]: true,
      })}
      component="h5"
      mb={0}
      mt={0}
      fontSize="14px"
      fontWeight="500"
      lineHeight="1.5"
      {...props}
    >
      {children}
    </StyledBox>
  );
};

export const H6 = ({
  children,
  className,
  ellipsis,
  textTransform,
  ...props
}: TypographyProps) => {
  return (
    <StyledBox
      textTransform={textTransform}
      ellipsis={ellipsis}
      className={clsx({
        [className || ""]: true,
      })}
      component="h6"
      mb={0}
      mt={0}
      fontSize="13px"
      fontWeight="500"
      lineHeight="1.5"
      {...props}
    >
      {children}
    </StyledBox>
  );
};

export const Paragraph = ({
  children,
  className,
  ellipsis,
  textTransform,
  ...props
}: TypographyProps) => {
  return (
    <StyledBox
      textTransform={textTransform}
      ellipsis={ellipsis}
      className={clsx({
        [className || ""]: true,
      })}
      component="p"
      mb={0}
      mt={0}
      fontSize="14px"
      {...props}
    >
      {children}
    </StyledBox>
  );
};

export const Small = ({
  children,
  className,
  ellipsis,
  textTransform,
  ...props
}: TypographyProps) => {
  return (
    <StyledBox
      textTransform={textTransform}
      ellipsis={ellipsis}
      className={clsx({
        [className || ""]: true,
      })}
      component="small"
      fontSize="12px"
      fontWeight="500"
      lineHeight="1.5"
      {...props}
    >
      {children}
    </StyledBox>
  );
};

export const Span = ({
  children,
  className,
  ellipsis,
  textTransform,
  ...props
}: TypographyProps) => {
  return (
    <StyledBox
      textTransform={textTransform}
      ellipsis={ellipsis}
      className={clsx({
        [className || ""]: true,
      })}
      component="span"
      lineHeight="1.5"
      {...props}
    >
      {children}
    </StyledBox>
  );
};

export const Tiny = ({
  children,
  className,
  ellipsis,
  textTransform,
  ...props
}: TypographyProps) => {
  return (
    <StyledBox
      textTransform={textTransform}
      ellipsis={ellipsis}
      className={clsx({
        [className || ""]: true,
      })}
      component="small"
      fontSize="10px"
      lineHeight="1.5"
      {...props}
    >
      {children}
    </StyledBox>
  );
};
