import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { Routes } from "../../constants/enums";
import Navbar from "./components/Navbar";
import SearchBar from "../ui/SearchBar/SearchBar";
import Button from "../ui/Button/Button";
import UserInfo from "./components/UserInfo";

function Header() {
  const auth = true;
  return (
    <div className="px-5 md:px-10 w-full fixed top-0 z-10">
      <div className="flex justify-between items-center gap-10 px-5 py-3 mt-5 header-gradient-bg">
        {/* Left side */}
        <div className="flex items-center">
          <Link className="font-bold text-2xl text-primary" to={Routes.ROOT}>
            Cinema
          </Link>
        </div>
        {/* Right side */}
        <div className="flex items-center justify-between flex-1">
          <Navbar />
          <div className="flex items-center gap-2">
            <SearchBar placeholder={"Search"} />
            <Button iconRight={<IoIosNotifications size={26} />} size="icon" />
            {auth ? (
              <UserInfo />
            ) : (
              <>
                <Link to={Routes.LOGIN}>
                  <Button variant="fill" color="primary" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to={Routes.SIGNUP}>
                  <Button variant="outline" color="primary" size="sm">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
