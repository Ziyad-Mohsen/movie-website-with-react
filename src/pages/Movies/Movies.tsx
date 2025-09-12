import { useEffect } from "react";
import Header from "../../components/Header/Header";
import MediaCard from "../../components/ui/Cards/MediaCard";
import { MediaTypes } from "../../constants/enums";
import { useMoviesStore } from "../../store/movies/useMoviesStore";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Spinner from "../../components/Loaders/Spinner";
import Error from "../../components/Error/Error";

const Movies = () => {
  const { movies, isLoading, error, getMovies, hasMore, currentPage } =
    useMoviesStore();

  const loadMoreRef = useInfiniteScroll({
    callbackFn: () => handleInfiniteScroll(),
    isLoading: isLoading,
  });

  const handleInfiniteScroll = () => {
    if (hasMore && !isLoading) {
      getMovies(currentPage + 1);
    }
  };

  useEffect(() => {
    if (!movies.length) {
      getMovies(1);
    }
  }, [getMovies, movies.length]);

  return (
    <div>
      <Header />
      <main className="pt-30">
        <h2 className="container text-title-2 font-bold text-primary mb-5">
          Movies
        </h2>
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
          {movies.map((movie) => {
            return (
              <MediaCard key={movie.id} media={movie} type={MediaTypes.MOVIE} />
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
            No more movies to load
          </div>
        )}
      </main>
    </div>
  );
};

export default Movies;
