export type ApiCallState<Data, Error> = {
  data: Data | null;
  error: Error | null;
};

export type PaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type ApiCallStateWithPagination<Data, Error> = {
  data: Data | null;
  pagination: {
    page: number;
    total_pages: number;
    total_results: number;
    hasMore: boolean;
  } | null;
  error: Error | null;
};
