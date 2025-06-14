import { takeLatest,put,call,all,select } from "typed-redux-saga";
import { WATCHLIST_ACTION_TYPES } from "./watchlist.types";
import { addToWatchlistSuccess,addToWatchlistFailed,addToWatchlist,AddToWatchlist, RemoveFromWatchlist, fetchWatchlistSuccess, fetchWatchlistFailed} from "./watchlist.action";
import { selectMediaToAdd } from "./watchlist.selector";
import { MediaTypes } from "../movies/movies.types";
import { createWatchlistDocument, deleteWatchlistDocument, getCurrentUser, getWatchlistDocument } from "../../utils/firebase/firebase.utils";

export function* addToWatchlistSaga(action: AddToWatchlist) {
    try {
      const mediaToAdd = action.payload;
      const userAuth = yield* call(getCurrentUser);
      console.log('userAuth', userAuth)
      if (!userAuth) throw new Error('User not authenticated');
      if (userAuth && mediaToAdd) {
        console.log('user authenticated')
      yield* call(createWatchlistDocument, userAuth, mediaToAdd);
      console.log('watchlist created')
      yield* put(addToWatchlistSuccess(mediaToAdd));
      }
    } catch (error) {
        yield* put(addToWatchlistFailed(error as Error));
    }
}

export function* removeFromWatchlistSaga(action: RemoveFromWatchlist) {
    try {
      const userAuth = yield* call(getCurrentUser);
      const mediaToRemove = action.payload;
      if (!userAuth) throw new Error('User not authenticated');
      if (userAuth && mediaToRemove) {
        yield* call(deleteWatchlistDocument, userAuth, mediaToRemove);
        yield* put({
          type: WATCHLIST_ACTION_TYPES.REMOVE_FROM_WATCHLIST_SUCCESS,
          payload: mediaToRemove
        });
      }
    } catch (error) {
        console.error('Error removing from watchlist:', error);
    }
  
}


export function* fetchWatchlistSaga() {
  try {
    const user = yield* call(getCurrentUser);
    if (!user) throw new Error('User not authenticated');
    console.log('Fetching watchlist for user:', user.uid);
    const watchlist = yield* call(getWatchlistDocument, user.uid);
    console.log('Fetched watchlist:', watchlist);
    yield* put(fetchWatchlistSuccess(watchlist));
  } catch (error) {
    yield* put(fetchWatchlistFailed(error as Error));
  }
}


export function* onFetchWatchlistStart() {
  yield* takeLatest(WATCHLIST_ACTION_TYPES.FETCH_WATCHLIST_START, fetchWatchlistSaga)
}


export function* onAddToWatchlistStart() {
  yield* takeLatest(WATCHLIST_ACTION_TYPES.ADD_TO_WATCHLIST, addToWatchlistSaga);
}

export function* onRemoveFromWatchlistStart() {
  yield* takeLatest(WATCHLIST_ACTION_TYPES.REMOVE_FROM_WATCHLIST, removeFromWatchlistSaga);
} 

export function* watchlistSaga() {
  yield* all([call(onAddToWatchlistStart), call(onRemoveFromWatchlistStart), call(onFetchWatchlistStart)]);
}