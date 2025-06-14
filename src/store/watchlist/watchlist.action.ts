import { createAction,withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { WATCHLIST_ACTION_TYPES,MediaToRemove } from "./watchlist.types";
import { MediaTypes } from "../movies/movies.types";
import exp from "constants";

export type AddToWatchlist = ActionWithPayload<WATCHLIST_ACTION_TYPES.ADD_TO_WATCHLIST, MediaTypes>;
export type AddToWatchlistSuccess = ActionWithPayload<WATCHLIST_ACTION_TYPES.ADD_TO_WATCHLIST_SUCCESS, MediaTypes>;
export type RemoveFromWatchlist = ActionWithPayload<WATCHLIST_ACTION_TYPES.REMOVE_FROM_WATCHLIST, MediaToRemove>;
export type RemoveFromWatchlistSuccess = ActionWithPayload<WATCHLIST_ACTION_TYPES.REMOVE_FROM_WATCHLIST_SUCCESS, MediaToRemove>;
export type RemoveFromWatchlistFailed = ActionWithPayload<WATCHLIST_ACTION_TYPES.REMOVE_FROM_WATCHLIST_FAILED, Error>;
export type AddToWatchlistFailed = ActionWithPayload<WATCHLIST_ACTION_TYPES.ADD_TO_WATCHLIST_FAILED, Error>;
export type FetchWatchlistStart = Action<WATCHLIST_ACTION_TYPES.FETCH_WATCHLIST_START>;
export type FetchWatchlistSuccess = ActionWithPayload<WATCHLIST_ACTION_TYPES.FETCH_WATCHLIST_SUCCESS, MediaTypes[]>;
export type FetchWatchlistFailed = ActionWithPayload<WATCHLIST_ACTION_TYPES.FETCH_WATCHLIST_FAILED, Error>;
export type ClearWatchlist = Action<WATCHLIST_ACTION_TYPES.CLEAR_WATCHLIST>;


export const addToWatchlist = withMatcher((media: MediaTypes): AddToWatchlist => 
    createAction(WATCHLIST_ACTION_TYPES.ADD_TO_WATCHLIST, media))

export const addToWatchlistSuccess = withMatcher((media: MediaTypes) =>
  createAction(WATCHLIST_ACTION_TYPES.ADD_TO_WATCHLIST_SUCCESS, media)
);

export const removeFromWatchlist = withMatcher((MediaToRemove: MediaToRemove): RemoveFromWatchlist =>
    createAction(WATCHLIST_ACTION_TYPES.REMOVE_FROM_WATCHLIST, MediaToRemove))

export const removeFromWatchlistSuccess = withMatcher((MediaToRemove: MediaToRemove): RemoveFromWatchlistSuccess =>
    createAction(WATCHLIST_ACTION_TYPES.REMOVE_FROM_WATCHLIST_SUCCESS, MediaToRemove))

export const removeFromWatchlistFailed = withMatcher((error: Error): RemoveFromWatchlistFailed =>
    createAction(WATCHLIST_ACTION_TYPES.REMOVE_FROM_WATCHLIST_FAILED, error))

export const addToWatchlistFailed = withMatcher((error: Error): AddToWatchlistFailed => 
    createAction(WATCHLIST_ACTION_TYPES.ADD_TO_WATCHLIST_FAILED, error))

export const fetchWatchlistStart = withMatcher((): FetchWatchlistStart =>
    createAction(WATCHLIST_ACTION_TYPES.FETCH_WATCHLIST_START))

export const fetchWatchlistSuccess = withMatcher((watchlist: MediaTypes[]): FetchWatchlistSuccess =>
    createAction(WATCHLIST_ACTION_TYPES.FETCH_WATCHLIST_SUCCESS, watchlist))

export const fetchWatchlistFailed = withMatcher((error: Error): FetchWatchlistFailed =>
    createAction(WATCHLIST_ACTION_TYPES.FETCH_WATCHLIST_FAILED, error))

export const clearWatchlist = withMatcher((): ClearWatchlist =>
    createAction(WATCHLIST_ACTION_TYPES.CLEAR_WATCHLIST));