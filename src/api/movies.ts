import { axiosInstance } from "../lib/axios";
import type { AxiosError } from "axios";
import type {
  Media,
  Movie,
  TMDBImagesResponse,
  TMDBCreditsResponse,
} from "../types/globals";
import type {
  ApiCallState,
  ApiCallStateWithPagination,
  PaginatedResponse,
} from "./types";

export async function fetchMovies(
  page: number = 1
): Promise<ApiCallStateWithPagination<Movie[], string>> {
  try {
    const response = await axiosInstance.get(
      "/discover/movie?language=en-US&page=" + page
    );
    const data: PaginatedResponse<Movie> = await response.data;
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
      err.response?.data?.status_message || "Error in getting movies";
    console.error("Error in fetching movies", error);
    return { data: null, pagination: null, error: statusMessage };
  }
}

export async function fetchMovieDetails(
  movieId: string
): Promise<ApiCallState<Movie, string>> {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    const data = await response.data;
    return { data, error: null };
  } catch (error) {
    const err = error as AxiosError<{ status_message?: string }>;
    const statusMessage =
      err.response?.data?.status_message || "Error in getting movie details";
    console.error("Error in getting movie details", error);
    return { data: null, error: statusMessage };
  }
}

export async function fetchMovieImages(
  movieId: string
): Promise<ApiCallState<TMDBImagesResponse, string>> {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/images`);
    const data = await response.data;
    return { data, error: null };
  } catch (error) {
    const err = error as AxiosError<{ status_message?: string }>;
    const statusMessage =
      err.response?.data?.status_message || "Error in getting movie images";
    console.error("Error in getting movie images", error);
    return { data: null, error: statusMessage };
  }
}

export async function fetchMovieCredits(
  mediaId: string
): Promise<ApiCallState<TMDBCreditsResponse, string>> {
  try {
    const response = await axiosInstance.get(`/movie/${mediaId}/credits`);
    const data = await response.data;
    return { data, error: null };
  } catch (error) {
    const err = error as AxiosError<{ status_message?: string }>;
    const statusMessage =
      err.response?.data?.status_message || "Error in getting movie credits";
    console.error("Error in getting movie credits:", error);
    return { data: null, error: statusMessage };
  }
}

export async function fetchSimilarMovies(
  mediaId: string,
  page: number = 1
): Promise<ApiCallStateWithPagination<Media[], string>> {
  try {
    const response = await axiosInstance.get(
      `/movie/${mediaId}/similar?page=${page}`
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
      err.response?.data?.status_message || "Error in getting similar movies";
    console.error("Error in getting similar movies", error);
    return { data: null, pagination: null, error: statusMessage };
  }
}
