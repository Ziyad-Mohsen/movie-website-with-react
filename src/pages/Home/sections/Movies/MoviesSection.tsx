import { useEffect } from "react";
import { useMoviesStore } from "../../../../store/movies/useMoviesStore";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import MediaCard from "../../../../components/ui/Cards/MediaCard";
import { MediaTypes } from "../../../../constants/enums";

function MoviesSection() {
  const movies = useMoviesStore((state) => state.movies);
  const { getMovies } = useMoviesStore();

  useEffect(() => {
    getMovies();
  }, [getMovies]);
  return (
    <section className="py-section bg-gradient">
      <div className="container">
        <SectionTitle title="Movies" />
        <div className="flex gap-5 overflow-x-scroll scrollbar-hide">
          {movies?.map((movie) => {
            return (
              <MediaCard key={movie.id} media={movie} type={MediaTypes.MOVIE} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MoviesSection;
