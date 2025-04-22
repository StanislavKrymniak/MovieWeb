export const api_Key = 'api_key=eaa086c699a385694b24dc286f884c4d'
export const base_Url = 'https://api.themoviedb.org/3'
export const search_Url = base_Url + '/search/movie?' + api_Key + '&query='
export const genresMovie_Url = base_Url + '/genre/movie/list?language=en&' + api_Key
export const genresTV_Url = base_Url + '/genre/tv/list?language=en&' + api_Key
const currentDate = new Date().toISOString().split("T")[0];

export const discover_Url = base_Url + '/discover/movie?sort_by=popularity.desc&' + api_Key 
export const popularMovies_Url = base_Url + '/movie/popular?language=en-US&' + api_Key
export const top_ratedMovies_url = base_Url + '/discover/movie?language=en-US&sort_by=vote_average.desc&vote_count.gte=500&' + api_Key
export const upcomingMovies_url = base_Url + `/discover/movie?language=en-US&sort_by=popularity.desc&primary_release_date.gte=${currentDate}&` + api_Key

export const airing_todayTV_Url = base_Url + `/discover/tv?language=en-US&sort_by=popularity.desc&primary_release_date.gte=${currentDate}&` + api_Key
export const popularTV_Url = base_Url + '/discover/tv?language=en-US&sort_by=popularity.desc&' + api_Key
export const top_rated_TV_Url = base_Url + '/discover/tv?language=en-US&sort_by=vote_average.desc&vote_count.gte=500&' + api_Key

export const popularPeople_Url = base_Url + '/person/popular?language=en-US&' + api_Key

//https://api.themoviedb.org/3/discover/movie?language=en-US&api_key=YOUR_API_KEY&sort_by=vote_average.desc&page=1&with_genres=16&vote_count.gte=500
//




