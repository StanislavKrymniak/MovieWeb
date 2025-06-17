import './navigation.styles.scss';
import { Link, Outlet } from 'react-router-dom';
import NavigationBar from '../../components/navigation-bar/navigation-bar.component';
import { discover_Url } from '../../helper/keys';
import { setUrlMovie } from '../../store/fetchUrl/fetchUrl.action';
import { clearSearchValue } from '../../store/checkout-movie/checkout-movie.action';
import { setCurrentPage } from '../../store/pager/pager.action';
import { fetchMoviesStart } from '../../store/movies/movies.action';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signOutStart } from '../../store/user/user.action';
import { clearWatchlist } from '../../store/watchlist/watchlist.action';


export const Navigation = () => {
    const dispatch = useDispatch()
    const onMoviesClickHandler = (urlValue: string) => {
        dispatch(setUrlMovie(urlValue))
        dispatch(clearSearchValue());
        dispatch(setCurrentPage(1));
        dispatch(fetchMoviesStart());
    }
    
    const currentUser = useSelector(selectCurrentUser) 
    const signOutHandler = () => {
        dispatch(signOutStart())
        dispatch(clearWatchlist())
    }
    return (
        <div className="navigation_body">
            <div className='navigation_container'>
                <Link to="/movies/popular" onClick={() => onMoviesClickHandler(discover_Url)} className='navigation-logo'>Cinema City</Link>
                <div className="navigation_menu">
                    <NavigationBar/>
                    {
              currentUser ? (
                
                  <div className="navigation_sign-out" onClick={signOutHandler}>Sign-Out</div>
                
                ) : (
                    
                    <div className="navigation_sign-in"><Link to='/sign-in'>Sign-In</Link></div>
                )
                }
                </div>
            </div>
            <Outlet/>
        </div>
        
    )
}


export default Navigation;