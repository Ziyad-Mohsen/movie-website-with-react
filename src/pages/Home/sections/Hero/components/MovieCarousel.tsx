import clsx from "clsx";
import { image_base_url } from "../../../../../lib/api";
import { motion } from "motion/react";
import type { MovieCarouselProps } from "./MovieCarousel.types";

function MovieCarousel({
  moviesList,
  activeMovie,
  moviesCount,
  handleActiveMovieChange,
}: MovieCarouselProps) {
  // Find the index of the active movie
  const activeIdx = moviesList?.findIndex((m) => m.id === activeMovie?.id);
  return (
    <div className="flex space-x-2 sm:space-x-4 md:space-x-6 py-2 px-2">
      {moviesList?.slice(0, moviesCount).map((movie, idx) => {
        const isActive = idx === activeIdx;
        let cardIndex;
        if (isActive) {
          cardIndex = moviesCount + 1; // Highest z-index for active
        } else if (activeIdx && idx < activeIdx) {
          cardIndex = idx + 1; // Increment before active
        } else {
          cardIndex = moviesCount - idx; // Decrement after active
        }
        return (
          <motion.div
            layout
            animate={{
              scale: isActive ? 1.1 : 0.9,
              zIndex: cardIndex,
            }}
            whileHover={{
              scale: isActive ? 1.1 : 0.95,
              zIndex: moviesCount,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={clsx(
              "relative cursor-pointer w-24 sm:w-28 md:w-32 lg:w-36 -ml-2 -mr-2 sm:-ml-4 sm:-mr-4 rounded-2xl overflow-hidden",
              isActive
                ? "shadow-2xl"
                : "shadow-none before:content-[''] before:absolute before:inset-0 before:bg-neutral-black/60 before:z-0"
            )}
            key={movie.id}
            onClick={() => handleActiveMovieChange(idx)}
          >
            <img
              className="object-cover object-center w-full sm:h-36 md:h-40 lg:h-44"
              src={image_base_url + movie.poster_path}
              alt={movie.title}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default MovieCarousel;
