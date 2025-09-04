import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Pages, Routes } from "../../../constants/enums";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { title: Pages.HOME, href: Routes.ROOT },
    { title: Pages.MOVIES, href: Routes.MOVIES },
    { title: Pages.SERIES, href: Routes.SERIES },
  ];

  const isActive = (route: string) => {
    if (route === "/") {
      return pathname === "/";
    }

    return pathname === route || pathname.startsWith(route + "/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <motion.nav layout className="relative">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-5">
        {links.map((link, i) => {
          return (
            <li
              className={
                isActive(link.href) ? "border-b-primary border-b-2" : ""
              }
              key={i}
            >
              <Link
                to={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile Burger Menu */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center w-8 h-8 text-white hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent rounded"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50"
            >
              <ul className="py-2">
                {links.map((link, i) => {
                  return (
                    <li key={i}>
                      <Link
                        to={link.href}
                        onClick={closeMenu}
                        className={`block px-4 py-3 text-sm hover:bg-gray-800 transition-colors focus:outline-none focus:bg-gray-800 ${
                          isActive(link.href)
                            ? "text-primary border-l-2 border-primary bg-gray-800"
                            : "text-white"
                        }`}
                      >
                        {link.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/90 bg-opacity-50 z-40 md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
