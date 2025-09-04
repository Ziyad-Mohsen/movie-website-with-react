import Advertisement from "./sections/Advertisement/Advertisement";
import CollectionSection from "./sections/Collections/CollectionsSection";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Hero from "./sections/Hero/Hero";
import MoviesSection from "./sections/Movies/MoviesSection";
import SeriesSection from "./sections/Series/SeriesSection";
import SubscriptionSection from "./sections/Subscription/SubscriptionSection";
import TrendsSection from "./sections/Trends/TrendsSection";
import CharactersSection from "./sections/Characters/CharactersSection";
import FaqSection from "./sections/Faq/FaqSection";
import StudiosSection from "./sections/Studios/StudiosSection";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <TrendsSection />
      <MoviesSection />
      <CollectionSection />
      <Advertisement />
      <SeriesSection />
      <SubscriptionSection />
      <CharactersSection />
      <FaqSection />
      <StudiosSection />
      <Footer />
    </div>
  );
};

export default Home;
