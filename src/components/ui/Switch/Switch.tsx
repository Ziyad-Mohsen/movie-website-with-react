import clsx from "clsx";
import { motion } from "motion/react";

type SwitchProps = {
  value: string;
  onValue: string;
  offValue: string;
  onToggle: () => void;
};

function Switch({ value, onValue, offValue, onToggle }: SwitchProps) {
  return (
    <button
      className="border-2 border-primary rounded-full flex gap-1 items-center cursor-pointer"
      type="button"
      onClick={onToggle}
    >
      <motion.span
        className={clsx(
          "p-3 rounded-full body-text font-medium transition-colors",
          value === onValue ? " bg-primary" : ""
        )}
      >
        {onValue}
      </motion.span>
      <motion.span
        className={clsx(
          "p-3 rounded-full body-text font-medium transition-colors",
          value === offValue ? " bg-primary" : ""
        )}
      >
        {offValue}
      </motion.span>
    </button>
  );
}

export default Switch;
