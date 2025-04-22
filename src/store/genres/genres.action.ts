import { createAction,Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { Genres, GENRES_ACTION_TYPES } from "./genres.types";


export type FetchMovieGenresStart =  Action<GENRES_ACTION_TYPES.FETCH_MOVIE_GENRES_START>

export type FetchTVGenresStart =  Action<GENRES_ACTION_TYPES.FETCH_TV_GENRES_START>

export type FetchGenresSuccess = ActionWithPayload<GENRES_ACTION_TYPES.FETCH_GENRES_SUCCESS, Genres[]>

export type FetchGenresFailed = ActionWithPayload<GENRES_ACTION_TYPES.FETCH_GENRES_FAILED, Error>

export type SetSelectedGenres = ActionWithPayload<GENRES_ACTION_TYPES.SET_SELECTED_GENRES, number>




export const fetchMovieGenresStart = (): FetchMovieGenresStart => 
    createAction(GENRES_ACTION_TYPES.FETCH_MOVIE_GENRES_START)

export const fetchTVGenresStart = (): FetchTVGenresStart =>
    createAction(GENRES_ACTION_TYPES.FETCH_TV_GENRES_START)

export const fetchGenresSuccess = (genres: Genres[]): FetchGenresSuccess => 
    createAction(GENRES_ACTION_TYPES.FETCH_GENRES_SUCCESS, genres)

export const fetchGenresFailed = (error: Error): FetchGenresFailed => 
    createAction(GENRES_ACTION_TYPES.FETCH_GENRES_FAILED, error)

export const setSelectedGenres = (genreId: number): SetSelectedGenres =>
    createAction(GENRES_ACTION_TYPES.SET_SELECTED_GENRES, genreId)
