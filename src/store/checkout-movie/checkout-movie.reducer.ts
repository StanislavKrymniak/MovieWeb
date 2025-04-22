import { AnyAction } from "redux-saga";
import { CHECKOUT_ACTION_TYPES } from "./checkout-movie.types";

export type CheckoutState = {
    readonly searchValue : string
}
export const CHECKOUT_INITIAL_STATE: CheckoutState = {
    searchValue: ''
}



export const checkoutReducer = (state = CHECKOUT_INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case CHECKOUT_ACTION_TYPES.SET_SEARCH_VALUE :
            return {
                ...state,
                searchValue: action.payload
            }
        case CHECKOUT_ACTION_TYPES.CLEAR_SEARCH_VALUE :
            return {
                ...state,
                searchValue: ''
            }
    }
    
    return state
}