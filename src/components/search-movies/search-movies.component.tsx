import './search-movies.styles.scss'
import { useState, FormEvent, ChangeEvent} from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../store/checkout-movie/checkout-movie.action';
import { fetchMoviesStart } from '../../store/movies/movies.action';
import { setCurrentPage } from '../../store/pager/pager.action';

export const SearchMovies = () => {
    const dispatch = useDispatch() 
    const [inputValue, setInputValue] = useState('');
    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };


    const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Searching for:', inputValue);
        dispatch(setSearchValue(inputValue))
        dispatch(setCurrentPage(1))
        dispatch(fetchMoviesStart())
    };

    return (
        <div className='search_container'>
            <form className='search_form' onSubmit={onSubmitHandler}>
                <input
                    type="text"
                    value={inputValue} 
                    onChange={onInputChangeHandler}  
                    placeholder="Search for a movie..."  
                />
                <button type="submit" className='search_btn'>Search</button>
            </form>
        </div>
    );
};


export default SearchMovies;