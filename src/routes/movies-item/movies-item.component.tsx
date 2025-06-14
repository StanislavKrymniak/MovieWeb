import './movies-item.styles.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api_Key } from '../../helper/keys';
import { MediaTypes } from '../../store/movies/movies.types';
import WatchlistButton from '../../components/watchlist-button/watchilst-button.component';
export type MovieRouteParams = {
  movieId: string;
  TvId: string;
  category: string;
};

export type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genres: { id: number; name: string }[];
  vote_average: number;
};

const MoviesItem = () => {
  const { movieId } = useParams<MovieRouteParams>();
  const [movieDetails, setMovieDetails] = useState<MediaTypes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(movieId);
  useEffect(() => {
    if (!movieId) return;
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?${api_Key}`);
        if (!response.ok) throw new Error('Failed to fetch movie details');
        const data: MediaTypes = await response.json();
        setMovieDetails(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="movie-item-container">
      {movieDetails && (
        <>
          <div className="movie-item-body">
            <WatchlistButton media={movieDetails}/>
            <img
              className="movie-item-poster"
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          </div>
          
          <div className="movie-item-details">
            <h1>{movieDetails.title}</h1>
            <p>{movieDetails.overview}</p>
            <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
            <p><strong>Genres:</strong> {movieDetails.genres.map((genre) => genre.name).join(', ')}</p>
            <div className="movie-rating">
              {`Rating: ${movieDetails.vote_average.toFixed(1)}`}
              <span className="rating-icon">⭐</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoviesItem;
