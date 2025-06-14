import { AnyAction } from "redux-saga";
import { MEDIA_ACTION_TYPES, MediaTypes } from "./movies.types";

export type MoviesState = {
    readonly moviesList : MediaTypes[]
    readonly tvShowsList: MediaTypes[]
    readonly isLoading: boolean
    readonly error: Error | null
    readonly totalPages: number 
}
export const CHECKOUT_INITIAL_STATE: MoviesState = {
    moviesList: [],
    tvShowsList: [],
    isLoading: false,
    error:null,
    totalPages: 500
}



export const moviesReducer = (state = CHECKOUT_INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case MEDIA_ACTION_TYPES.FETCH_MOVIES_START:
        case MEDIA_ACTION_TYPES.FETCH_TV_SHOWS_START:
            return { ...state, isLoading: true };

        case MEDIA_ACTION_TYPES.FETCH_MOVIES_SUCCESS:
            return { ...state, moviesList: action.payload, isLoading: false };

        case MEDIA_ACTION_TYPES.FETCH_TV_SHOWS_SUCCESS:
            return { ...state, tvShowsList: action.payload, isLoading: false };

        case MEDIA_ACTION_TYPES.FETCH_MEDIA_FAILED:
            return { ...state, error: action.payload, isLoading: false };

        case MEDIA_ACTION_TYPES.FETCH_TOTAL_PAGES:
            return { ...state, totalPages: action.payload };

        default:
            return state;
    }
    
    return state
}