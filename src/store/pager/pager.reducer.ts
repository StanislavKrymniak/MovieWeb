import { AnyAction } from "redux-saga";
import { PAGER_ACTION_TYPES } from "./pager.types";

export type PagerState = {
   readonly currentPage: number
}
export const PAGER_INITIAL_STATE: PagerState = {
    currentPage: 1
}



export const pagerReducer = (state = PAGER_INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case PAGER_ACTION_TYPES.SET_CURRENT_PAGE :
            return {
                ...state,
                currentPage: action.payload
            }
    }
    
    return state;
}