import type { Media } from "../../../../../types/globals";

export type MovieCarouselProps = {
  moviesList: Media[] | null;
  activeMovie: Media | null;
  moviesCount: number;
  handleActiveMovieChange: (idx: number) => void;
};
