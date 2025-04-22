import { takeLatest, put, call, all, select } from 'typed-redux-saga';
import { PEOPLE_ACTION_TYPES } from './people.types';
import { fetchPeopleSuccess, fetchPeopleFailed } from './people.action';
import { popularPeople_Url } from '../../helper/keys';
import { selectCurrentPage } from '../pager/pager.selector';

export function* fetchPeopleAsync() {
    try {
        const selectedPage:number = yield* select(selectCurrentPage)
        const url = `${popularPeople_Url}&page=${selectedPage}`;
        const response = yield* call(fetch, url);
        const people = yield* call([response, 'json']);
        console.log(people.results);
        yield* put(fetchPeopleSuccess(people.results));
    } catch (error) {
        yield* put(fetchPeopleFailed(error as Error));
    }
    }
export function* onFetchPeople() {
    yield* takeLatest(PEOPLE_ACTION_TYPES.FETCH_PEOPLE_START, fetchPeopleAsync);
}
export function* peopleSaga() {
    yield* all([call(onFetchPeople)]);
}