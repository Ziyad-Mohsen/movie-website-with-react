import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import MediaCard from "../../../../components/ui/Cards/MediaCard";
import { useTrendingStore } from "../../../../store/trending/useTrendingStore";

function TrendsSection() {
  const trendingMedia = useTrendingStore((state) => state.trendingMedia);

  return (
    <section className="py-section bg-gradient">
      <div className="container">
        <SectionTitle title="Trends" />
        <div className="media-scroller no-scrollbar">
          {trendingMedia?.map((media) => {
            return (
              <MediaCard key={media.id} media={media} type={media.media_type} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrendsSection;
