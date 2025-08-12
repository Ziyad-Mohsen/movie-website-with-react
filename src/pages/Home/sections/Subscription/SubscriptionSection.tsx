import SubscriptionCard from "../../../../components/ui/Cards/SubscriptionCard";
import { Subscriptions } from "../../../../constants/enums";

function SubscriptionSection() {
  return (
    <section className="container py-section" id="pricing">
      <div className="flex justify-center gap-20 flex-wrap">
        <SubscriptionCard
          subType={Subscriptions.BASIC}
          duration="6 Months"
          price={24}
          benefits={[
            "Free movies",
            "More series",
            "Ability to get access to watching movies",
          ]}
        />
        <SubscriptionCard
          subType={Subscriptions.SUGGESTED}
          duration="6 Months"
          price={24}
          benefits={[
            "Free movies",
            "More series",
            "Ability to get access to watching movies",
          ]}
        />
        <SubscriptionCard
          subType={Subscriptions.PREMIUM}
          duration="6 Months"
          price={24}
          benefits={[
            "Free movies",
            "More series",
            "Ability to get access to watching movies",
          ]}
        />
      </div>
    </section>
  );
}

export default SubscriptionSection;
