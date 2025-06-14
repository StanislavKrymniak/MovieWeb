import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieRouteParams } from '../movies-item/movies-item.component';
import { MediaTypes } from '../../store/movies/movies.types';
import { api_Key } from '../../helper/keys';
import WatchlistButton from '../../components/watchlist-button/watchilst-button.component';

export const TVShowItem = () => {
   const { TvId } = useParams<MovieRouteParams>();
    const [tvDetails, setTvDetails] = useState<MediaTypes | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    console.log(TvId);
    useEffect(() => {
      if (!TvId) return;
      const fetchMovieDetails = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`https://api.themoviedb.org/3/tv/${TvId}?${api_Key}`)
          console.log(response)
          if (!response.ok) throw new Error('Failed to fetch movie details');
          const data: MediaTypes = await response.json();
          console.log(data);
          setTvDetails(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMovieDetails();
    }, []);
  
    console.log(tvDetails);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  return (
    <div className="movie-item-container">
      {tvDetails && (
        <>
          <div className="movie-item-body">
          <WatchlistButton media={tvDetails}/>
              <img 
                className="movie-item-poster" 
                src={`https://image.tmdb.org/t/p/w500${tvDetails.poster_path ?? ''}`} 
                alt={tvDetails.name ?? 'No title'} 
              />
          </div>
          <div className="movie-item-details">
            <h1>{tvDetails.name ?? 'No title available'}</h1>
            <p>{tvDetails.overview ?? 'No description available'}</p>
            <p><strong>Release Date:</strong> {tvDetails.first_air_date ?? 'Unknown'}</p>
            <p>
              <strong>Genres:</strong> {tvDetails.genres?.map((genre) => genre.name).join(', ') || 'N/A'}
            </p>
            <div className="movie-rating">
              {`Rating: ${tvDetails.vote_average?.toFixed(1) || 'N/A'}`}
              <span className="rating-icon">⭐</span>
            </div>
          </div>
    </>
      )}
  </div>
  );
};

export default TVShowItem;
