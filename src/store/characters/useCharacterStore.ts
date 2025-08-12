import { create } from "zustand";
import type { Character } from "../../types/globals";
import { axiosInstance } from "../../lib/axios";

type CharacterStore = {
  characters: null | Character[];
  isLoading: boolean;
  error: null | Error;

  getCharacters: (page?: number) => void;
};

export const useCharactersStore = create<CharacterStore>((set) => ({
  characters: null,
  isLoading: false,
  error: null,

  getCharacters: async (page = 1) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(
        "/person/popular?language=en-US&page=" + page
      );
      const data = await response.data;

      set({ characters: data.results });
    } catch (error) {
      set({ error: new Error("Error in getting characters" + error) });
    } finally {
      set({ isLoading: false });
    }
  },
}));
