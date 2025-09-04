import { Link } from "react-router-dom";
import { Routes } from "../../constants/enums";
import Navbar from "./components/Navbar";
import SearchBar from "../ui/SearchBar/SearchBar";

function Header() {
  return (
    <div className="px-5 md:px-10 w-full fixed top-0 z-10 bg-transparent">
      <div className="relative flex justify-between items-center gap-4 md:gap-10 px-4 py-3 mt-5">
        <div className="absolute inset-0 header-gradient-bg z-0"></div>
        {/* Left side - Logo */}
        <Link
          className="flex gap-2 items-center z-1 font-bold text-2xl text-primary"
          to={Routes.ROOT}
        >
          <img src="/logo.png" alt="logo" className="w-10 h-10" />
          <span>Cinema</span>
        </Link>
        {/* Right side - Navigation and Search */}
        <div className="flex items-center justify-end gap-2 md:gap-4 flex-1 z-1">
          <Navbar />
          <div className="flex items-center">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
