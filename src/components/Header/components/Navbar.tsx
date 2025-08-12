import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import clsx from "clsx";
import { Pages, Routes } from "../../../constants/enums";

function Navbar() {
  const { pathname } = useLocation();
  const links = [
    { title: Pages.HOME, href: Routes.ROOT },
    { title: Pages.MOVIES, href: Routes.MOVIES },
    { title: Pages.SERIES, href: Routes.SERIES },
  ];
  return (
    <motion.nav layout className="">
      <ul className="flex gap-5">
        {links.map((link, i) => {
          return (
            <li
              className={clsx(
                "text-lg",
                pathname === link.href ? "border-b-primary border-b-2" : ""
              )}
              key={i}
            >
              {<Link to={link.href}>{link.title}</Link>}
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
export default Navbar;
