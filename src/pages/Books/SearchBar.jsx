import React, { useState } from 'react';
import axios from 'axios';
import Pagination from '../Dashboard/AdminDashboard/Pagination';
import './SearchBar.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [category, setCategory] = useState('');
  const [noResultsMessage, setNoResultsMessage] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`/api/books?search=${searchTerm}&category=${category}`); // Replace with your Laravel API endpoint
      setSearchResults(response.data);
      setNoResultsMessage('');
      if (response.data.length === 0) {
        setNoResultsMessage('The book you are searching can\'t be found on the list.');
      }
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

  // Array of letters to be used as categories
  const categories = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  return (
    <div className="search-bar-container">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {categories.map((letter) => (
          <button
            key={letter}
            onClick={() => setCategory(letter)}
            className="category-button"
          >
            {letter}
          </button>
        ))}
      </div>
      {noResultsMessage !== '' && <p className="no-results-message">{noResultsMessage}</p>}
      {currentResults.length > 0 &&
        <ul>
          {currentResults.map((result) => (
            <li key={result.id}>
              <h3>{result.title}</h3>
              <p>Author: {result.author}</p>
              <p>Year: {result.year}</p>
            </li>
          ))}
        </ul>
      }
      {searchTerm !== '' && currentResults.length === 0 ? (
        <p>No results found.</p>
      ) : null}

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
