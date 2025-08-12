import { CiMenuBurger } from "react-icons/ci";
import Button from "../Button/Button";
import { motion } from "motion/react";

function Sidebar() {
  return (
    <motion.div className="fixed w-50 h-screen right-0 top-0 z-20 bg-red-200">
      Sidebar
    </motion.div>
  );
}

function SidebarToggler() {
  return <Button iconLeft={<CiMenuBurger />}></Button>;
}

export default Sidebar;
