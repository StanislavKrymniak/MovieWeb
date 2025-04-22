import { AnyAction } from "redux-saga";
import { UserData } from "../../utils/firebase/firebase.utils";
import { signInFailed, signInSucces, signOutFailed, signOutSucces, signUpFailed } from "./user.action";

export type UserState = {
    readonly currentUser: UserData | null
    readonly isLoading: boolean
    readonly error: Error | null
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const userReducer = (state=INITIAL_STATE, action: AnyAction) => {
    if(signInSucces.match(action)) {
        return {
            ...state,
            currentUser: action.payload
        }
    }
    if(signOutSucces.match(action)) {
        return{...state, currentUser: null}
    }
    if(signOutFailed.match(action) || signUpFailed.match(action) || signInFailed.match(action)) {
        return {...state, error: action.payload}  
    }

    return state
}