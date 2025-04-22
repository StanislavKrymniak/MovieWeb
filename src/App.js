import { Routes, Route } from 'react-router-dom';
import './App.css';
import Movies from './routes/movies/movies.component';
import MoviesItem from './routes/movies-item/movies-item.component';
import TVShowItem from './routes/tvshow-item/tvshow-item.component';
import Navigation from './routes/navigation/navigation.component';
import PeoplePage from './routes/people/peoplePage.component';
import PersonProfile from './routes/people-profile/person-profile.component';
import TVShows from './routes/tv-shows/tv-shows.component';
import { AuthComponent } from './routes/authentication/authentication.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
      <Route index element={<Movies />} />
        <Route path='/movies/:category' element={<Movies />} />
        <Route path='/movie/:movieId' element={<MoviesItem  />} />
        <Route path='/tvs/:category' element={<TVShows />} />
        <Route path='/tv/:TvId' element={<TVShowItem  />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/:personId" element={<PersonProfile />} />
        <Route path='/sign-in' element={<AuthComponent />} />
      </Route>
    </Routes>
  );
}

export default App;
