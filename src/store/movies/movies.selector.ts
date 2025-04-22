import { createSelector } from "reselect";
import { MoviesState } from "./movies.reducer";
import { RootState } from "../store";

const selectMovieReducer = (state: RootState): MoviesState => state.movies


export const selectMoviesList = createSelector(
    [selectMovieReducer],
    (movies) => movies.moviesList
)

export const selectTvShowsList = createSelector(
    [selectMovieReducer],
    (movies) => movies.tvShowsList
)

export const selectMoviesIsloading = createSelector(
    [selectMovieReducer],
    (movies) => movies.isLoading
)

export const selectTotalPages = createSelector(
    [selectMovieReducer],
    (movies) => movies.totalPages
)