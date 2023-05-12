import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Container } from 'react-bootstrap';
import SearchBar from './SearchBar';
import BookListings from './BookListings';
import BookDetails from './BookDetails';
import './BooksPage.css';

function BooksPage() {
  const { id } = useParams();
  const location = useLocation();
  const [query, setQuery] = useState('');

  const handleSearch = (query) => {
    setQuery(query);
  };

  return (
    <div className="books-page">
      <Breadcrumb>
          <Container>
            <div className="category-page-title">Books</div>
          </Container>
      </Breadcrumb>
      <Container>
        <SearchBar onSearch={handleSearch} />
        <BookListings query={query} />
        {id && <BookDetails id={id} />}
      </Container>
    </div>
  );
}

export default BooksPage;
