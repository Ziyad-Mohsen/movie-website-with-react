import clsx from "clsx";
import type { ButtonProps, VariantMap } from "./Button.types";
import { motion } from "motion/react";

const base =
  "border-2 cursor-pointer focus:outline-none flex items-center rounded-full justify-center transition-colors";

const transparent = "bg-transparent text-neutral-white border-none p-none";

const variantsMap: { primary: VariantMap; secondary: VariantMap } = {
  primary: {
    fill: "bg-primary text-neutral-white border-transparent hover:bg-primary-shade-2",
    outline:
      "bg-transparent text-white-neutral border-primary hover:bg-primary-shade-2",
  },
  secondary: {
    fill: "bg-secondary text-neutral-white border-transparent hover:bg-secondary-shade-2",
    outline:
      "bg-transparent text-white-neutral border-secondary hover:bg-secondary-shade-2",
  },
};

const sizeMap = {
  sm: "text-sm sm:text-sm md:text-base py-2 px-3 gap-1",
  md: "text-base sm:text-base md:text-lg py-2 px-4 gap-2",
  lg: "text-lg sm:text-lg lg:text-xl px-10 py-2 gap-3",
  icon: "p-2 sm:p-2 md:p-3 text-base sm:text-base md:text-lg flex items-center justify-center gap-0",
};

const disabledStyles = "opacity-50 pointer-events-none";

function Button({
  children,
  className,
  type = "button",
  variant = "fill",
  size = "md",
  color = "transparent",
  iconRight = null,
  iconLeft = null,
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        className,
        base,
        color == "transparent" ? transparent : variantsMap[color][variant],
        sizeMap[size],
        disabled && disabledStyles
      )}
    >
      {iconLeft && iconLeft}
      {children}
      {iconRight && iconRight}
    </motion.button>
  );
}

export default Button;
