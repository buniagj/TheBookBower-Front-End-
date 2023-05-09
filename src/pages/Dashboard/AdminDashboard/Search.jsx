import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../AdminDashboard/Admin.css';

function Search({ type, onChange }) {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/${type}?q=${query}`);
      onChange(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <div className="search-wrapper">
        <input
          className="search-input"
          type="search"
          placeholder={`Search ${type}`}
          aria-label={`Search ${type}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

Search.propTypes = {
  type: PropTypes.string.isRequired,
};

Search.defaultProps = {
  type: 'default',
};

export default Search;
