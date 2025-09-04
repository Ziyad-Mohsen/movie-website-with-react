import type React from "react";

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  type?: ButtonType;
  disabled?: boolean;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  iconRight?: null | React.ReactElement;
  iconLeft?: null | React.ReactElement;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type VariantMap = {
  fill: string;
  outline: string;
};

export type ButtonType = "button" | "submit" | "reset";

export type ButtonVariant = "fill" | "outline";

export type ButtonColor = "transparent" | "primary" | "secondary";

export type ButtonSize = "sm" | "md" | "lg" | "icon";
