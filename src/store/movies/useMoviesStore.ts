import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";
import type { MoviesStore } from "./types";

export const useMoviesStore = create<MoviesStore>((set) => ({
  movies: null,
  isLoading: false,
  error: null,

  getMovies: async (page = 1) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(
        "/movie/popular?language=en-US&page=" + page
      );
      const data = await response.data;

      if (data) {
        set({ movies: data.results });
      }
    } catch (error) {
      set({ error: new Error("Error in getting movies " + error) });
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
}));
