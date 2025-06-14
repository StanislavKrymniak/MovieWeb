import { MediaTypes  } from '../../store/movies/movies.types';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import './tv-shows-list.styles.scss';
import WatchlistButton from '../watchlist-button/watchilst-button.component';
import '../watchlist-button/watchlist-button.styles.scss';

type MoviesListProps = {
    tvShow: MediaTypes;
};

export const TvShowsList: FC<MoviesListProps> = ({tvShow}) => {

  return (
    <div className="tv-shows-list_body">
      
        <div className="tv-shows-item-wrapper">
        <WatchlistButton media={tvShow}/>
        <Link to={`/tv/${tvShow.id}`}>
            <img
              className="tv-shows-list_img"
              src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
              alt={tvShow.name}
            />
            <div className="tv-shows-rating-overlay">
              {tvShow.vote_average ? `⭐ ${tvShow.vote_average.toFixed(1)}` : 'No Rating'}
            </div>
          </Link>
        </div>
    </div>
  );
};

export default TvShowsList;
