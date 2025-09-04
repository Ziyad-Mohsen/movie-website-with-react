import { create } from "zustand";
import type { Media } from "../../types/globals";
import { fetchMultiSearchResults } from "../../api/search";

export type SearchStore = {
  results: Media[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  hasMore: boolean;
  error: string | null;
  searchMultiResults: (query: string, page?: number) => Promise<void>;
  resetSearch: () => void;
};

export const useSearchStore = create<SearchStore>((set, get) => ({
  results: [],
  isLoading: false,
  currentPage: 0,
  totalPages: 0,
  totalResults: 0,
  hasMore: true,
  error: null,

  searchMultiResults: async (query, page = 1) => {
    set({ isLoading: true, error: null });
    const { data, pagination, error } = await fetchMultiSearchResults(
      query,
      page
    );

    if (error) {
      set({ error, results: [] });
    } else if (data && pagination) {
      if (page === 1) {
        set({
          results: data,
          currentPage: pagination.page,
          totalPages: pagination.total_pages,
          totalResults: pagination.total_results,
          hasMore: pagination.hasMore,
        });
      } else {
        set({
          results: [...get().results, ...data],
          currentPage: pagination.page,
          totalPages: pagination.total_pages,
          totalResults: pagination.total_results,
          hasMore: pagination.hasMore,
        });
      }
    }
    set({ isLoading: false });
  },

  resetSearch: () => {
    set({
      results: [],
      currentPage: 0,
      totalPages: 0,
      totalResults: 0,
      hasMore: true,
      error: null,
    });
  },
}));
