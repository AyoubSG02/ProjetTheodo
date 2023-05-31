import React, { useEffect, useState } from 'react';
import logo from './images.png';
import './Home.css';
import { Link } from 'react-router-dom';


function useFetchMovies(url) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjNlNzg0ODkzMDUxMjRjYmQ3YjNiMmViZjMyZjNjNCIsInN1YiI6IjY0NzBhYjRhNzcwNzAwMDExOTI0OGZlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-XX-u9jsBzlN_VSkOYDNyk11_AGkIqX1b3H1XK0_1YE',
      },
    };

    fetch(
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
      options
    )
      .then((response) => response.json())
      .then((response) => setMovies(response.results))
      .catch((err) => console.error(err));
  }, [url]);

  return movies;
}


function Home() {
  const [movieName, setMovieName] = useState('');
  const [showMovieName, setShowMovieName] = useState(false);
  const movies = useFetchMovies(
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
  );

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
        <h1>Movies-4-U</h1>
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
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
          {showMovieName && movieName && (
            <p>Le nom du film est : {movieName}</p>
          )}
        </div>
        <div>
          <h2>Top 20 du moment</h2>
          <ul className="container">
            {movies.map((movie) => (
              <Link to={`/movies/${movie.id}`} key={movie.id}>
                <div className="movie-container">
                  <img
                    src={
                      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' +
                      movie.poster_path
                    }
                    alt={movie.title}
                    className="image-item"
                  />
                  <div className="movie-details">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p className="movie-date">Sorti le {movie.release_date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Home;