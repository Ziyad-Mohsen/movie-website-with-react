import { IoIosArrowDown } from "react-icons/io";
import { motion } from "motion/react";
import clsx from "clsx";

type AccordionProps = {
  question: string;
  answer: string;
  className?: string;
  show?: boolean;
  handleToggle?: () => void;
};

function Accordion({
  show = false,
  question,
  answer,
  className = "",
  handleToggle,
}: AccordionProps) {
  return (
    <motion.div
      layout
      className={clsx(
        "flex flex-col border-secondary border-2 rounded-2xl px-10 py-3 w-[1000px] max-w-full",
        className
      )}
    >
      <motion.div
        layout
        className="flex items-center justify-between gap-5 cursor-pointer text-2xl"
        onClick={handleToggle}
      >
        <h4>{question}</h4>
        <motion.button
          className="cursor-pointer"
          animate={{ rotate: show ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          type="button"
        >
          <IoIosArrowDown />
        </motion.button>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ height: show ? "auto" : 0, opacity: show ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-neutral-gray py-5">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

export default Accordion;
