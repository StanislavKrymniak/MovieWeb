import { createSelector } from "reselect";
import { RootState } from "../store";
import { PagerState } from "./pager.reducer";

const selectPagerReducer = (state: RootState): PagerState => state.pager 

export const selectCurrentPage = createSelector(
    [selectPagerReducer],
    (pager) => pager.currentPage
)