import { MediaTypes  } from '../../store/movies/movies.types';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import './tv-shows-list.styles.scss';

type MoviesListProps = {
    tvShow: MediaTypes;
};

export const TvShowsList: FC<MoviesListProps> = ({tvShow}) => {

  return (
    <div className="tv-shows-list_body">
      <Link to={`/tv/${tvShow.id}`}>
        <div className="tv-shows-item-wrapper">
          <img
            className="tv-shows-list_img"
            src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
            alt={tvShow.name}
          />
          <div className="tv-shows-rating-overlay">
            {tvShow.vote_average ? `⭐ ${tvShow.vote_average.toFixed(1)}` : 'No Rating'}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TvShowsList;
