import { RootState } from "../store";
import { UserState } from "./user.reducer";
import { createSelector } from "reselect";

export const selectUserReducer = (state: RootState): UserState => state.user

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (user) => user.currentUser
)

export const selectIsLoading = createSelector(
    [selectUserReducer],
    (user) => user.isLoading
)
export const selectUserError = createSelector(
    [selectUserReducer],
    (user) => user.error
)