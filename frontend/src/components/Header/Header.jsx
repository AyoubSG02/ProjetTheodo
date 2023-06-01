import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isPopularOpen, setPopularOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?q=${searchValue}`);
  };

  const handlePopularClick = () => {
    setPopularOpen(!isPopularOpen);
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img className="header__icon" src="../csshows.png" alt="Logo" />
        </Link>
        <div className="dropdown">
          <span className={`dropdown__trigger ${isPopularOpen ? 'active' : ''}`} onClick={handlePopularClick}>
            Popular {isPopularOpen && <i className="fas fa-chevron-down"></i>}
          </span>
          {isPopularOpen && (
            <div className="dropdown__content">
              <Link to="/movies/popular" style={{ textDecoration: 'none' }}>
                <span>Popular 1</span>
              </Link>
              <Link to="/movies/popular" style={{ textDecoration: 'none' }}>
                <span>Popular 2</span>
              </Link>
              <Link to="/movies/popular" style={{ textDecoration: 'none' }}>
                <span>Popular 3</span>
              </Link>
            </div>
          )}
        </div>
        <Link to="/movies/top-rated" style={{ textDecoration: 'none' }}>
          <span>Top Rated</span>
        </Link>

        <Link to="/movies/upcoming" style={{ textDecoration: 'none' }}>
          <span>Upcoming</span>
        </Link>
        <Link to="/users" style={{ textDecoration: 'none' }}>
          <span>Sign in</span>
        </Link>
        <Link to="/about" style={{ textDecoration: 'none' }}>
          <span>About</span>
        </Link>
      </div>
      <div className="headerRight">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Header;


