import { useEffect } from "react";
import { useMoviesStore } from "../../../../store/movies/useMoviesStore";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { MediaTypes, Routes } from "../../../../constants/enums";
import CardSkeletonList from "../../../../components/Loaders/CardSkeletonList";
import MediaCardsList from "../../../../components/MediaCardsList/MediaCardsList";
import Error from "../../../../components/Error/Error";

function MoviesSection() {
  const movies = useMoviesStore((state) => state.movies);
  const { isLoading, error, getMovies } = useMoviesStore();

  useEffect(() => {
    getMovies(1);
  }, [getMovies]);

  return (
    <section className="py-section bg-gradient">
      <div className="container">
        <SectionTitle title="Movies" href={Routes.MOVIES} />
        {error ? (
          <Error message={error} retry={() => getMovies(1)} />
        ) : (
          <MediaCardsList
            mediaList={movies}
            mediaType={MediaTypes.MOVIE}
            loading={isLoading}
            loadingFallback={<CardSkeletonList />}
          />
        )}
      </div>
    </section>
  );
}

export default MoviesSection;
