import type { Media } from "../../types/globals";

export type TrendingStore = {
  trendingMedia: Media[] | null;
  isLoading: boolean;
  error: null | Error;

  getTrendingMedia: () => void;
};
