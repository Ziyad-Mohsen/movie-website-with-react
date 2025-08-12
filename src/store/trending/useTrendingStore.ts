import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";
import type { TrendingStore } from "./TrendingStore.types";

export const useTrendingStore = create<TrendingStore>((set) => ({
  trendingMedia: null,
  isLoading: false,
  error: null,

  getTrendingMedia: async () => {
    try {
      set({ error: null });
      set({ isLoading: true });
      const response = await axiosInstance.get(
        "/trending/all/day?language=en-US"
      );
      const data = await response.data;
      set({ trendingMedia: data.results });
    } catch (err) {
      console.error("Error in getting movies: ", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
