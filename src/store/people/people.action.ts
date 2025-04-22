import { createAction,Action,ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { PEOPLE_ACTION_TYPES,PeopleTypes } from "./people.types";

export type FetchPeopleStart = Action<PEOPLE_ACTION_TYPES.FETCH_PEOPLE_START>

export type FetchPeopleSuccess = ActionWithPayload<PEOPLE_ACTION_TYPES.FETCH_PEOPLE_SUCCESS, PeopleTypes[]>

export type FetchPeopleFailed = ActionWithPayload<PEOPLE_ACTION_TYPES.FETCH_PEOPLE_FAILED, Error>

export const fetchPeopleStart = (): FetchPeopleStart => 
    createAction(PEOPLE_ACTION_TYPES.FETCH_PEOPLE_START)

export const fetchPeopleSuccess = (PeopleList: PeopleTypes[]): FetchPeopleSuccess => 
    createAction(PEOPLE_ACTION_TYPES.FETCH_PEOPLE_SUCCESS, PeopleList)

export const fetchPeopleFailed = (error: Error): FetchPeopleFailed =>
    createAction(PEOPLE_ACTION_TYPES.FETCH_PEOPLE_FAILED, error)