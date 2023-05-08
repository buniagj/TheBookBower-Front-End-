import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash'; // Import Lodash library
import BorrowedBooksTable from './BorrowedTable';
import ReturnedBooksTable from './ReturnedTable';
import Pagination from './AdminDashboard/Pagination';

function BookTable() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchBorrowedBooks() {
      try {
        const response = await axios.get('/api/books?status=borrowed');
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchReturnedBooks() {
      try {
        const response = await axios.get('/api/books?status=returned');
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

  const handleResultsPerPageChange = (newResultsPerPage) => {
    setCurrentPage(1);
    setResultsPerPage(newResultsPerPage);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const getCombinedData = () => {
    const allBooks = [...borrowedBooks, ...returnedBooks];
    const filteredBooks = searchQuery
      ? allBooks.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
      : allBooks;

    const sortedBooks = _.orderBy(filteredBooks, [sortColumn.path], [sortColumn.order]);

    const slicedBooks = sortedBooks.slice(
      (currentPage - 1) * resultsPerPage,
      currentPage * resultsPerPage
    );

    return {
      totalCount: filteredBooks.length,
      data: slicedBooks,
    };
  };

  const { totalCount, data: currentBooks } = getCombinedData();

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Borrower</th>
            <th>Borrowed Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.status}</td>
              <td>{book.borrower}</td>
              <td>{book.borrowedDate}</td>
              <td>{book.returnDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalResults={totalCount}
        resultsPerPage={resultsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onResultsPerPageChange={handleResultsPerPageChange}
      />
    </div>
  );
}

export default BookTable;
