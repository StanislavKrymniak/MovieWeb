export enum WATCHLIST_ACTION_TYPES {
    ADD_TO_WATCHLIST = 'watchlist/ADD_TO_WATCHLIST',
    ADD_TO_WATCHLIST_SUCCESS = 'watchlist/ADD_TO_WATCHLIST_SUCCESS',
    REMOVE_FROM_WATCHLIST = 'watchlist/REMOVE_FROM_WATCHLIST',
    REMOVE_FROM_WATCHLIST_SUCCESS = 'watchlist/REMOVE_FROM_WATCHLIST_SUCCESS',
    ADD_TO_WATCHLIST_FAILED = 'watchlist/ADD_TO_WATCHLIST_FAILED',
    REMOVE_FROM_WATCHLIST_FAILED = 'watchlist/REMOVE_FROM_WATCHLIST_FAILED',
    FETCH_WATCHLIST_START = 'watchlist/FETCH_WATCHLIST_START',
    FETCH_WATCHLIST_SUCCESS = 'watchlist/FETCH_WATCHLIST_SUCCESS',
    FETCH_WATCHLIST_FAILED = 'watchlist/FETCH_WATCHLIST_FAILED',
    CLEAR_WATCHLIST = 'watchlist/CLEAR_WATCHLIST',
}
/*
export type WatchlistType = {
    id: number;
    title: string;
    poster_path: string;
    media_type: "movie" | "tv";
    release_date?: string;
}*/

export type MediaToRemove = {
    id: number;
    media_type: "movie" | "tv";
}