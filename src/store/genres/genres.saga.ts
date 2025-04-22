import { takeLatest,put,call,all } from "typed-redux-saga";
import { Genres, GENRES_ACTION_TYPES } from "./genres.types";
import { fetchGenresSuccess,fetchGenresFailed } from "./genres.action";
import { genresMovie_Url,genresTV_Url } from "../../helper/keys";

const fetchGenres = async (): Promise<Genres[]> => {
    const response = await fetch(genresMovie_Url)
    const data = await response.json()
    return data.genres
}
const fetchTVGenres = async (): Promise<Genres[]> => {
    const response = await fetch(genresTV_Url)
    const data = await response.json()
    return data.genres
}



export function* fetchGenresAsync (type: "movie" | "tv") {
    if (type === "movie") {
        try {
            const genres = yield* call(fetchGenres)

            yield* put(fetchGenresSuccess(genres))
        } catch (error) {
            yield* put(fetchGenresFailed(error as Error))
        }
    } else if (type === "tv") {
        try {
            const genres = yield* call(fetchTVGenres)

            yield* put(fetchGenresSuccess(genres))
        } catch (error) {
            yield* put(fetchGenresFailed(error as Error))
        }
    }
    
}

export function* onFetchMovieGenres() {
    yield* takeLatest(GENRES_ACTION_TYPES.FETCH_MOVIE_GENRES_START, function* () {
        yield* fetchGenresAsync("movie");
    });
}

export function* onFetchTVGenres() {
    yield* takeLatest(GENRES_ACTION_TYPES.FETCH_TV_GENRES_START, function* () {
        yield* fetchGenresAsync("tv");
    });
}


export function* genresSaga () {
    yield* all([call(onFetchMovieGenres),call(onFetchTVGenres)])
}