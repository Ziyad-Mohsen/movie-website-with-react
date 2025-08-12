import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMoviesStore } from "../../store/movies/useMoviesStore";
import type {
  TMDBImagesResponse,
  Movie,
  TMDPCreditsResponse,
  Media,
} from "../../types/globals";
import Header from "../../components/Header/Header";
import {
  getMediaCredits,
  getMediaImages,
  getSimilarMedia,
  image_base_url,
} from "../../lib/api";
import { getMediaDurationTime } from "../../lib/utils";
import StarsRating from "../../components/StarsRating/StarsRating";
import Button from "../../components/ui/Button/Button";
import { FaPlay } from "react-icons/fa";
import { MediaTypes } from "../../constants/enums";
import CollectionCard from "../../components/ui/Cards/CollectionCard";
import Avatar from "../../components/ui/Avatar/Avatar";
import MediaCard from "../../components/ui/Cards/MediaCard";
import TopProgressBarLoader from "../../components/Loaders/TopProgressBarLoader";

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movieImages, setMoiveImgaes] = useState<TMDBImagesResponse | null>(
    null
  );
  const [movieCredits, setMovieCredits] = useState<TMDPCreditsResponse | null>(
    null
  );
  const [similarMovies, setSimilarMovies] = useState<Media[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { fetchMovieDetails } = useMoviesStore();

  const getMovie = async () => {
    try {
      setIsLoading(true);
      if (movieId) {
        const resMovie = await fetchMovieDetails(movieId);
        const resMovieImages = await getMediaImages(movieId, MediaTypes.MOVIE);
        const resMovieCredits = await getMediaCredits(
          movieId,
          MediaTypes.MOVIE
        );
        const resSimilarMoives = await getSimilarMedia(
          movieId,
          MediaTypes.MOVIE
        );

        setMovie(resMovie);
        setMoiveImgaes(resMovieImages);
        setMovieCredits(resMovieCredits);
        setSimilarMovies(resSimilarMoives);
      }
    } catch (error) {
      console.log("Error in getting movie in movie details page: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) {
      getMovie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  if (isLoading) return <TopProgressBarLoader />;

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
                {movie?.production_countries[0].iso_3166_1}
              </div>
              <p>{movie?.overview}</p>
              <div className="flex gap-2">
                <Link
                  to={`https://www.imdb.com/title/${movie?.imdb_id}`}
                  className="bg-amber-400 p-2 rounded-lg text-neutral-black font-bold"
                >
                  IMDB
                </Link>
                <StarsRating rating={movie?.vote_average} size={24} />
                <Button>like</Button>
                <Button>dislike</Button>
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
          {movieImages?.backdrops.slice(0, 5).map((image) => (
            <img
              className="w-90 border-1 border-primary rounded-lg"
              src={image_base_url + image.file_path}
            />
          ))}
        </div>
        <div className="container">
          <div className="py-5">
            <h3 className="title-3-bold mb-5">Generes</h3>
            <div className="flex gap-5 items-center">
              {movie?.genres.map((genere) => (
                <CollectionCard collection={genere.name} />
              ))}
            </div>
          </div>
          <div className="py-5">
            <h3 className="title-3-bold mb-5">Characters</h3>
            <div className="media-scroller no-scrollbar">
              {movieCredits?.cast.map((cast) => {
                return (
                  <div>
                    <Avatar
                      src={
                        cast.profile_path && image_base_url + cast.profile_path
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
                  <div>
                    <Avatar
                      src={
                        crew.profile_path && image_base_url + crew.profile_path
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
          <div className="py-5">
            <h3 className="title-3-bold mb-5">Similar to "{movie?.title}"</h3>
            <div className="media-scroller no-scrollbar">
              {similarMovies?.map((movie) => (
                <MediaCard
                  media={movie}
                  type={MediaTypes.MOVIE}
                  key={movie.id}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MovieDetails;
