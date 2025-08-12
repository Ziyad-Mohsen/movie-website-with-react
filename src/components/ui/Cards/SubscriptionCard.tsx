import clsx from "clsx";
import Button from "../Button/Button";
import { Subscriptions } from "../../../constants/enums";

type SubscriptionCardProps = {
  subType: Subscriptions;
  duration: string;
  price: number; // Original price
  discount?: number; // Price after discount
  benefits: string[];
};

const Base =
  "relative flex flex-col p-5 items-center gap-20 w-64 min-w-fit rounded-3xl text-primary-shade-4";

const SubTypes = {
  basic: "bg-linear-to-t from-primary-tent-3 to-primary-tent-4",
  suggested: "bg-linear-to-t from-primary to-primary-tent-3",
  premium: "bg-linear-to-t from-secondary to-secondary-tent-3",
};

function SubscriptionCard({
  subType = Subscriptions.BASIC,
  duration,
  price,
  discount,
  benefits,
}: SubscriptionCardProps) {
  return (
    <div
      className={clsx(Base, SubTypes[subType])}
      style={subType === "suggested" ? { transform: "scale(1.1)" } : undefined}
    >
      <div className="text-center text-body">
        <h3 className="title-2-bold capitalize">{subType}</h3>
        <p>{duration}</p>
      </div>
      <div className="absolute left-0 top-[150px] h-2 w-full">
        <div className="absolute h-fit w-full border-b-2 border-bg border-dashed"></div>
        <div className="absolute -left-5 -top-5 w-10 h-10 rounded-full bg-bg"></div>
        <div className="absolute -right-5 -top-5 w-10 h-10 rounded-full bg-bg"></div>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <div className="text-title-3">
          <span
            className={clsx(
              "block",
              discount
                ? "relative before:content-[''] before:absolute before:left-0 before:right-0 before:top-1/2 before:h-[2px] before:bg-red-500 before:-translate-y-1/2"
                : ""
            )}
          >
            ${price.toFixed(2)}
          </span>
          {discount && <span className="block">${discount?.toFixed(2)}</span>}
        </div>
        <ul className="list-disc ms-5 mb-5">
          {benefits.map((benefit, i) => {
            return (
              <li className="max-w-[25ch] text-md font-medium py-1" key={i}>
                {benefit}
              </li>
            );
          })}
        </ul>
        <Button
          color={subType === Subscriptions.SUGGESTED ? "secondary" : "primary"}
          variant="fill"
          size="lg"
          className="shadow-2xl"
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
}

export default SubscriptionCard;
