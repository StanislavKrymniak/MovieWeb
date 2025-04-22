export enum PEOPLE_ACTION_TYPES {
    FETCH_PEOPLE_START = 'people/FETCH_PEOPLE_START',
    FETCH_PEOPLE_SUCCESS = 'people/FETCH_PEOPLE_SUCCESS',
    FETCH_PEOPLE_FAILED = 'people/FETCH_PEOPLE_FAILED'
}

export type movieType = {
    backdrop_path: string
    first_air_date: string
    genre_ids: number[]
    id: number
    title: string
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string   
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
}

export type PeopleTypes = {
    id: number,
    gender: number,
    name: string,
    original_name: string,
    profile_path: string,
    biography: string,
    known_for_department: string,
    known_for: movieType[],
    also_known_as: string[],
    place_of_birth: string,
    birthday: string,
    deathday: string,
}
