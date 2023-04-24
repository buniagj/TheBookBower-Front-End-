import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

function ReturnTable() {
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchReturnedBooks() {
      try {
        const response = await axios.get('/api/returned-books'); // Replace with your Laravel API endpoint
        setReturnedBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchReturnedBooks();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;

  // Filter the books based on the search term and slice the results
  const currentReturnedBooks = returnedBooks
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstResult, indexOfLastResult);

  const handleResultsPerPageChange = (newResultsPerPage) => {
    setCurrentPage(1);
    setResultsPerPage(newResultsPerPage);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <h2>Returned Books</h2>
      <input type="text" placeholder="Search by title or author" value={searchTerm} onChange={handleSearchTermChange} />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Borrowed Date</th>
            <th>Returned Date</th>
          </tr>
        </thead>
        <tbody>
          {currentReturnedBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.borrowed_date}</td>
              <td>{book.returned_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default ReturnTable;
