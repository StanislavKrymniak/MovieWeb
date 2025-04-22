import { AnyAction } from 'redux-saga';
import { PEOPLE_ACTION_TYPES,PeopleTypes} from './people.types';

export type PeopleState = {
    readonly PeopleList: PeopleTypes[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const PEOPLE_INITIAL_STATE = {
  PeopleList: [],
  isLoading: false,
  error: null,
};

export const peopleReducer = (state = PEOPLE_INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case PEOPLE_ACTION_TYPES.FETCH_PEOPLE_START:
      return { ...state, isLoading: true };
    case PEOPLE_ACTION_TYPES.FETCH_PEOPLE_SUCCESS:
      return { ...state, isLoading: false, PeopleList: action.payload };
    case PEOPLE_ACTION_TYPES.FETCH_PEOPLE_FAILED:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
