import { Link } from "react-router-dom";
import adsLeft from "/ad-left.png";
import adsRight from "/ad-right.png";

function Advertisement() {
  return (
    <section className="container py-section bg-[#daa521] overflow-hidden relative">
      <div className="flex p-5 gap-5">
        <img src={adsLeft} alt="" className="flex-1" />
        <img src={adsRight} alt="" className="flex-1 hidden lg:block" />
      </div>
      <Link
        to="https://goldenglobes.com/"
        target="_blank"
        className="absolute w-fit bottom-10 left-1/2 -translate-x-1/2 border-2 border-neutral-white py-5 px-10 rounded-4xl bg-black/50 text-center title-3-bold cursor-pointer"
      >
        Watch Golden Globe Awards
      </Link>
    </section>
  );
}

export default Advertisement;
