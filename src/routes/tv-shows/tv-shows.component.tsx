import { useEffect } from 'react';
import './tv-shows.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTVShowsStart } from '../../store/movies/movies.action';
import { selectTvShowsList,selectMoviesIsloading } from '../../store/movies/movies.selector';
import SearchMovies from '../../components/search-movies/search-movies.component';
import GenresFilter from '../../components/genres-filter/genres-filter.component';
import Pagination from '../../components/pagination/pagination.component';
import TvShowsList from '../../components/tvshows-list/tv-shows-list.component';
import { MovieRouteParams } from '../movies-item/movies-item.component';
import { fetchWatchlistStart } from '../../store/watchlist/watchlist.action';
import { getCurrentUser } from '../../utils/firebase/firebase.utils';

export const TVShows = () => {
  const dispatch = useDispatch();
  const { category } = useParams<MovieRouteParams>();
  
  const tvShows = useSelector(selectTvShowsList);
  const isLoading = useSelector(selectMoviesIsloading);

  useEffect(() => {
    const loadUserAndData = async () => {
    const user = await getCurrentUser();
    if (user) {
      dispatch(fetchWatchlistStart()); 
    }
    dispatch(fetchTVShowsStart());
    }
    loadUserAndData();
  }, [dispatch]);

  if (isLoading) return <div>Loading TV Shows...</div>;

  return (
    <div className="tv-shows_container">
      <SearchMovies/>
      <GenresFilter type="tv"/>
      <h1 className="tv-shows_category_name">{category} tv shows</h1>
      <div className="tv-shows-list_container">
        {tvShows.length === 0 ? (
          <h1>There are no TV shows</h1>
        ) : (
          tvShows.map((show) => (
            <TvShowsList tvShow={show} key={show.id}/>
          ))
        )}
      </div>
      <Pagination type="tv"/>
    </div>
  );
};

export default TVShows;
