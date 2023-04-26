import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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
    <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder={`Search ${type}`}
        aria-label={`Search ${type}`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  );
}

Search.propTypes = {
  type: PropTypes.oneOf(['books', 'users']).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Search;
