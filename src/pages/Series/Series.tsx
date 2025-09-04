import { useEffect } from "react";
import Header from "../../components/Header/Header";
import MediaCard from "../../components/ui/Cards/MediaCard";
import { MediaTypes } from "../../constants/enums";
import { useSeriesStore } from "../../store/series/useSeriesStore";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Spinner from "../../components/Loaders/Spinner";
import Error from "../../components/Error/Error";

const Series = () => {
  const { series, isLoading, error, getSeries, hasMore, currentPage } =
    useSeriesStore();

  const loadMoreRef = useInfiniteScroll({
    callbackFn: () => handleInfiniteScroll(),
    isLoading: isLoading,
  });

  const handleInfiniteScroll = () => {
    if (hasMore && !isLoading) {
      getSeries(currentPage + 1);
    }
  };

  useEffect(() => {
    if (!series.length) {
      getSeries(1);
    }
  }, [getSeries, series.length]);

  return (
    <div>
      <Header />
      <main className="pt-30">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
          {series.map((show) => {
            return (
              <MediaCard key={show.id} media={show} type={MediaTypes.TV} />
            );
          })}
        </div>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Error message={error} />
        ) : hasMore ? (
          <div ref={loadMoreRef} className="h-10" />
        ) : (
          <div className="text-center py-8 text-gray-500">
            No more series to load
          </div>
        )}
      </main>
    </div>
  );
};

export default Series;
