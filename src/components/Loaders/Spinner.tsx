import { RiLoader4Fill } from "react-icons/ri";

function Spinner() {
  return (
    <div className="w-full flex justify-center items-center py-section">
      <RiLoader4Fill className="animate-spin" size={48} />
    </div>
  );
}

export default Spinner;
