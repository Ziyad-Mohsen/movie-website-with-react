import { useEffect } from "react";
import { useSeriesStore } from "../../../../store/series/useSeriesStore";
import MediaCard from "../../../../components/ui/Cards/MediaCard";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { MediaTypes } from "../../../../constants/enums";

function SeriesSection() {
  const series = useSeriesStore((state) => state.series);
  const { getSeries } = useSeriesStore();

  useEffect(() => {
    getSeries();
  }, [getSeries]);

  return (
    <section className="py-section bg-gradient">
      <div className="container">
        <SectionTitle title="TV Series" />
        <div className="media-scroller no-scrollbar">
          {series?.map((series) => {
            return (
              <MediaCard key={series.id} media={series} type={MediaTypes.TV} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SeriesSection;
