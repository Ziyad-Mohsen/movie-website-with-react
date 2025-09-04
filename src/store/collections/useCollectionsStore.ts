import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";
import type { Collection } from "../../types/globals";

export type CollectionsStore = {
  collections: Collection[] | null;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  hasMore: boolean;
  error: null | Error;

  getCollections: (type: "tv" | "movie", page?: number) => void;
  resetCollections: () => void;
};

export const useCollectionsStore = create<CollectionsStore>((set, get) => ({
  collections: null,
  isLoading: false,
  currentPage: 0,
  totalPages: 0,
  totalResults: 0,
  hasMore: true,
  error: null,

  getCollections: async (type, page = 1) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get(
        `/genre/${type}/list?language=en&page=${page}`
      );
      const data = await response.data;

      // Note: TMDB genre list doesn't support pagination, but we'll keep the structure consistent
      if (page === 1) {
        set({
          collections: data.genres,
          currentPage: 1,
          totalPages: 1,
          totalResults: data.genres.length,
          hasMore: false,
        });
      } else {
        set({
          collections: [...(get().collections || []), ...data.genres],
          currentPage: page,
          totalPages: page,
          totalResults: (get().collections?.length || 0) + data.genres.length,
          hasMore: false,
        });
      }
    } catch (error) {
      set({ error: new Error("Error in getting collections" + error) });
    } finally {
      set({ isLoading: false });
    }
  },

  resetCollections: () => {
    set({
      collections: null,
      currentPage: 0,
      totalPages: 0,
      totalResults: 0,
      hasMore: true,
      error: null,
    });
  },
}));
