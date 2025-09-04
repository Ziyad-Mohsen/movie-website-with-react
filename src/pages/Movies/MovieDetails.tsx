import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { image_base_url } from "../../lib/api";
import { getMediaDurationTime } from "../../lib/utils";
import StarsRating from "../../components/StarsRating/StarsRating";
import Button from "../../components/ui/Button/Button";
import { FaPlay } from "react-icons/fa";
import CollectionCard from "../../components/ui/Cards/CollectionCard";
import TopProgressBarLoader from "../../components/Loaders/TopProgressBarLoader";
import { useMovieDetailsStore } from "../../store/movies/useMovieDetailsStore";
import Avatar from "../../components/ui/Avatar/Avatar";
import MediaCardsList from "../../components/MediaCardsList/MediaCardsList";
import { MediaTypes } from "../../constants/enums";
import CardSkeletonList from "../../components/Loaders/CardSkeletonList";
import Error from "../../components/Error/Error";
import Spinner from "../../components/Loaders/Spinner";
import { SlDislike, SlLike } from "react-icons/sl";

function MovieDetails() {
  const { movieId } = useParams();
  const {
    movie: { data: movie, loading: movieLoading, error: movieError },
    movieImages: {
      data: movieImages,
      loading: loadingImages,
      error: movieImagesError,
    },
    movieCredits: {
      data: movieCredits,
      loading: loadingMovieCredits,
      error: movieCreditsError,
    },
    similarMovies: {
      data: similarMovies,
      loading: loadingSimilarMovies,
      error: similarMoviesError,
    },
    getMovieDetails,
    getMovieImages,
    getMovieCredits,
    getSimilarMovies,
  } = useMovieDetailsStore();

  const getData = () => {
    if (movieId) {
      getMovieDetails(movieId);
      getMovieImages(movieId);
      getMovieCredits(movieId);
      getSimilarMovies(movieId, 1);
    }
  };

  useEffect(() => {
    if (movieId) {
      getData();
      window.scroll(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  if (movieLoading) return <TopProgressBarLoader />;

  if (movieError)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Error message={movieError} retry={getData} />
      </div>
    );

  return (
    <>
      <Header />
      <main>
        <div
          className="min-h-screen bg-center bg-cover flex flex-col justify-end py-section"
          style={{
            backgroundImage: `url(${image_base_url + movie?.backdrop_path})`,
          }}
        >
          <div className="overlay" />
          {/* Movie info */}
          <div className="flex items-end max-md:flex-col max-md:items-center max-md:gap-5 container z-1">
            <div className="flex flex-col flex-1 gap-2 justify-center">
              <h1 className="title-1-bold">{movie?.title}</h1>
              <div className="title-3">
                {getMediaDurationTime(movie?.runtime)} -{" "}
                {movie?.release_date.split("-")[0]} -{" "}
                {movie?.production_countries[0]?.iso_3166_1}
              </div>
              <p>{movie?.overview}</p>
              <div className="flex items-center gap-2">
                <Link
                  to={`https://www.imdb.com/title/${movie?.imdb_id}`}
                  className="flex justify-center items-center bg-amber-400 px-2 py-1 w-fit h-fit rounded-lg text-neutral-black font-bold"
                >
                  IMDB
                </Link>
                <StarsRating rating={movie?.vote_average} size={24} />
                <Button variant="outline" color="primary" size="icon">
                  <SlLike />
                </Button>
                <Button variant="outline" color="primary" size="icon">
                  <SlDislike />
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="w-50 mb-5 overflow-hidden rounded-lg shadow-xl max-md:hidden">
                <img
                  className="object-cover object-center"
                  src={image_base_url + movie?.poster_path}
                  alt={movie?.title}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="fill"
                  size="lg"
                  color="primary"
                  iconLeft={<FaPlay className="max-lg:hidden" />}
                  className="rounded-md"
                >
                  Watch Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  color="primary"
                  className="rounded-md"
                >
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Movie images */}
        <div className="relative flex container overflow-scroll no-scrollbar gap-5 -mt-5 z-2">
          {loadingImages ? (
            <Spinner />
          ) : movieImagesError ? (
            <Error
              message={movieImagesError}
              retry={movieId ? () => getMovieImages(movieId) : undefined}
            />
          ) : (
            movieImages?.backdrops
              .slice(0, 5)
              .map((image) => (
                <img
                  key={image.file_path}
                  className="min-w-90 border-1 border-primary bg-secondary-shade-4 rounded-lg"
                  src={image_base_url + image.file_path}
                />
              ))
          )}
        </div>
        <div className="container">
          {/* Generes */}
          <div className="py-5">
            <h3 className="title-3-bold mb-5">Generes</h3>
            <div className="flex gap-5 items-center">
              {movie?.genres.map((genere) => (
                <CollectionCard key={genere.id} collection={genere.name} />
              ))}
            </div>
          </div>
          {/* Credits */}
          {loadingMovieCredits ? (
            <Spinner />
          ) : movieCreditsError ? (
            <Error
              message={movieCreditsError}
              retry={movieId ? () => getMovieCredits(movieId) : undefined}
            />
          ) : (
            <>
              <div className="py-5">
                <h3 className="title-3-bold mb-5">Characters</h3>
                <div className="media-scroller no-scrollbar">
                  {movieCredits?.cast.map((cast) => {
                    return (
                      <div key={cast.cast_id}>
                        <Avatar
                          src={
                            cast.profile_path &&
                            image_base_url + cast.profile_path
                          }
                          size="lg"
                        />
                        <div className="max-w-[10ch] overflow-hidden text-center">
                          <p>{cast.name}</p>
                        </div>
                        <div className="max-w-[10ch] overflow-hidden text-center text-neutral-gray">
                          <p>{cast.character}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="py-5">
                <h3 className="title-3-bold mb-5">Crew</h3>
                <div className="media-scroller no-scrollbar">
                  {movieCredits?.crew.slice(0, 20).map((crew) => {
                    return (
                      <div key={crew.credit_id}>
                        <Avatar
                          src={
                            crew.profile_path &&
                            image_base_url + crew.profile_path
                          }
                          size="lg"
                        />
                        <div className="max-w-[10ch] overflow-hidden text-center">
                          <p>{crew.name}</p>
                        </div>
                        <div className="max-w-[10ch] overflow-hidden text-center text-neutral-gray">
                          <p>{crew.job}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          {/* Similar movies */}
          <div className="py-5">
            <h3 className="title-3-bold mb-5">Similar to "{movie?.title}"</h3>
            <MediaCardsList
              mediaList={similarMovies}
              mediaType={MediaTypes.MOVIE}
              loading={loadingSimilarMovies}
              loadingFallback={<CardSkeletonList />}
              error={similarMoviesError}
              errorFallback={
                <Error
                  message={similarMoviesError ?? undefined}
                  retry={
                    movieId ? () => getSimilarMovies(movieId, 1) : undefined
                  }
                />
              }
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default MovieDetails;
