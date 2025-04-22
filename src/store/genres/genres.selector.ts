import { createSelector } from "reselect";
import { RootState } from "../store";
import { GenresState } from "./genres.reducer";

export const selectGenresReducer = (state: RootState): GenresState => state.genres

export const selectGenres = createSelector(
    [selectGenresReducer],
    (GenresReducer) => GenresReducer.genres || []
)

export const selectSelectedGenres = createSelector(
    [selectGenresReducer],
    (GenresReducer) => GenresReducer.selectedGenres || []
)