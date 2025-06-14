import { AnyAction } from "redux-saga";
import { GENRES_ACTION_TYPES, Genres} from "./genres.types";

export type GenresState = {
    readonly movieGenres : Genres[],
    readonly tvGenres : Genres[],
    readonly selectedGenres: number[]
    readonly isLoading: boolean,
    readonly error: Error | null,
    readonly hasFetchedMovieGenres: boolean,
    readonly hasFetchedTVGenres: boolean
    readonly payloadType: string
}
export const CHECKOUT_INITIAL_STATE: GenresState = {
    movieGenres: [],
    tvGenres: [],
    selectedGenres:[],
    isLoading: false,
    error: null,
    hasFetchedMovieGenres: false,
    hasFetchedTVGenres: false,
    payloadType: ''
}



export const genresReducer = (state = CHECKOUT_INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case GENRES_ACTION_TYPES.FETCH_MOVIE_GENRES_START :
            return {
                ...state,
                isLoading: true
            }
        case GENRES_ACTION_TYPES.FETCH_TV_GENRES_START :
            return {
                ...state,
                isLoading: true
            }
        case GENRES_ACTION_TYPES.FETCH_GENRES_SUCCESS: {
            const { genres, payloadType } = action.payload;
            if (payloadType === 'movie') {
                return {
                ...state,
                movieGenres: genres,
                isLoading: false,
                hasFetchedMovieGenres: true,
                };
            } else if (payloadType === 'tv') {
                return {
                ...state,
                tvGenres: genres,
                isLoading: false,
                hasFetchedTVGenres: true,
                };
            }
            return state;
        }
        case GENRES_ACTION_TYPES.FETCH_GENRES_FAILED :
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case GENRES_ACTION_TYPES.SET_SELECTED_GENRES :
            const genreId = action.payload;
            const selectedGenres = state.selectedGenres || []; 
            const updatedSelectedGenres = selectedGenres.includes(genreId)
                ? selectedGenres.filter(id => id !== genreId)
                : [...selectedGenres, genreId];
            return { ...state, selectedGenres: updatedSelectedGenres };
    }
    
    return state
}