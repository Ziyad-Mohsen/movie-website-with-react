import { FiArrowRight } from "react-icons/fi";
import Button from "../ui/Button/Button";

type SectionTitleProps = {
  title: string;
};

function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="flex justify-between items-center mb-5">
      <h2 className="title-3-bold">{title}</h2>
      <Button size="sm" iconRight={<FiArrowRight />} className="text-primary">
        See More
      </Button>
    </div>
  );
}

export default SectionTitle;
