import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // Add your logic here to handle the search based on the `searchTerm`
      console.log('Search term:', searchTerm);
    }
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/"><img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" /></Link>
        <Link to="/movies/popular" style={{ textDecoration: "none" }}><span>Popular</span></Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}><span>Top Rated</span></Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}><span>Upcoming</span></Link>
        <Link to="/users" style={{ textDecoration: "none" }}><span>Users</span></Link>
      </div>
    </div>
  )
};

export default Header;
