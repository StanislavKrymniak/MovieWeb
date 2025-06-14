import { AnyAction } from 'redux-saga';
import { WATCHLIST_ACTION_TYPES} from './watchlist.types';
import { MediaTypes } from '../movies/movies.types';

export type WatchlistState = {
    readonly watchlist: MediaTypes[];
    readonly mediaToAdd: MediaTypes | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const WATCHLIST_INITIAL_STATE: WatchlistState = {
    mediaToAdd: null,
    watchlist: [],
    isLoading: false, 
    error: null,
};

export const watchlistReducer = (state = WATCHLIST_INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case WATCHLIST_ACTION_TYPES.ADD_TO_WATCHLIST:
      return { ...state, isLoading: false, mediaToAdd: action.payload };
    case WATCHLIST_ACTION_TYPES.ADD_TO_WATCHLIST_SUCCESS:
      const isAlreadyInWatchlist = state.watchlist.some(
      (item) => item.id === action.payload.id && item.media_type === action.payload.media_type);

      if (isAlreadyInWatchlist) return {
        ...state,
        mediatoAdd: null
      }
      return {
        ...state,
        watchlist: [...state.watchlist, action.payload],
        mediaToAdd: null,
        isLoading: false,
      };
    case WATCHLIST_ACTION_TYPES.REMOVE_FROM_WATCHLIST:
      return { ...state, isLoading: false};
    case WATCHLIST_ACTION_TYPES.REMOVE_FROM_WATCHLIST_SUCCESS:
      return { ...state,
        isLoading: false,
        watchlist: state.watchlist.filter(item => item.id !== action.payload.id || item.media_type !== action.payload.media_type),
        mediaToRemove: null,
      }
    case WATCHLIST_ACTION_TYPES.REMOVE_FROM_WATCHLIST_FAILED:
      return { ...state, isLoading: false, error: action.payload };
    case WATCHLIST_ACTION_TYPES.ADD_TO_WATCHLIST_FAILED:
      return { ...state, isLoading: false, error: action.payload };
    case WATCHLIST_ACTION_TYPES.FETCH_WATCHLIST_START:
      return { ...state, isLoading: true, error: null };
    case WATCHLIST_ACTION_TYPES.FETCH_WATCHLIST_SUCCESS:
      return { ...state, watchlist: action.payload, isLoading: false, error: null };
    case WATCHLIST_ACTION_TYPES.FETCH_WATCHLIST_FAILED:
      return { ...state, isLoading: false, error: action.payload };
    case WATCHLIST_ACTION_TYPES.CLEAR_WATCHLIST:
      return { ...state, watchlist: [], isLoading: false, error: null };
    default:
      return state;
  }
};

