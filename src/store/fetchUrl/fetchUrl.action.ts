import { createAction,ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { FETCH_ACTION_TYPES } from "./fetchUrl.types";


export type SetUrlMovie = ActionWithPayload<FETCH_ACTION_TYPES.FETCH_SET_URL_MOVIE, string>
export type SetUrlTV = ActionWithPayload<FETCH_ACTION_TYPES.FETCH_SET_URL_TV, string>

export const setUrlMovie = (urlMovie: string): SetUrlMovie => 
    createAction(FETCH_ACTION_TYPES.FETCH_SET_URL_MOVIE, urlMovie)


export const setUrlTV = (urlTV: string): SetUrlTV => 
    createAction(FETCH_ACTION_TYPES.FETCH_SET_URL_TV, urlTV)





