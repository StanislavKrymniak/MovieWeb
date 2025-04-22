import './person-profile.styles.scss';
import {  useLocation,Link } from 'react-router-dom';
import { PeopleTypes } from '../../store/people/people.types';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { api_Key } from '../../helper/keys';
export type PersonRouteParams = {
    personId: string;
};

  

export const PersonProfile = () => {
  const { personId } = useParams<{ personId: string }>();
  const location = useLocation();
  const [personDetails, setPersonDetails] = useState<PeopleTypes | null>(null);
  
  
  const personFromState = location.state as PeopleTypes;
  const knownForMovies = personFromState?.known_for || [];

  useEffect(() => {
    if (!personId) return;

    const fetchPersonDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${personId}?${api_Key}`);
        if (!response.ok) throw new Error('Failed to fetch person details');
        const data = await response.json();

        setPersonDetails({ ...data, known_for: knownForMovies });
      } catch (err) {
        console.error('Error fetching person details:', err);
      }
    };

    fetchPersonDetails();
  }, [personId]);

  if (!personDetails) {
    return <div>Loading person details...</div>;
  }
  console.log(personDetails);
      
  return (
    <div className="person-profile">
      {personDetails && (
        <div className="person-profile_container">
          <div className="person-profile_column_1">
            <div className="person-profile_image">
              <img src={`https://image.tmdb.org/t/p/w500${personDetails.profile_path}`} alt={personDetails.name} />
            </div>
            <div className="person-profile_details">
              <p><strong>Known For:</strong> {personDetails.known_for_department}</p>
              <p><strong>Birthday:</strong> {personDetails.birthday || 'Unknown'}</p>
              <p><strong>Gender:</strong> {personDetails.gender === 1 ? <>female</>: <>male</> }</p>
              <p><strong>Place of Birth:</strong> {personDetails.place_of_birth || 'Unknown'}</p>
              <p><strong>Also Known As:</strong> {personDetails.also_known_as?.join(', ') || 'N/A'}</p>
              
            </div>
          </div>
  
          <div className="person-profile_column_2">
            <h1 className="person-profile_name">{personDetails.name}</h1>
  
            <div className="person-profile_biography">
              <h2>Biography</h2>
              <p>{personDetails.biography || 'No biography available.'}</p>
            </div>
  
            <div className="person-profile_known-for">
              <h2>Known For</h2>
              <div className="person-profile_movies">
                {personDetails.known_for.map((movie, index) => (
                  <div className="person-profile_movie" key={index}>
                    <Link to={`/movie/${movie.id}`} >
                      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    </Link>
                    <p>{movie.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}



export default PersonProfile;