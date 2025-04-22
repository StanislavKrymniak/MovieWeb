import { useSelector } from 'react-redux';
import { selectPeopleList } from '../../store/people/people.selector';
import PeopleList from '../../components/people-list/people-list.component';
import './peoplePage.styles.scss';
import { PeopleTypes } from '../../store/people/people.types';
import Pagination from '../../components/pagination/pagination.component';

const PeoplePage = () => {
  const people = useSelector(selectPeopleList) as PeopleTypes[];
  return (
    <div className="people-container">
      
        {
          people.length === 0 ? (<h1>No People Found</h1>) :
              (
                  people.map(person => (
                      <PeopleList key={person.id} person={person} />
                  ))
              )
        }
      <Pagination type="people"/>
    </div>
  );
};

export default PeoplePage;
