import './navigation-bar.styles.scss';
import { setUrlMovie, setUrlTV } from '../../store/fetchUrl/fetchUrl.action';
import { useDispatch } from 'react-redux';
import { upcomingMovies_url,top_ratedMovies_url, popularTV_Url, airing_todayTV_Url, top_rated_TV_Url,discover_Url } from '../../helper/keys';
import { fetchMoviesStart, fetchTVShowsStart } from '../../store/movies/movies.action';
import { setCurrentPage} from '../../store/pager/pager.action';
import { fetchPeopleStart } from '../../store/people/people.action';
import { Link, useNavigate } from 'react-router-dom';
import { clearSearchValue } from '../../store/checkout-movie/checkout-movie.action';

export const NavigationBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const onTVClickHandler = (urlValue: string) => {
        dispatch(setUrlTV(urlValue))
        dispatch(clearSearchValue());
        dispatch(setCurrentPage(1));
        dispatch(fetchTVShowsStart())
        
    }
    const onMoviesClickHandler = (urlValue: string) => {
        dispatch(setUrlMovie(urlValue))
        dispatch(clearSearchValue());
        dispatch(setCurrentPage(1));
        dispatch(fetchMoviesStart())
    }
    const onPeopleClickHandler = () => {
        dispatch(fetchPeopleStart()); 
        navigate('/people'); 
    }

    return (
        <div className='navigation-bar_container'>
            <div className='navigation-item'>
                <span>Movies</span>
                <div className='dropdown'>
                    <Link  to="/movies/popular" onClick={()=> onMoviesClickHandler(discover_Url)}>Popular</Link>
                    <Link  to="/movies/top-rated"onClick={()=> onMoviesClickHandler(top_ratedMovies_url)}>Top Rated</Link>
                    <Link to="/movies/upcoming"onClick={()=> onMoviesClickHandler(upcomingMovies_url)}>Upcoming</Link>
                </div>
            </div>
            <div className='navigation-item'>
                <span>TV Shows</span>
                <div className='dropdown'>
                    <Link to="/tvs/popular" onClick={()=> onTVClickHandler(popularTV_Url)}>Popular</Link>
                    <Link  to="/tvs/top-rated"onClick={()=> onTVClickHandler(top_rated_TV_Url)}>Top Rated</Link>
                    <Link to="/tvs/airing-today" onClick={()=> onTVClickHandler(airing_todayTV_Url)}>Airing Today</Link>
                </div>
            </div>
            <div className='navigation-item'>
                <span>People</span>
                <div className='dropdown'>
                    <button onClick={()=> onPeopleClickHandler()}>Popular People</button>
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
