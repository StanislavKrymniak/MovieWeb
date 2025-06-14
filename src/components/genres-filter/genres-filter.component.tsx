import { useDispatch, useSelector } from 'react-redux';
import { useEffect, FC } from 'react';
import { fetchMovieGenresStart,fetchTVGenresStart, setSelectedGenres } from '../../store/genres/genres.action';
import { selectMovieGenres,selectTVGenres, selectSelectedGenres,hasFetchedMovieGenres, hasFetchedTVGenres } from '../../store/genres/genres.selector';
import { Genres } from '../../store/genres/genres.types';
import './genres-filter.styles.scss';
import { fetchMoviesStart,fetchTVShowsStart } from '../../store/movies/movies.action';
import { setCurrentPage } from '../../store/pager/pager.action';

type GenresFilterProps = {
  type: string
}

const GenresFilter: FC<GenresFilterProps> = ({type}) => {
  const dispatch = useDispatch();
  const isFetchedMovieGenres = useSelector(hasFetchedMovieGenres)
  const isFetchedTVGenres = useSelector(hasFetchedTVGenres)
  useEffect(() => {
    if (type === 'movie' && !isFetchedMovieGenres) {
      
        dispatch(fetchMovieGenresStart());
    } else if (type === 'tv' && !isFetchedTVGenres) {
        dispatch(fetchTVGenresStart());
    }
  }, [dispatch,type]);
  
  const genres = useSelector(type === 'movie' ? selectMovieGenres : selectTVGenres);
  const selectedGenres = useSelector(selectSelectedGenres) as number[];



  const onChangeHandler = (genreId: number) => {
    if (type === 'movie') { 
      dispatch(setSelectedGenres(genreId));
      dispatch(setCurrentPage(1))
      dispatch(fetchMoviesStart());
    } else if (type === 'tv') {
      dispatch(setSelectedGenres(genreId));
      dispatch(setCurrentPage(1))
      dispatch(fetchTVShowsStart());
    }
  };

  return (
    <div className="genres-filter-container">
      {genres.map((genre) => (
        <div className="genre-item" key={genre.id}>
          <input
            type="checkbox"
            id={`genre-${genre.id}`}
            value={genre.id}
            checked={selectedGenres.includes(genre.id)}
            onChange={() => onChangeHandler(genre.id)}
          />
          <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
        </div>
      ))}
    </div>
  );
};

export default GenresFilter;




