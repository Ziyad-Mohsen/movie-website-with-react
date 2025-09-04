import { FiArrowRight } from "react-icons/fi";
import Button from "../ui/Button/Button";
import { Link } from "react-router-dom";

type SectionTitleProps = {
  title: string;
  href?: string;
};

function SectionTitle({ title, href }: SectionTitleProps) {
  return (
    <div className="flex justify-between items-center mb-5">
      <h2 className="title-3-bold">{title}</h2>
      {href && (
        <Link to={href}>
          <Button
            size="sm"
            iconRight={<FiArrowRight />}
            className="text-primary"
          >
            See More
          </Button>
        </Link>
      )}
    </div>
  );
}

export default SectionTitle;
