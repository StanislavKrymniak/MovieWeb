import { createAction,ActionWithPayload,Action } from "../../utils/reducer/reducer.utils";
import { CHECKOUT_ACTION_TYPES } from "./checkout-movie.types";

export type SetSearchValue = ActionWithPayload<CHECKOUT_ACTION_TYPES.SET_SEARCH_VALUE, string>

export const setSearchValue = (searchValue: string): SetSearchValue => 
    createAction(CHECKOUT_ACTION_TYPES.SET_SEARCH_VALUE, searchValue)

export type ClearSearchValue = Action<CHECKOUT_ACTION_TYPES.CLEAR_SEARCH_VALUE> 

export const clearSearchValue = (): ClearSearchValue => 
    createAction(CHECKOUT_ACTION_TYPES.CLEAR_SEARCH_VALUE)