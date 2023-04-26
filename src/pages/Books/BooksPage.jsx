import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import BookListings from './BookListings';
import BookDetails from './BookDetails';

function BooksPage() {
  const { id } = useParams();
  const location = useLocation();
  const [query, setQuery] = useState('');

  const handleSearch = (query) => {
    setQuery(query);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <BookListings query={query} />
      {id && <BookDetails id={id} />}
    </div>
  );
}

export default BooksPage;
