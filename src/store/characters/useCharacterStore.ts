import { create } from "zustand";
import type { Character } from "../../types/globals";
import { axiosInstance } from "../../lib/axios";

type CharacterStore = {
  characters: null | Character[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  hasMore: boolean;
  error: null | Error;

  getCharacters: (page?: number) => void;
  resetCharacters: () => void;
};

export const useCharactersStore = create<CharacterStore>((set, get) => ({
  characters: null,
  isLoading: false,
  currentPage: 0,
  totalPages: 0,
  totalResults: 0,
  hasMore: true,
  error: null,

  getCharacters: async (page = 1) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get(
        "/person/popular?language=en-US&page=" + page
      );
      const data = await response.data;

      if (page === 1) {
        set({
          characters: data.results,
          currentPage: data.page,
          totalPages: data.total_pages,
          totalResults: data.total_results,
          hasMore: data.page < data.total_pages,
        });
      } else {
        set({
          characters: [...(get().characters || []), ...data.results],
          currentPage: data.page,
          totalPages: data.total_pages,
          totalResults: data.total_results,
          hasMore: data.page < data.total_pages,
        });
      }
    } catch (error) {
      set({ error: new Error("Error in getting characters" + error) });
    } finally {
      set({ isLoading: false });
    }
  },

  resetCharacters: () => {
    set({
      characters: null,
      currentPage: 0,
      totalPages: 0,
      totalResults: 0,
      hasMore: true,
      error: null,
    });
  },
}));
