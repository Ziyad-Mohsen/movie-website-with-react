import { create } from "zustand";
import {
  fetchTvSeriesDetails,
  fetchTvSeriesImages,
  fetchTvSeriesCredits,
  fetchSimilarTvSeries,
} from "../../api/series";
import type {
  Media,
  TvSeries,
  TMDBImagesResponse,
  TMDBCreditsResponse,
} from "../../types/globals";
import type { ApiState } from "../types";

type SeriesDetailsSlices = {
  series: ApiState<TvSeries>;
  seriesImages: ApiState<TMDBImagesResponse>;
  seriesCredits: ApiState<TMDBCreditsResponse>;
  similarSeries: ApiState<Media[]> & {
    pagination: {
      page: number;
      total_pages: number;
      total_results: number;
      hasMore: boolean;
    } | null;
  };
};

type SeriesDetailsStore = SeriesDetailsSlices & {
  getSeriesDetails: (id: string) => void;
  getSeriesImages: (id: string) => void;
  getSeriesCredits: (id: string) => void;
  getSimilarSeries: (id: string, page?: number) => void;
  resetState: <K extends keyof SeriesDetailsSlices>(slice: K) => void;
  updateState: <
    K extends keyof SeriesDetailsSlices,
    F extends keyof SeriesDetailsSlices[K]
  >(
    slice: K,
    key: F,
    value: SeriesDetailsSlices[K][F]
  ) => void;
};

export const useSeriesDetailsStore = create<SeriesDetailsStore>((set, get) => ({
  series: { data: null, loading: false, error: null },
  seriesImages: { data: null, loading: false, error: null },
  seriesCredits: { data: null, loading: false, error: null },
  similarSeries: {
    data: null,
    loading: false,
    error: null,
    pagination: null,
  },

  getSeriesDetails: async (id) => {
    get().resetState("series");
    const updateState = get().updateState;
    updateState("series", "loading", true);

    const { data, error } = await fetchTvSeriesDetails(id);
    if (error) {
      updateState("series", "error", error);
    } else {
      updateState("series", "data", data);
    }
    updateState("series", "loading", false);
  },

  getSeriesImages: async (id) => {
    get().resetState("seriesImages");
    const updateState = get().updateState;
    updateState("seriesImages", "loading", true);

    const { data, error } = await fetchTvSeriesImages(id);
    if (error) {
      updateState("seriesImages", "error", error);
    } else {
      updateState("seriesImages", "data", data);
    }
    updateState("seriesImages", "loading", false);
  },

  getSeriesCredits: async (id) => {
    get().resetState("seriesCredits");
    const updateState = get().updateState;
    updateState("seriesCredits", "loading", true);

    const { data, error } = await fetchTvSeriesCredits(id);
    if (error) {
      updateState("seriesCredits", "error", error);
    } else {
      updateState("seriesCredits", "data", data);
    }
    updateState("seriesCredits", "loading", false);
  },

  getSimilarSeries: async (id, page = 1) => {
    if (page === 1) {
      get().resetState("similarSeries");
    }
    const updateState = get().updateState;
    updateState("similarSeries", "loading", true);

    const { data, pagination, error } = await fetchSimilarTvSeries(id, page);
    if (error) {
      updateState("similarSeries", "error", error);
    } else {
      if (page === 1) {
        updateState("similarSeries", "data", data);
      } else {
        const currentData = get().similarSeries.data || [];
        updateState("similarSeries", "data", [...currentData, ...(data || [])]);
      }
      if (pagination) {
        updateState("similarSeries", "pagination", pagination);
      }
    }
    updateState("similarSeries", "loading", false);
  },

  updateState: (slice, key, value) =>
    set((state) => ({
      [slice]: {
        ...state[slice],
        [key]: value,
      },
    })),

  resetState: (slice) => {
    if (slice === "similarSeries") {
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
