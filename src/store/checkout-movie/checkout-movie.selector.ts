import { createSelector } from "reselect";
import { RootState } from "../store";
import { CheckoutState } from "./checkout-movie.reducer";

const selectCheckoutMovieReducer = (state: RootState): CheckoutState => state.checkoutMovie

export const selectSearchValue = createSelector(
    [selectCheckoutMovieReducer],
    (checkoutMovie) => checkoutMovie.searchValue
)