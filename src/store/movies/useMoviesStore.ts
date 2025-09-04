import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";
import type { Movie } from "../../types/globals";
import { fetchMovies } from "../../api/movies";

export type MoviesStore = {
  movies: Movie[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  hasMore: boolean;
  error: null | string;
  getMovies: (page: number) => void;
  fetchMovieDetails: (movieId: string) => Promise<Movie | null>;
  resetMovies: () => void;
};

export const useMoviesStore = create<MoviesStore>((set, get) => ({
  movies: [],
  isLoading: false,
  currentPage: 0,
  totalPages: 0,
  totalResults: 0,
  hasMore: true,
  error: null,

  getMovies: async (page = 1) => {
    try {
      set({ isLoading: true, error: null });
      const { data, pagination, error } = await fetchMovies(page);

      if (error) {
        set({ error: error });
        return;
      }

      if (data && pagination) {
        if (page === 1) {
          set({
            movies: data,
            currentPage: pagination.page,
            totalPages: pagination.total_pages,
            totalResults: pagination.total_results,
            hasMore: pagination.hasMore,
          });
        } else {
          set({
            movies: [...get().movies, ...data],
            currentPage: pagination.page,
            totalPages: pagination.total_pages,
            totalResults: pagination.total_results,
            hasMore: pagination.hasMore,
          });
        }
      } else {
        set({ movies: [] });
      }
    } catch (error) {
      console.error(error);
      set({ error: "Error in getting movies" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMovieDetails: async (movieId) => {
    try {
      const response = await axiosInstance.get(`/movie/${movieId}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log("Error in getting movie details:", error);
      return null;
    }
  },

  resetMovies: () => {
    set({
      movies: [],
      currentPage: 0,
      totalPages: 0,
      totalResults: 0,
      hasMore: true,
      error: null,
    });
  },
}));
