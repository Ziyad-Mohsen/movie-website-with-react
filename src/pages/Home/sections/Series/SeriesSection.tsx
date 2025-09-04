import { useEffect } from "react";
import { useSeriesStore } from "../../../../store/series/useSeriesStore";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { MediaTypes, Routes } from "../../../../constants/enums";
import CardSkeletonList from "../../../../components/Loaders/CardSkeletonList";
import MediaCardsList from "../../../../components/MediaCardsList/MediaCardsList";
import Error from "../../../../components/Error/Error";

function SeriesSection() {
  const series = useSeriesStore((state) => state.series);
  const { error, isLoading, getSeries } = useSeriesStore();

  useEffect(() => {
    getSeries();
  }, [getSeries]);

  return (
    <section className="py-section bg-gradient">
      <div className="container">
        <SectionTitle title="TV Series" href={Routes.SERIES} />
        {error ? (
          <Error message={error} retry={getSeries} />
        ) : (
          <MediaCardsList
            mediaList={series}
            mediaType={MediaTypes.TV}
            loading={isLoading}
            loadingFallback={<CardSkeletonList />}
          />
        )}
      </div>
    </section>
  );
}

export default SeriesSection;
