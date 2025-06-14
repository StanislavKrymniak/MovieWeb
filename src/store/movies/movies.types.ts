export enum MEDIA_ACTION_TYPES {
    FETCH_MOVIES_START = "FETCH_MOVIES_START",
    FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS",
    FETCH_TV_SHOWS_START = "FETCH_TV_SHOWS_START",
    FETCH_TV_SHOWS_SUCCESS = "FETCH_TV_SHOWS_SUCCESS",
    FETCH_MEDIA_FAILED = "FETCH_MEDIA_FAILED",
    FETCH_TOTAL_PAGES = "FETCH_TOTAL_PAGES"
}

export type MovieTypes = {
    id: number,
    poster_path: string,
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    genres: { id: number; name: string }[];
  }
  export type TvShowTypes = {
    id: number,
    poster_path: string,
    name: string;
    overview: string;
    first_air_date: string;
    vote_average: number;
    genres: { id: number; name: string }[];
  }

  export type MediaTypes = {
    id: number,
    poster_path: string,
    title: string;
    name: string;
    overview: string;
    first_air_date: string;
    release_date: string;
    vote_average: number;
    genres: { id: number; name: string }[];
    media_type: "movie" | "tv";
  }