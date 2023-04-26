import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookListings.css';

const MAX_PAGE_BUTTONS = 5; // Maximum number of page buttons to display

function BookListings() {
  const [books, setBooks] = useState([]);
  const [currentResults, setCurrentResults] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get('/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    setCurrentResults(books.slice(startIndex, endIndex));
  }, [currentPage, resultsPerPage, books]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalResults = books.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // Calculate the range of page buttons to display
  const pageButtonStart = Math.max(currentPage - Math.floor(MAX_PAGE_BUTTONS / 2), 1);
  const pageButtonEnd = Math.min(pageButtonStart + MAX_PAGE_BUTTONS - 1, totalPages);

  const pageButtons = [];
  for (let i = pageButtonStart; i <= pageButtonEnd; i++) {
    pageButtons.push(
      <button key={i} className={i === currentPage ? 'active' : ''} onClick={() => handlePageChange(i)} disabled={i === currentPage}>
        {i}
      </button>
    );
  }

  // Add previous and next group buttons
  const hasPreviousGroup = pageButtonStart > 1;
  const hasNextGroup = pageButtonEnd < totalPages;
  if (hasPreviousGroup) {
    pageButtons.unshift(
      <button key="prev" onClick={() => handlePageChange(pageButtonStart - MAX_PAGE_BUTTONS)}>
        &lt;&lt;
      </button>
    );
  }
  if (hasNextGroup) {
    pageButtons.push(
      <button key="next" onClick={() => handlePageChange(pageButtonEnd + 1)}>
        &gt;&gt;
      </button>
    );
  }

  return (
    <div>
      <h2>Book Listings</h2>
      <div className="book-grid">
        {currentResults.map((book) => (
          <div key={book.id} className="book-item">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Year: {book.year}</p>
          </div>
        ))}
      </div>
      <div>
        Total Results: {books.length}
        <br />
        Results Per Page:
        <input
          type="number"
          value={resultsPerPage}
          onChange={(e) => setResultsPerPage(parseInt(e.target.value))}
        />
      </div>
      <div>
        Current Page: {currentPage}
        <br />
        <div className="page-buttons">{pageButtons}</div>
      </div>
    </div>
  );
}

export default BookListings;
