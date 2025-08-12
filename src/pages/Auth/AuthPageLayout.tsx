import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Routes } from "../../constants/enums";
import image from "../../assets/auth-image.png.png";
import Button from "../../components/ui/Button/Button";
import { motion } from "motion/react";
import { useEffect } from "react";

function AuthPageLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === Routes.AUTH) {
      navigate(Routes.LOGIN);
    }
  }, [navigate, pathname]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-primary from-10% via-primary-shade-3 via-20% to-bg to-50%">
      <div className="relative max-w-[90%] grid grid-cols-1 md:grid-cols-4 items-center bg-bg rounded-2xl p-5">
        <Button className="absolute top-5 left-5">
          <Link to={Routes.ROOT}>
            <FaArrowLeftLong size={26} />
          </Link>
        </Button>
        {/* Form */}
        <div className="col-span-2">
          <h1 className="title-1-bold text-center">Welcome</h1>
          <div className="flex items-center justify-center gap-10 mb-5">
            <motion.button
              animate={
                pathname === Routes.LOGIN
                  ? { color: "var(--color-primary)" }
                  : { color: "var(--color-neutral-white)" }
              }
            >
              <Link className="font-medium" to={Routes.LOGIN}>
                Login
              </Link>
            </motion.button>
            <motion.button
              animate={
                pathname === Routes.SIGNUP
                  ? { color: "var(--color-primary)" }
                  : { color: "var(--color-neutral-white)" }
              }
            >
              <Link className="font-medium" to={Routes.SIGNUP}>
                Signup
              </Link>
            </motion.button>
          </div>
          <div className="flex flex-col items-center justify-center">
            {/* Auth form (login / signup) */}
            <Outlet />
          </div>
        </div>
        {/* Image */}
        <div className="col-span-2">
          <img className="max-w-full" src={image} alt="login page image" />
        </div>
      </div>
    </div>
  );
}

export default AuthPageLayout;
