import { MediaTypes } from "../constants/enums";
import type {
  Media,
  TMDBImagesResponse,
  TMDPCreditsResponse,
} from "../types/globals";
import { axiosInstance } from "./axios";

export const image_base_url = "https://image.tmdb.org/t/p/original";

export async function getMediaImages(
  mediaId: string,
  mediaType: MediaTypes
): Promise<TMDBImagesResponse | null> {
  try {
    const response = await axiosInstance.get(
      `/${
        mediaType === MediaTypes.TV ? MediaTypes.TV : MediaTypes.MOVIE
      }/${mediaId}/images`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error in getting media images:", error);
    return null;
  }
}

export async function getMediaCredits(
  mediaId: string,
  mediaType: MediaTypes
): Promise<TMDPCreditsResponse | null> {
  try {
    const response = await axiosInstance.get(
      `/${
        mediaType === MediaTypes.TV ? MediaTypes.TV : MediaTypes.MOVIE
      }/${mediaId}/credits`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Error in getting media Credits:", error);
    return null;
  }
}

export async function getSimilarMedia(
  mediaId: string,
  mediaType: MediaTypes
): Promise<Media[] | null> {
  try {
    const response = await axiosInstance.get(
      `/${
        mediaType === MediaTypes.TV ? MediaTypes.TV : MediaTypes.MOVIE
      }/${mediaId}/similar`
    );
    const data = await response.data;
    return data.results;
  } catch (error) {
    console.log("Error in getting media Credits:", error);
    return null;
  }
}

// export async function getGenere(genereId: string) {
//   try {
//   } catch (error) {

//   }
// }
