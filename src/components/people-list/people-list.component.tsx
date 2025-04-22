import './people-list.styles.scss';
import { PeopleTypes } from '../../store/people/people.types';
import { FC } from 'react';
import { Link } from 'react-router-dom';
type PeopleListProps = {
    person: PeopleTypes;
}

export const PeopleList:FC<PeopleListProps>  = ({person}) => {
    return (
        <div className="people-list_body">
            <Link 
                to={`/people/${person.id}`}
                state={person}
            >
                <div className="people-list_image">
                    <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt="person" />
                </div>
                <div className="people-list_info">
                    <h1>{person.name}</h1>
                    <p>{person.known_for.map((movie,index) => <span key={index}>{movie.title}, </span>)}</p>
                </div>
            </Link>
        </div>
    );
}

export default PeopleList;

