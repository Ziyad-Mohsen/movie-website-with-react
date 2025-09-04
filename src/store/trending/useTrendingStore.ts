import { create } from "zustand";
import type { Media } from "../../types/globals";
import fetchTrendingMedia from "../../api/trending";

export type TrendingStore = {
  trendingMedia: Media[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  hasMore: boolean;
  error: string | null;

  getTrendingMedia: (page?: number) => void;
  resetTrending: () => void;
};

export const useTrendingStore = create<TrendingStore>((set, get) => ({
  trendingMedia: [],
  isLoading: false,
  currentPage: 0,
  totalPages: 0,
  totalResults: 0,
  hasMore: true,
  error: null,

  getTrendingMedia: async (page = 1) => {
    try {
      set({ isLoading: true, error: null });
      const { data, pagination, error } = await fetchTrendingMedia(page);

      if (error) {
        set({ error });
        return;
      }

      if (data && pagination) {
        if (page === 1) {
          set({
            trendingMedia: data,
            currentPage: pagination.page,
            totalPages: pagination.total_pages,
            totalResults: pagination.total_results,
            hasMore: pagination.hasMore,
          });
        } else {
          set({
            trendingMedia: [...get().trendingMedia, ...data],
            currentPage: pagination.page,
            totalPages: pagination.total_pages,
            totalResults: pagination.total_results,
            hasMore: pagination.hasMore,
          });
        }
      } else {
        set({ trendingMedia: [] });
      }
    } catch (err) {
      console.error("Error in getting trending media: ", err);
    } finally {
      set({ isLoading: false });
    }
  },

  resetTrending: () => {
    set({
      trendingMedia: [],
      currentPage: 0,
      totalPages: 0,
      totalResults: 0,
      hasMore: true,
      error: null,
    });
  },
}));
