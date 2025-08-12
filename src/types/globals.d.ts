import type { MediaTypes } from "../constants/enums";

export type Media = {
  adult: boolean; // defaults to true
  backdrop_path: string;
  id: number; // defaults to 0
  title?: string;
  original_title?: string;
  name?: string;
  original_name?: string;
  original_language: string;
  overview: string;
  poster_path: string;
  media_type: MediaTypes;
  genre_ids: number[];
  popularity: number; // defaults to 0
  release_date: string;
  video: boolean; // defaults to true
  vote_average: number; // defaults to 0
  vote_count: number; // defaults to 0
};

export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection?: string | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TvSeries = {
  adult: boolean;
  backdrop_path: string | null;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string | null;
  } | null;
  name: string;
  next_episode_to_air: string | null;
  networks: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export type TMDBImage = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type TMDBImagesResponse = {
  id: number;
  backdrops: TMDBImage[];
  logos: TMDBImage[];
  posters: TMDBImage[];
};

// Shared between Movie and TV credits
type PersonBase = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
};

// Role type for aggregate TV credits
type Role = {
  credit_id: string;
  character: string;
  episode_count: number;
};

// Cast type supporting both movie & TV formats
type Cast = PersonBase & {
  cast_id?: number; // Movie only
  character?: string; // Movie & normal TV credits
  roles?: Role[]; // Aggregate TV credits
  order?: number; // Movie only
  total_episode_count?: number; // Aggregate TV credits
};

// Crew type is the same for both
type Crew = PersonBase & {
  department: string;
  job: string;
};

// Credits response type
export type TMDPCreditsResponse = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export type Collection = {
  id: number;
  name: string;
};

export type Studio = {
  display_priorities: object;
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
};

export type Character = {
  adult?: boolean; // Defaults to true
  gender?: number; // Defaults to 0
  id?: number; // Defaults to 0
  known_for?: {
    adult?: boolean; // Defaults to true
    backdrop_path?: string;
    genre_ids?: number[];
    id?: number; // Defaults to 0
    media_type?: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    poster_path?: string;
    release_date?: string;
    title?: string;
    video?: boolean; // Defaults to true
    vote_average?: number; // Defaults to 0
    vote_count?: number; // Defaults to 0
  }[];
  known_for_department?: string;
  name?: string;
  popularity?: number; // Defaults to 0
  profile_path?: string;
};
