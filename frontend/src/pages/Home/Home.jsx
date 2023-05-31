import React, { useState, useEffect } from 'react';
import logo from './spoderman.png';
import axios from 'axios';
import './Home.css';

function useFetchMovies(url) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo'
      }
    };

    fetch(url, options)
      .then(response => response.json())
      .then(response => setMovies(response.results))
      .catch(err => console.error(err));
  }, [url]);

  return movies;
}

function Home() {
  const [movieName, setMovieName] = useState('');
  const [showMovieName, setShowMovieName] = useState(false);
  const movies = useFetchMovies('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');

  const handleInputChange = (event) => {
    setMovieName(event.target.value);
    setShowMovieName(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setShowMovieName(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SpodermanMovies</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <h1></h1>
        <div>
          <label htmlFor="movieName">Nom du film:</label>
          <input
            type="text"
            id="movieName"
            placeholder="Enter movie name"
            value={movieName}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {showMovieName && movieName && <p>Le nom du film est : {movieName}</p>}
        </div>
        <div>
        <h2>Top 20 du moment</h2>
          <ul className="container">
            {movies.map(movie => (
              <div className="movie-container" key={movie.id}>
              <img src={"https://www.themoviedb.org/t/p/w600_and_h900_bestv2" + movie.poster_path} className='image-item' />
              <div> {movie.title} <br></br> sorti le {movie.release_date} </div>
              </div>
            ))}
          </ul>
        </div>

      </header>
    </div>
  );
}
export default Home;