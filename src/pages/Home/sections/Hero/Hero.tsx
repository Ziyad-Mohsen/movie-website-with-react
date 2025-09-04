import { useEffect, useState } from "react";
import MovieCarousel from "./components/MovieCarousel";
import { FaPlay } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { useTrendingStore } from "../../../../store/trending/useTrendingStore";
import { image_base_url } from "../../../../lib/api";
import Button from "../../../../components/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../../constants/enums";
import StarsRating from "../../../../components/StarsRating/StarsRating";
import Spinner from "../../../../components/Loaders/Spinner";

const carouselMediaCount = 5;

function Hero() {
  const { trendingMedia, isLoading, getTrendingMedia } = useTrendingStore();
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(2);
  const activeMedia = trendingMedia && trendingMedia[activeMediaIndex];
  const navigate = useNavigate();

  useEffect(() => {
    getTrendingMedia();
  }, [getTrendingMedia]);

  useEffect(() => {
    const activeIndexInterval = setInterval(() => {
      setActiveMediaIndex((prev) => {
        if (prev >= carouselMediaCount - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 5000);

    return () => clearInterval(activeIndexInterval);
  }, [activeMediaIndex]);

  const handleActiveMediaChange = (idx: number) => {
    setActiveMediaIndex(idx);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <section
      className="flex justify-center items-end min-h-screen bg-cover bg-center relative py-section"
      style={{
        backgroundImage: `url(${image_base_url + activeMedia?.backdrop_path})`,
      }}
    >
      <div className="overlay"></div>
      <div className="container flex max-lg:flex-col-reverse max-lg:items-center justify-between items-end gap-8 lg:gap-12 z-1">
        <div className="flex-1 flex flex-col justify-center lg:justify-end mb-8 lg:mb-0">
          <h1 className="title-2-bold leading-none mb-4">
            {activeMedia?.name ? activeMedia.name : activeMedia?.title}
          </h1>
          <p className="mb-6 text-base sm:text-lg md:text-xl lg:text-lg text-neutral-300 max-w-full break-words hyphens-auto">
            {activeMedia && activeMedia?.overview.length > 200
              ? activeMedia?.overview.slice(0, 200) + "..."
              : activeMedia?.overview}
          </p>
          <StarsRating rating={activeMedia?.vote_average} className="mb-4" />
          <div className="flex max-md:flex-col gap-4">
            <Button
              variant="fill"
              size="lg"
              color="primary"
              iconLeft={<FaPlay />}
            >
              Watch Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              color="primary"
              iconRight={<FiArrowRight />}
              onClick={() => {
                navigate(
                  `${
                    activeMedia?.media_type === "tv"
                      ? Routes.SERIES
                      : Routes.MOVIES
                  }/${activeMedia?.id}`
                );
              }}
            >
              More Info
            </Button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <MovieCarousel
            moviesList={trendingMedia}
            activeMovie={activeMedia}
            moviesCount={carouselMediaCount}
            handleActiveMovieChange={handleActiveMediaChange}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
