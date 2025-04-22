import './movies-list.styles.scss';
import { MediaTypes  } from '../../store/movies/movies.types';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type MoviesListProps = {
  movie: MediaTypes; 
};

export const MoviesList: FC<MoviesListProps> = ({movie}) => {
  return (
    <div className="movies-list_body">
      <Link to={`/movie/${movie.id}`}>
        <div className="movie-item-wrapper">
          <img
            className="movies-list_img"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-rating-overlay">
            {movie.vote_average ? `⭐ ${movie.vote_average.toFixed(1)}` : 'No Rating'}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MoviesList;
