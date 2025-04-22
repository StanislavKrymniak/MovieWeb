import { createSelector } from "reselect";
import { PeopleState } from "./people.reducer";
import { RootState } from "../store";

const selectPeopleReducer = (state: RootState): PeopleState => state.people;


export const selectPeopleList = createSelector(
    [selectPeopleReducer],
    (people) => people.PeopleList
)

export const selectPeopleISLoading = createSelector(
    [selectPeopleReducer],
    (people) => people.isLoading
)

export const selectPeopleError = createSelector(
    [selectPeopleReducer],
    (people) => people.error
)