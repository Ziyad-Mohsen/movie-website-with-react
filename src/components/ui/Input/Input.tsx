import { motion } from "motion/react";
import type { InputType } from "./input.types";
import { useEffect, useState, type ChangeEvent, type FocusEvent } from "react";

type InputProps = {
  id?: string;
  value?: string | number;
  label?: string;
  placeholder?: string;
  type?: InputType;
  icon?: React.ReactElement | null;
  helperText?: null | string;
  state?: stateTypes;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

type stateTypes = "error" | "normal" | "info" | "success";

const inputStates = {
  normal: "--color-neutral-white",
  error: "--color-semantic-red",
  success: "--color-semantic-green",
  info: "--color-semantic-yellow",
};

export function Input({
  id,
  value = "",
  label,
  placeholder = "",
  type = "text",
  helperText,
  state = "normal",
  icon,
  onFocus,
  onBlur,
  onChange,
}: InputProps) {
  const [focused, setFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | number>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <motion.div
      animate={{ marginBottom: helperText ? "2rem" : "0" }}
      className="relative flex flex-col gap-2 w-full max-w-sm"
    >
      {label && (
        <motion.label
          style={{ color: `var(${inputStates[state]})` }}
          animate={
            focused || inputValue ? labelFocusedStyles : labelUnfocusedStyles
          }
          className={`absolute bg-bg px-1 cursor-text`}
          htmlFor={id}
        >
          {label}
        </motion.label>
      )}
      <input
        style={{ borderColor: `var(${inputStates[state]})` }}
        className={`px-6 pr-10 py-3 border-2 focus:outline-none rounded-xl`}
        type={type}
        onFocus={(e) => {
          setFocused(true);
          if (onFocus) {
            onFocus(e);
          }
        }}
        onBlur={(e) => {
          setFocused(false);
          if (onBlur) {
            onBlur(e);
          }
        }}
        onChange={onChange}
        value={inputValue}
        placeholder={focused ? placeholder : ""}
        id={id}
      />
      {icon && (
        <button
          tabIndex={-1}
          type="button"
          className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          {icon}
        </button>
      )}
      {helperText && (
        <span
          style={{ color: `var(${inputStates[state]})` }}
          className={`absolute text-sm top-[100%] left-0`}
        >
          * {helperText}
        </span>
      )}
    </motion.div>
  );
}

export default Input;

const labelFocusedStyles = {
  left: "1.25rem",
  top: "-0.75rem",
  color: "var(--color-neutral-white)",
};

const labelUnfocusedStyles = {
  left: "1.25rem",
  top: "50%",
  transform: "translateY(-50%)",
  color: "var(--color-neutral-gray)",
};
