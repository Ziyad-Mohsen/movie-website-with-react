import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { BiSearch, BiX } from "react-icons/bi";
import { AnimatePresence, motion } from "motion/react";
import SearchResults from "./components/SearchResults";
import QuickActions from "./components/QuickActions";
import CategoryTabs from "./components/CategoryTabs";
import type { SearchCategory } from "./types/SearchTypes";
import { useSearchStore } from "../../../store/search/useSearchStore";
import type { Media } from "../../../types/globals";
import { useNavigate } from "react-router-dom";
import { MediaTypes, Routes } from "../../../constants/enums";

function SearchBar({ placeholder }: { placeholder?: string }) {
  const navigate = useNavigate();
  const results = useSearchStore((state) => state.results);
  const { isLoading, error, searchMultiResults } = useSearchStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search with debounce
  useEffect(() => {
    const debounce = setTimeout(() => {
      searchMultiResults(search);
    }, 200);

    return () => {
      clearTimeout(debounce);
    };
  }, [search, searchMultiResults]);

  // Map SearchCategory to media_type values
  const categoryToMediaType: Record<SearchCategory, string | null> = {
    all: null,
    movies: "movie",
    series: "tv",
    Person: "person",
  };

  const filteredResults = results.filter((item) => {
    if (activeCategory === "all") {
      return item;
    } else {
      return item.media_type === categoryToMediaType[activeCategory];
    }
  });

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearch("");
      setSelectedIndex(0);
      setActiveCategory("all");
    }
  }, [isOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSelectedIndex(0);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredResults.length - 1
      );
    } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
      e.preventDefault();
      handleResultClick(filteredResults[selectedIndex]);
    }
  };

  const handleResultClick = (result: Media) => {
    switch (result.media_type) {
      case MediaTypes.MOVIE:
        navigate(`${Routes.MOVIES}/${result.id}`);
        break;
      case MediaTypes.TV:
        navigate(`${Routes.SERIES}/${result.id}`);
        break;
    }
    setIsOpen(false);
  };

  const handleCategoryChange = (category: SearchCategory) => {
    setActiveCategory(category);
    setSelectedIndex(0);
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors border border-gray-700 rounded-lg hover:border-gray-600"
      >
        <BiSearch size={16} />
        <span>Search</span>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span>Ctrl + K</span>
        </div>
      </button>

      {/* Command Palette Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
          >
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-3xl mx-4"
            >
              {/* Search Input */}
              <div className="relative">
                <div className="relative">
                  <BiSearch
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder || "Search..."}
                    className="w-full pl-12 pr-4 py-4 text-lg bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      <BiX size={20} />
                    </button>
                  )}
                </div>

                {/* Category Tabs */}
                <CategoryTabs
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                />

                {/* Search Results */}
                {search && (
                  <SearchResults
                    results={filteredResults}
                    loading={isLoading}
                    error={error}
                    selectedIndex={selectedIndex}
                    onErrorRetry={() => searchMultiResults(search)}
                    onResultClick={handleResultClick}
                  />
                )}

                {/* Quick Actions */}
                {!search && <QuickActions />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SearchBar;
