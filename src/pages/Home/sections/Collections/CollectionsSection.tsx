import { useEffect, useState } from "react";
import { useCollectionsStore } from "../../../../store/collections/useCollectionsStore";
import Switch from "../../../../components/ui/Switch/Switch";
import CollectionCard from "../../../../components/ui/Cards/CollectionCard";
import { Sections } from "../../../../constants/enums";
import Spinner from "../../../../components/Loaders/Spinner";

function CollectionSection() {
  const collections = useCollectionsStore((state) => state.collections);
  const { isLoading, getCollections } = useCollectionsStore();
  const [activeValue, setActiveValue] = useState<string>("series");

  useEffect(() => {
    getCollections(activeValue == "series" ? "tv" : "movie");
  }, [getCollections, activeValue]);

  const handleSwitch = () => {
    if (activeValue === "series") {
      setActiveValue("movies");
    } else {
      setActiveValue("series");
    }
  };

  return (
    <section className="py-section" id={Sections.FAQ}>
      <div className="container">
        <div className="flex justify-between mb-5">
          <h3 className="title-3-bold">Collection</h3>
          <Switch
            value={activeValue}
            onValue="series"
            offValue="movies"
            onToggle={handleSwitch}
          />
        </div>
        <div className="media-scroller no-scrollbar items-center">
          {isLoading ? (
            <Spinner />
          ) : (
            collections?.map((collection) => {
              return (
                <CollectionCard
                  key={collection.id}
                  collection={collection.name}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default CollectionSection;
