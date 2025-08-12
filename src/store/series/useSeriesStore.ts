import { create } from "zustand";
import type { SeriesStore } from "./types";
import { axiosInstance } from "../../lib/axios";

export const useSeriesStore = create<SeriesStore>((set) => ({
  series: null,
  isLoading: false,
  error: null,

  getSeries: async (page = 1) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(
        "/tv/popular?language=en-US&page=" + page
      );
      const data = await response.data;
      set({ series: data.results });
    } catch (error) {
      set({ error: new Error("Error in getting movies " + error) });
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
}));
