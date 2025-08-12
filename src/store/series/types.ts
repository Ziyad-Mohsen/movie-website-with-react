import type { Media, TvSeries } from "../../types/globals";

export type SeriesStore = {
  series: Media[] | null;
  isLoading: boolean;
  error: null | Error;

  getSeries: (page?: number) => void;
  fetchSeriesDetails: (seriesId: string) => Promise<TvSeries | null>;
};
