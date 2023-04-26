import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SearchBar from './SearchBar';
import BookListings from './BookListings';
import BookDetails from './BookDetails';

function BooksPage() {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');

  const fetchBooks = async () => {
    const response = await fetch(`/api/books?page=${currentPage}&query=${query}`);
    const { data, meta } = await response.json();
    setBooks(data);
    setTotalPages(meta.total_pages);
  };

  useEffect(() => {
    fetchBooks();
  }, [currentPage, query]);

  const handleSearch = (query) => {
    setQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const selectedBook = books.find((book) => book.id === parseInt(id));

  return (
    <div>
      {selectedBook ? (
        <BookDetails book={selectedBook} />
      ) : (
        <>
          <SearchBar onSearch={handleSearch} />
          <BookListings books={books} />
          <nav>
            <ul className="pagination">
              {[...Array(totalPages).keys()].map((pageNumber) => (
                <li
                  key={pageNumber}
                  className={`page-item ${pageNumber + 1 === currentPage ? 'active' : ''}`}
                >
                  <Link
                    to={`/books?page=${pageNumber + 1}${query ? `&query=${query}` : ''}`}
                    onClick={() => handlePageChange(pageNumber + 1)}
                    className="page-link"
                  >
                    {pageNumber + 1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default BooksPage;
