import type { Media, Movie } from "../../types/globals";

export type MoviesStore = {
  movies: Media[] | null;
  isLoading: boolean;
  error: null | Error;
  getMovies: (page?: number) => void;
  fetchMovieDetails: (movieId: string) => Promise<Movie | null>;
};
