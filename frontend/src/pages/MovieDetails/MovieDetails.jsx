// MovieDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

function MovieDetails() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjNlNzg0ODkzMDUxMjRjYmQ3YjNiMmViZjMyZjNjNCIsInN1YiI6IjY0NzBhYjRhNzcwNzAwMDExOTI0OGZlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-XX-u9jsBzlN_VSkOYDNyk11_AGkIqX1b3H1XK0_1YE';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieId, token]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-poster-container">
        <img
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="movie-poster"
        />
      </div>
      <div className="movie-info-container">
        <h2 className="movie-title">{movieDetails.title}</h2>
        <p className="movie-description">{movieDetails.overview}</p>
        <p className="movie-genres">
          Genres: {movieDetails.genres.map(genre => (
            <span
              className={`movie-genre genre-${genre.name.toLowerCase()}`}
              key={genre.id}
            >
              {genre.name}
            </span>
          ))}
        </p>
        <p className="movie-release-date">Release Date: {movieDetails.release_date}</p>
        {/* Affichez d'autres informations importantes du film ici */}
      </div>
    </div>
  );
}

export default MovieDetails;

  
//   return (
//     <div className="movie-details-container">
//       <div className="movie-poster-container">
//         <img
//           src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieDetails.poster_path}`}
//           alt={movieDetails.title}
//           className="movie-poster"
//         />
//       </div>
//       <div className="movie-info-container">
//   <h2 className="movie-title">{movieDetails.title}</h2>
//   <p className="movie-description">{movieDetails.overview}</p>
//   <p className="movie-genres">
//   Genres: {movieDetails.genres.map(genre => (
//     <span
//       className={`movie-genre genre-${genre.name.toLowerCase()}`}
//       key={genre.id}
//     >
//       {genre.name}
//     </span>
//   ))}
// </p>
//   <p className="movie-release-date">Release Date: {movieDetails.release_date}</p>
//   {/* Affichez d'autres informations importantes du film ici */}
// </div>
//     </div>
//   );
// }


