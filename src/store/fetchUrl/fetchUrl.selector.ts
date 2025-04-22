import { createSelector } from "reselect";
import { RootState } from "../store";
import { FetchUrlState } from "./fetchUrl.reducer";

const selectFetchUrlReducer = (state: RootState): FetchUrlState => state.fetchUrl

export const selectUrlMovie = createSelector(
    [selectFetchUrlReducer],
    (fetchUrlReducer) => fetchUrlReducer.urlMovie
)

export const selectUrlTV = createSelector(
    [selectFetchUrlReducer],
    (fetchUrlReducer) => fetchUrlReducer.urlTV
)