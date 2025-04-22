import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api_Key } from '../../helper/keys';
import { MediaTypes } from '../../store/movies/movies.types';
import './item-details.styles.scss';

const ItemDetails = ({ type }: { type: 'movie' | 'tv' }) => {
  const { id } = useParams();
  const [details, setDetails] = useState<MediaTypes | null>(null);;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?${api_Key}`);
        if (!response.ok) throw new Error(`Failed to fetch ${type} details`);
        const data = await response.json();
        setDetails(data);
      } catch (error: Error | any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id, type]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!details) return <div>No details available</div>;

  return (
    <div className="movie-item-container">
      <img 
      className="movie-item-poster" 
      src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} 
      alt={details.title || details.name} 
      />
      <div className="movie-item-details">
        <h1>{details.title || details.name}</h1>
        <p>{details.overview}</p>
        <p><strong>Release Date:</strong> {details.release_date || details.first_air_date}</p>
        <p><strong>Genres:</strong> {details.genres.map((genre) => genre.name).join(', ')}</p>
        <div className="movie-rating">
          {`Rating: ${details.vote_average.toFixed(1)}`}
          <span className="rating-icon">⭐</span>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
