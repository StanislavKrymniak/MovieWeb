import { AnyAction } from "redux-saga";
import { GENRES_ACTION_TYPES, Genres} from "./genres.types";

export type GenresState = {
    readonly genres : Genres[],
    readonly selectedGenres: number[]
    readonly isLoading: boolean,
    readonly error: Error | null
}
export const CHECKOUT_INITIAL_STATE: GenresState = {
    genres: [],
    selectedGenres:[],
    isLoading: false,
    error: null
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
        case GENRES_ACTION_TYPES.FETCH_GENRES_SUCCESS :
            return {
                ...state,
                genres: action.payload,
                isLoading: false
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