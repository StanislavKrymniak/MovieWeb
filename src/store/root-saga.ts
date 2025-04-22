import {all, call} from 'typed-redux-saga/macro'
import { mediaSaga } from './movies/movies.saga';
import { genresSaga } from './genres/genres.saga';
import {peopleSaga} from './people/people.saga'
import { userSagas } from './user/user.saga';

export function* rootSaga() {
    yield* all([call(mediaSaga), call(genresSaga), call(peopleSaga), call(userSagas)]);
}