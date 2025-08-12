import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { BiSearch, BiX } from "react-icons/bi";
import type { SearchBarProps } from "./SearchBar.types";
import Button from "../Button/Button";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";

function SearchBar({ placeholder }: SearchBarProps) {
  const [searching, setSearching] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const barRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    setSearching((prev) => !prev);
  };

  useEffect(() => {
    if (searching) {
      inputRef.current?.focus();
    } else {
      setSearch("");
    }
  }, [searching]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (barRef.current && !barRef.current.contains(event.target as Node)) {
        setSearching(false);
      }
    }
    if (searching) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searching]);

  return (
    <div
      ref={barRef}
      className={clsx(
        "w-fit h-fit flex items-center",
        searching ? "border-b-2 gap-2" : "border-none"
      )}
    >
      <Button
        onClick={handleSearchClick}
        iconRight={<BiSearch size={26} />}
        size="icon"
      />
      <div className="flex items-center">
        <AnimatePresence>
          {searching ? (
            <>
              <motion.input
                ref={inputRef}
                transition={{
                  duration: 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, display: "block" }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.1 },
                  display: "none",
                }}
                value={search}
                placeholder={placeholder}
                type="text"
                onChange={handleInputChange}
                className="border-none focus:outline-none"
              />
              <motion.div>
                <Button
                  iconRight={<BiX />}
                  size="icon"
                  onClick={() => {
                    setSearch("");
                  }}
                  className={clsx(
                    search ? "visible" : "invisible",
                    searching ? "block" : "hidden"
                  )}
                />
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SearchBar;
