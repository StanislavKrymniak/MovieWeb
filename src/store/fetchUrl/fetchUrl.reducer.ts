import { AnyAction } from "redux-saga";
import {FETCH_ACTION_TYPES } from "./fetchUrl.types";

export type FetchUrlState = {
    readonly urlMovie: string
    readonly urlTV: string
}
export const FETCH_URL_INITIAL_STATE: FetchUrlState = {
    urlMovie: '',
    urlTV: ''
}



export const fetchUrlReducer = (state = FETCH_URL_INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case FETCH_ACTION_TYPES.FETCH_SET_URL_MOVIE :
            return {
                ...state,
                urlMovie: action.payload
            }
        case FETCH_ACTION_TYPES.FETCH_SET_URL_TV :
            return {  
                ...state,
                urlTV: action.payload
            }
    }
    
    return state
}