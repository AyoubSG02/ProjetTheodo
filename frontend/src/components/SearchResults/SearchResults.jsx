import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/search?q=${searchQuery}`)
      .then(response => {
        setSearchResults(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [searchQuery]);

  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      {searchResults.map(result => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  );
};

export default SearchResults;
