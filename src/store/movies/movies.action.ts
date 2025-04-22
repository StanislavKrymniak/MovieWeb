import { createAction, ActionWithPayload, Action } from "../../utils/reducer/reducer.utils";
import { MEDIA_ACTION_TYPES, MovieTypes, TvShowTypes } from "./movies.types";


export type FetchMoviesStart = Action<MEDIA_ACTION_TYPES.FETCH_MOVIES_START>
export type FetchMoviesSuccess = ActionWithPayload<MEDIA_ACTION_TYPES.FETCH_MOVIES_SUCCESS,MovieTypes[]>
export type FetchMediaFailed = ActionWithPayload<MEDIA_ACTION_TYPES.FETCH_MEDIA_FAILED, Error>

export type FetchTvShowsStart = Action<MEDIA_ACTION_TYPES.FETCH_TV_SHOWS_START>
export type FetchTvShowsSuccess = ActionWithPayload<MEDIA_ACTION_TYPES.FETCH_TV_SHOWS_SUCCESS, TvShowTypes[]>
export type FetchTotalPages = ActionWithPayload<MEDIA_ACTION_TYPES.FETCH_TOTAL_PAGES, number>


export const fetchMoviesStart = (): FetchMoviesStart => 
    createAction(MEDIA_ACTION_TYPES.FETCH_MOVIES_START)

export const fetchMoviesSuccess = (MoviesList: MovieTypes[]): FetchMoviesSuccess => 
    createAction(MEDIA_ACTION_TYPES.FETCH_MOVIES_SUCCESS, MoviesList)

export const fetchMediaFailed = (error: Error): FetchMediaFailed => 
    createAction(MEDIA_ACTION_TYPES.FETCH_MEDIA_FAILED, error)

export const fetchTotalPages = (totalPages: number) : FetchTotalPages =>
    createAction(MEDIA_ACTION_TYPES.FETCH_TOTAL_PAGES, totalPages)






export const fetchTVShowsStart = (): FetchTvShowsStart =>
    createAction(MEDIA_ACTION_TYPES.FETCH_TV_SHOWS_START)

export const fetchTVShowsSuccess = (tvShowsList: TvShowTypes[]): FetchTvShowsSuccess =>
    createAction(MEDIA_ACTION_TYPES.FETCH_TV_SHOWS_SUCCESS, tvShowsList)

