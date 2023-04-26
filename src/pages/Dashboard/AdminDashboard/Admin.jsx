import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BorrowedBooksTable from '../BorrowedTable';
import ReturnedBooksTable from '../ReturnedTable';
import Pagination from '../AdminDashboard/Pagination';
import BookTable from '../BookTable';
import Filter from '../AdminDashboard/FilterBook';
import ExportExcelButton from '../AdminDashboard/ExportToExcelButton';
import ExportToExcel from '../AdminDashboard/ExportToExcel';


function AdminDashboard() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [bookData, setBookData] = useState([]);
  const [filter, setFilter] = useState({});

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

    async function fetchBookData() {
      try {
        const response = await axios.get('/api/book-data', { params: filter });
        setBookData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBorrowedBooks();
    fetchReturnedBooks();
    fetchBookData();
  }, [filter]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleResultsPerPageChange = (newResultsPerPage) => {
    setCurrentPage(1);
    setResultsPerPage(newResultsPerPage);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleExportExcel = () => {
    <ExportToExcel data={borrowedBooks} />
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentBorrowedBooks = borrowedBooks.slice(indexOfFirstResult, indexOfLastResult);
  const currentReturnedBooks = returnedBooks.slice(indexOfFirstResult, indexOfLastResult);

  return (
    <div>
      <BookTable data={bookData} />
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ExportExcelButton onClick={handleExportExcel} />
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

export default AdminDashboard;
