import React, { useState } from "react";
import "./LikeButton.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "react-router-dom";

const LikeButton = ({ userId, movieId }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    fetch(`/users/${userId}/updateMovieLike`, {
      method: 'POST',
      body: JSON.stringify({ movieId: movieId, liked: !liked }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Mise à jour réussie, mettre à jour l'état de like
        setLiked(!liked);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour des informations de l\'utilisateur :', error);
      });
  };

  return (
    <Link to={`/movie/like/${movieId}`}>
      <span className={`like-button ${liked ? "liked" : ""}`} onClick={handleLike}>
        <i className="fas fa-heart" />
      </span>
    </Link >
  );
};

export default LikeButton;