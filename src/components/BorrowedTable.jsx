import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

function BorrowedTable() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortField, setSortField] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchBorrowedBooks() {
      try {
        const response = await axios.get('/api/borrowed-books'); // Replace with your Laravel API endpoint
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBorrowedBooks();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleResultsPerPageChange = (newResultsPerPage) => {
    setCurrentPage(1);
    setResultsPerPage(newResultsPerPage);
  };

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedBorrowedBooks = borrowedBooks
    .slice()
    .sort((a, b) => {
      let result = 0;
      if (a[sortField] > b[sortField]) {
        result = 1;
      } else if (a[sortField] < b[sortField]) {
        result = -1;
      }
      return sortDirection === 'asc' ? result : -result;
    });

  const filteredBorrowedBooks = sortedBorrowedBooks.filter((book) =>
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentBorrowedBooks = filteredBorrowedBooks.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <h2>Borrowed Books</h2>
      <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search by author or title" />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSortChange('title')}>Title</th>
            <th onClick={() => handleSortChange('author')}>Author</th>
            <th onClick={() => handleSortChange('borrowed_date')}>Borrowed Date</th>
            <th onClick={() => handleSortChange('due_date')}>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {currentBorrowedBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.borrowed_date}</td>
              <td>{book.due_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalResults={borrowedBooks.length}
        resultsPerPage={resultsPerPage} 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onResultsPerPageChange={handleResultsPerPageChange}
      />
    </div>
  );
}

export default BorrowedTable;
