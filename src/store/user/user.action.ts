import { createAction,withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
import { additionalInformation, UserData } from "../../utils/firebase/firebase.utils";
import { User, UserCredential } from "firebase/auth";

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>

export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email:string, password: string}>

export type SignInsucces = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCES, UserData>

export type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>

export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, {email: string, password: string, displayName: string}>

export type SignUpSucces = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCES, {user: User, additionalDetails: additionalInformation}>

export type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED, Error>

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>

export type SignOutSucces = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCES>

export type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>

export const checkUserSession = withMatcher(():CheckUserSession => 
    createAction(USER_ACTION_TYPES.CHECK_USER_SESSION))

export const googleSignInStart = withMatcher(():GoogleSignInStart => 
    createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START))

export const emailSignInStart = withMatcher((email: string, password: string):EmailSignInStart  => 
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password}))

export const signInSucces = withMatcher((user: UserData & {id: string}): SignInsucces => 
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCES, user))

export const signInFailed = withMatcher((error:Error) => 
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error))

export const signUpStart = withMatcher((email:string, password: string, displayName: string,): SignUpStart => 
    createAction(USER_ACTION_TYPES.SIGN_UP_START, {email, password, displayName,}))

export const signUpSucces = withMatcher((user: User, additionalDetails: additionalInformation):SignUpSucces => 
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCES, {user, additionalDetails}))

export const signUpFailed = withMatcher((error: Error) => 
    createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error))

export const signOutStart = withMatcher((): SignOutStart => 
    createAction(USER_ACTION_TYPES.SIGN_OUT_START))

export const signOutSucces = withMatcher((): SignOutSucces => 
    createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCES))

export const signOutFailed = withMatcher((error: Error): SignOutFailed => 
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error))