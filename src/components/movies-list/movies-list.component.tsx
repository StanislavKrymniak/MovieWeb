import './movies-list.styles.scss';
import { MediaTypes  } from '../../store/movies/movies.types';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import WatchlistButton from '../watchlist-button/watchilst-button.component';
import '../watchlist-button/watchlist-button.styles.scss';
type MoviesListProps = {
  movie: MediaTypes; 
};

export const MoviesList: FC<MoviesListProps> = ({movie}) => {
  return (
    <div className="movies-list_body">

        <div className="movie-item-wrapper">
          <WatchlistButton media={movie}/>
          <Link to={`/movie/${movie.id}`}>
            <img
              className="movies-list_img"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-rating-overlay">
              {movie.vote_average ? `⭐ ${movie.vote_average.toFixed(1)}` : 'No Rating'}
            </div>
            </Link>
        </div>
    </div>
  );
};

export default MoviesList;
