import type { AxiosError } from "axios";
import { axiosInstance } from "../lib/axios";
import type { Media } from "../types/globals";
import type { ApiCallStateWithPagination, PaginatedResponse } from "./types";

export default async function fetchTrendingMedia(
  page: number = 1
): Promise<ApiCallStateWithPagination<Media[], string>> {
  try {
    const response = await axiosInstance.get(
      `/trending/all/day?language=en-US&page=${page}`
    );
    const data: PaginatedResponse<Media> = await response.data;
    return {
      data: data.results,
      pagination: {
        page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results,
        hasMore: data.page < data.total_pages,
      },
      error: null,
    };
  } catch (error) {
    const err = error as AxiosError<{ status_message?: string }>;
    const statusMessage =
      err.response?.data?.status_message || "Error in getting trending media";
    console.error("Error in getting trending media", error);
    return { data: null, pagination: null, error: statusMessage };
  }
}
