import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BorrowedBooksTable from './BorrowedBooksTable';
import ReturnedBooksTable from './ReturnedBooksTable';
import Pagination from './Pagination';

function BookTable() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);

  useEffect(() => {
    async function fetchBorrowedBooks() {
      try {
        const response = await axios.get('/api/borrowed-books');
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchReturnedBooks() {
      try {
        const response = await axios.get('/api/returned-books');
        setReturnedBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBorrowedBooks();
    fetchReturnedBooks();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentBorrowedBooks = borrowedBooks.slice(indexOfFirstResult, indexOfLastResult);
  const currentReturnedBooks = returnedBooks.slice(indexOfFirstResult, indexOfLastResult);

  const handleResultsPerPageChange = (newResultsPerPage) => {
    setCurrentPage(1);
    setResultsPerPage(newResultsPerPage);
  };

  return (
    <div>
      <BorrowedBooksTable books={currentBorrowedBooks} />
      <Pagination
        totalResults={borrowedBooks.length}
        resultsPerPage={resultsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onResultsPerPageChange={handleResultsPerPageChange}
      />
      <ReturnedBooksTable books={currentReturnedBooks} />
      <Pagination
        totalResults={returnedBooks.length}
        resultsPerPage={resultsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onResultsPerPageChange={handleResultsPerPageChange}
      />
    </div>
  );
}

export default BookTable;
