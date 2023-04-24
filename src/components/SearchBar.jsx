import React, { useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`/api/books?search=${searchTerm}`); // Replace with your Laravel API endpoint
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {currentResults.map((result) => (
          <li key={result.id}>
            <h3>{result.title}</h3>
            <p>Author: {result.author}</p>
            <p>Year: {result.year}</p>
          </li>
        ))}
      </ul>
      <Pagination
        totalResults={searchResults.length}
        resultsPerPage={resultsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        setResultsPerPage={setResultsPerPage}
      />
    </div>
  );
}

export default SearchBar;
