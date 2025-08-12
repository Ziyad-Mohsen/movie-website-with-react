import type { Collection } from "../../types/globals";

export type CollectionsStore = {
  collections: Collection[] | null;
  isLoading: boolean;
  error: null | Error;

  getCollections: (type: "tv" | "movie") => void;
};
