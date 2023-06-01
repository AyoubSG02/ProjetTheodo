import React, { useState } from "react";
import "./LikeButton.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "react-router-dom";

const LikeButton = ({ userId, movieId }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {

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