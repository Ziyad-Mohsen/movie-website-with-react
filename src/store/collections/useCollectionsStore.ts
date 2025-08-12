import { create } from "zustand";
import type { CollectionsStore } from "./CollectionStore.types";
import { axiosInstance } from "../../lib/axios";

export const useCollectionsStore = create<CollectionsStore>((set) => ({
  collections: null,
  isLoading: false,
  error: null,

  getCollections: async (type) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(
        `/genre/${type}/list?language=en`
      );
      const data = await response.data;

      set({ collections: data.genres });
    } catch (error) {
      set({ error: new Error("Error in getting collections" + error) });
    } finally {
      set({ isLoading: false });
    }
  },
}));
