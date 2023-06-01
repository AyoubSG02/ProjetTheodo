import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Users from './pages/Users/Users';
import About from './pages/About/About';
import Movie from './pages/Movie/Movie';
import MovieList from './pages/MovieList/MovieList';
import NotFound from './pages/NotFound/NotFound';
import SearchResults from './pages/SearchResults/SearchResults';

const Routes = () => {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/about" element={<About />} />
      <Route path="/movie/:id" element={<Movie />} />
      <Route path="/movies/:type" element={<MovieList />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="*" element={<NotFound />} />
    </>
  );
};

export default Routes;
