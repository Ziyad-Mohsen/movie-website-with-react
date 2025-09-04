import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";
import type { Media, TvSeries } from "../../types/globals";
import { fetchTvSeries } from "../../api/series";

export type SeriesStore = {
  series: Media[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  hasMore: boolean;
  error: string | null;

  getSeries: (page?: number) => void;
  fetchSeriesDetails: (seriesId: string) => Promise<TvSeries | null>;
  resetSeries: () => void;
};

export const useSeriesStore = create<SeriesStore>((set, get) => ({
  series: [],
  isLoading: false,
  currentPage: 0,
  totalPages: 0,
  totalResults: 0,
  hasMore: true,
  error: null,

  getSeries: async (page = 1) => {
    try {
      set({ isLoading: true, error: null });
      const { data, pagination, error } = await fetchTvSeries(page);

      if (error) {
        set({ error });
        return;
      }

      if (data && pagination) {
        if (page === 1) {
          set({
            series: data,
            currentPage: pagination.page,
            totalPages: pagination.total_pages,
            totalResults: pagination.total_results,
            hasMore: pagination.hasMore,
          });
        } else {
          set({
            series: [...get().series, ...data],
            currentPage: pagination.page,
            totalPages: pagination.total_pages,
            totalResults: pagination.total_results,
            hasMore: pagination.hasMore,
          });
        }
      } else {
        set({ series: [] });
      }
    } catch {
      set({ error: "Error in getting series" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSeriesDetails: async (seriesId) => {
    try {
      const response = await axiosInstance.get(`/tv/${seriesId}`);
      const data = await response.data;

      return data;
    } catch (error) {
      console.log("Error in fetching series details:", error);
      return null;
    }
  },

  resetSeries: () => {
    set({
      series: [],
      currentPage: 0,
      totalPages: 0,
      totalResults: 0,
      hasMore: true,
      error: null,
    });
  },
}));
