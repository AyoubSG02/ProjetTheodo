import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img className="header__icon" src="./csshows.png" alt="Logo" />
        </Link>
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Top Rated</span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming</span>
        </Link>
        <Link to="/users" style={{ textDecoration: "none" }}>
          <span>Sign in</span>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <span>About</span>
        </Link>
      </div>
      <div className="headerRight">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default Header;