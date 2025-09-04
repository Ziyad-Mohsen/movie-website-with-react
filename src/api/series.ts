import { axiosInstance } from "../lib/axios";
import type { AxiosError } from "axios";
import type {
  Media,
  TMDBImagesResponse,
  TMDBCreditsResponse,
  TvSeries,
} from "../types/globals";
import type {
  ApiCallState,
  ApiCallStateWithPagination,
  PaginatedResponse,
} from "./types";

export async function fetchTvSeries(
  page: number = 1
): Promise<ApiCallStateWithPagination<TvSeries[], string>> {
  try {
    const response = await axiosInstance.get(
      "/tv/popular?language=en-US&page=" + page
    );
    const data: PaginatedResponse<TvSeries> = await response.data;
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
      err.response?.data?.status_message || "Error in getting tv series";
    console.error("Error in fetching tv series", error);
    return { data: null, pagination: null, error: statusMessage };
  }
}

export async function fetchTvSeriesDetails(
  seriesId: string
): Promise<ApiCallState<TvSeries, string>> {
  try {
    const response = await axiosInstance.get(`/tv/${seriesId}`);
    const data = await response.data;
    return { data, error: null };
  } catch (error) {
    const err = error as AxiosError<{ status_message?: string }>;
    const statusMessage =
      err.response?.data?.status_message ||
      "Error in getting tv series details";
    console.error("Error in getting tv series details", error);
    return { data: null, error: statusMessage };
  }
}

export async function fetchTvSeriesImages(
  seriesId: string
): Promise<ApiCallState<TMDBImagesResponse, string>> {
  try {
    const response = await axiosInstance.get(`/tv/${seriesId}/images`);
    const data = await response.data;
    return { data, error: null };
  } catch (error) {
    const err = error as AxiosError<{ status_message?: string }>;
    const statusMessage =
      err.response?.data?.status_message || "Error in getting tv series images";
    console.error("Error in getting tv series images", error);
    return { data: null, error: statusMessage };
  }
}

export async function fetchTvSeriesCredits(
  seriesId: string
): Promise<ApiCallState<TMDBCreditsResponse, string>> {
  try {
    const response = await axiosInstance.get(`/tv/${seriesId}/credits`);
    const data = await response.data;
    return { data, error: null };
  } catch (error) {
    const err = error as AxiosError<{ status_message?: string }>;
    const statusMessage =
      err.response?.data?.status_message ||
      "Error in getting tv series credits";
    console.log("Error in getting tv series credits:", error);
    return { data: null, error: statusMessage };
  }
}

export async function fetchSimilarTvSeries(
  mediaId: string,
  page: number = 1
): Promise<ApiCallStateWithPagination<Media[], string>> {
  try {
    const response = await axiosInstance.get(
      `/tv/${mediaId}/similar?page=${page}`
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
      err.response?.data?.status_message ||
      "Error in getting similar tv series";
    console.error("Error in getting similar tv series", error);
    return { data: null, pagination: null, error: statusMessage };
  }
}
