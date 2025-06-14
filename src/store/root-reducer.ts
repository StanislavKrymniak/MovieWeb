import { combineReducers } from 'redux';
import { checkoutReducer } from './checkout-movie/checkout-movie.reducer';
import { moviesReducer } from './movies/movies.reducer';
import { genresReducer } from './genres/genres.reducer';
import {pagerReducer} from './pager/pager.reducer';
import { fetchUrlReducer } from './fetchUrl/fetchUrl.reducer';
import { peopleReducer } from './people/people.reducer';
import { userReducer } from './user/user.reducer';
import { watchlistReducer } from './watchlist/watchlist.reducer';

export const rootReducer = combineReducers({
    checkoutMovie: checkoutReducer,
    movies: moviesReducer,
    genres: genresReducer,
    pager: pagerReducer,
    fetchUrl: fetchUrlReducer,
    people: peopleReducer,
    user: userReducer,
    watchlist: watchlistReducer,
});
