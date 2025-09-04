import Error from "../../../../components/Error/Error";
import CardSkeletonList from "../../../../components/Loaders/CardSkeletonList";
import MediaCardsList from "../../../../components/MediaCardsList/MediaCardsList";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { useTrendingStore } from "../../../../store/trending/useTrendingStore";

function TrendsSection() {
  // No need to refetch data becase it's already fetched in Hero.tsx
  const trendingMedia = useTrendingStore((state) => state.trendingMedia);
  const { isLoading, error, getTrendingMedia } = useTrendingStore();

  return (
    <section className="py-section bg-gradient">
      <div className="container">
        <SectionTitle title="Trends" />
        {error ? (
          <Error message={error} retry={getTrendingMedia} />
        ) : (
          <MediaCardsList
            mediaList={trendingMedia}
            loading={isLoading}
            loadingFallback={<CardSkeletonList />}
          />
        )}
      </div>
    </section>
  );
}

export default TrendsSection;
