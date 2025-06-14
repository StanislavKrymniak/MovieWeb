import {createSelector} from 'reselect';
import { WatchlistState } from './watchlist.reducer';
import { RootState } from '../store';


export const selectWatchlistReducer = (state: RootState): WatchlistState => state.watchlist;


export const selectMediaToAdd = createSelector(
    [selectWatchlistReducer],
    (watchlist) => watchlist.mediaToAdd
); 
export const selectWatchlist = createSelector(
    [selectWatchlistReducer],
    (watchlist) => watchlist.watchlist
);