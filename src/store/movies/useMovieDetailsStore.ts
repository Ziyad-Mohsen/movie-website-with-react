import { create } from "zustand";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieImages,
  fetchSimilarMovies,
} from "../../api/movies";
import type {
  Media,
  Movie,
  TMDBCreditsResponse,
  TMDBImagesResponse,
} from "../../types/globals";
import type { ApiState } from "../types";

type MovieDetailsSlices = {
  movie: ApiState<Movie>;
  movieImages: ApiState<TMDBImagesResponse>;
  movieCredits: ApiState<TMDBCreditsResponse>;
  similarMovies: ApiState<Media[]> & {
    pagination: {
      page: number;
      total_pages: number;
      total_results: number;
      hasMore: boolean;
    } | null;
  };
};

type MovieDetailsStore = MovieDetailsSlices & {
  getMovieDetails: (id: string) => void;
  getMovieImages: (id: string) => void;
  getMovieCredits: (id: string) => void;
  getSimilarMovies: (id: string, page?: number) => void;
  resetState: <K extends keyof MovieDetailsSlices>(slice: K) => void;
  updateState: <
    K extends keyof MovieDetailsSlices,
    F extends keyof MovieDetailsSlices[K]
  >(
    slice: K,
    key: F,
    value: MovieDetailsSlices[K][F]
  ) => void;
};

export const useMovieDetailsStore = create<MovieDetailsStore>((set, get) => ({
  movie: { data: null, loading: false, error: null },
  movieImages: { data: null, loading: false, error: null },
  movieCredits: { data: null, loading: false, error: null },
  similarMovies: {
    data: null,
    loading: false,
    error: null,
    pagination: null,
  },

  getMovieDetails: async (id) => {
    get().resetState("movie");
    const updateState = get().updateState;
    updateState("movie", "loading", true);

    const { data, error } = await fetchMovieDetails(id);
    if (error) {
      updateState("movie", "error", error);
    } else {
      updateState("movie", "data", data);
    }
    updateState("movie", "loading", false);
  },

  getMovieImages: async (id) => {
    get().resetState("movieImages");
    const updateState = get().updateState;
    updateState("movieImages", "loading", true);

    const { data, error } = await fetchMovieImages(id);
    if (error) {
      updateState("movieImages", "error", error);
    } else {
      updateState("movieImages", "data", data);
    }
    updateState("movieImages", "loading", false);
  },

  getMovieCredits: async (id) => {
    get().resetState("movieCredits");
    const updateState = get().updateState;
    updateState("movieCredits", "loading", true);

    const { data, error } = await fetchMovieCredits(id);
    if (error) {
      updateState("movieCredits", "error", error);
    } else {
      updateState("movieCredits", "data", data);
    }
    updateState("movieCredits", "loading", false);
  },

  getSimilarMovies: async (id, page = 1) => {
    if (page === 1) {
      get().resetState("similarMovies");
    }
    const updateState = get().updateState;
    updateState("similarMovies", "loading", true);

    const { data, pagination, error } = await fetchSimilarMovies(id, page);
    if (error) {
      updateState("similarMovies", "error", error);
    } else {
      if (page === 1) {
        updateState("similarMovies", "data", data);
      } else {
        const currentData = get().similarMovies.data || [];
        updateState("similarMovies", "data", [...currentData, ...(data || [])]);
      }
      if (pagination) {
        updateState("similarMovies", "pagination", pagination);
      }
    }
    updateState("similarMovies", "loading", false);
  },

  updateState: (slice, key, value) =>
    set((state) => ({
      [slice]: {
        ...state[slice],
        [key]: value,
      },
    })),

  resetState: (slice) => {
    if (slice === "similarMovies") {
      set({
        [slice]: {
          loading: false,
          error: null,
          data: null,
          pagination: null,
        },
      });
    } else {
      set({ [slice]: { loading: false, error: null, data: null } });
    }
  },
}));
