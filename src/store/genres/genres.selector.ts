import { createSelector } from "reselect";
import { RootState } from "../store";
import { GenresState } from "./genres.reducer";

export const selectGenresReducer = (state: RootState): GenresState => state.genres

export const selectMovieGenres = createSelector(
    [selectGenresReducer],
    (GenresReducer) => GenresReducer.movieGenres || []
)
export const selectTVGenres = createSelector(
    [selectGenresReducer],
    (GenresReducer) => GenresReducer.tvGenres || []
)

export const selectSelectedGenres = createSelector(
    [selectGenresReducer],
    (GenresReducer) => GenresReducer.selectedGenres || []
)


export const hasFetchedMovieGenres = createSelector(
    [selectGenresReducer],
    (GenresReducer) => GenresReducer.hasFetchedMovieGenres
);

export const hasFetchedTVGenres = createSelector(
    [selectGenresReducer],
    (GenresReducer) => GenresReducer.hasFetchedTVGenres
);