import {useEffect} from 'react'
import './movies.styles.scss'
import MoviesList from '../../components/movies-list/movies-list.component' 
import SearchMovies from '../../components/search-movies/search-movies.component'
import { useDispatch } from 'react-redux'
import { fetchMoviesStart } from '../../store/movies/movies.action'
import { useSelector } from 'react-redux'
import { selectMoviesList } from '../../store/movies/movies.selector'
import { MediaTypes } from '../../store/movies/movies.types'
import GenresFilter from '../../components/genres-filter/genres-filter.component'
import Pagination from '../../components/pagination/pagination.component'
import { MovieRouteParams } from '../movies-item/movies-item.component'
import { useParams } from 'react-router-dom'
import { setUrlMovie } from '../../store/fetchUrl/fetchUrl.action'
import { discover_Url } from '../../helper/keys'

export const Movies = () => {
  const {category} = useParams<MovieRouteParams>();
  const movieList = useSelector(selectMoviesList) as MediaTypes[];
  const dispatch = useDispatch()

  useEffect(() => {
    //dispatch(setUrlMovie(discover_Url))
    dispatch(fetchMoviesStart())
  },[dispatch])
    return (
        <div className='movies_container'>
            <SearchMovies/>
            <GenresFilter type="movie"/>
            <h1 className="movies_category_name">{category} movies</h1>
            <div className="movies-list_container">
              {
                movieList.length === 0 ? (
                  <h1>There is no movies</h1>
                ) : (
                  movieList.map((movie) => (
                    <MoviesList movie={movie} key={movie.id}/>
                ))
                )
              }
            </div>
            <Pagination type="movies"/>
        </div>
    )
}

export default Movies;
