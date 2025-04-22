import { takeLatest,put,call,all,select } from "typed-redux-saga";
import { MEDIA_ACTION_TYPES } from "./movies.types";
import { selectSearchValue } from "../checkout-movie/checkout-movie.selector";
import { fetchMoviesSuccess,fetchMediaFailed,fetchTotalPages,fetchTVShowsSuccess } from "./movies.action";
import { search_Url,discover_Url } from "../../helper/keys";
import { selectSelectedGenres } from "../genres/genres.selector";
import { selectCurrentPage } from "../pager/pager.selector";
import { setCurrentPage } from "../pager/pager.action";
import { selectTotalPages } from "./movies.selector";
import { buildMovieFetchURL,buildTVFetchURL } from "../../utils/fetch_api/fetch_api";
import { selectUrlMovie,selectUrlTV } from "../fetchUrl/fetchUrl.selector";

export function* fetchMediaAsync () {
    try {
        const urlMovie: string = yield* select(selectUrlMovie);
        const searchValue: string = yield* select(selectSearchValue);
        const selectedGenres: number[] = yield* select(selectSelectedGenres);
        const selectedPage:number = yield* select(selectCurrentPage)
        const totalPages:number = yield* select(selectTotalPages)
        if (selectedPage > totalPages) {
            yield* put(setCurrentPage(1));
        }
        console.log(urlMovie)
        const url = buildMovieFetchURL(searchValue,search_Url,discover_Url,selectedGenres,selectedPage,urlMovie)
        const response = yield* call(fetch, url);
        console.log(url)
        
        const media = yield* call([response, 'json']);
        console.log(media)
        const safeTotalPages = Math.min(media.total_pages, 500);
        yield* put(fetchMoviesSuccess(media.results));
        yield* put(fetchTotalPages(safeTotalPages));
    } catch (error) {
        yield* put(fetchMediaFailed(error as Error))
    }
}

export function* fetchMediaAsyncTV () {
    try {
        const urlTV: string = yield* select(selectUrlTV);
        const searchValue: string = yield* select(selectSearchValue);
        const selectedGenres: number[] = yield* select(selectSelectedGenres);
        const selectedPage:number = yield* select(selectCurrentPage)
        const totalPages:number = yield* select(selectTotalPages)
        if (selectedPage > totalPages) {
            yield* put(setCurrentPage(1));
        }
        console.log(urlTV)
        const url = buildTVFetchURL(searchValue,search_Url,selectedGenres,selectedPage,urlTV)
        const response = yield* call(fetch, url);
        console.log(url)
        
        const media = yield* call([response, 'json']);
        console.log(media)
        const safeTotalPages = Math.min(media.total_pages, 500);
        yield* put(fetchTVShowsSuccess(media.results));
        yield* put(fetchTotalPages(safeTotalPages));
    } catch (error) {
        yield* put(fetchMediaFailed(error as Error))
    }
}

export function* onFetchMovies() {
    yield* takeLatest(MEDIA_ACTION_TYPES.FETCH_MOVIES_START, () => fetchMediaAsync());
}

export function* onFetchTVShows() {
    yield* takeLatest(MEDIA_ACTION_TYPES.FETCH_TV_SHOWS_START, () => fetchMediaAsyncTV());
}

export function* mediaSaga() {
    yield* all([call(onFetchMovies), call(onFetchTVShows)]);
}