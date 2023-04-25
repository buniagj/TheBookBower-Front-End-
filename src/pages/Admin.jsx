import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BorrowedBooksTable from '../components/BorrowedTable';
import ReturnedBooksTable from '../components/ReturnedTable';
import Pagination from '../functionality/Pagination';
import BookTable from '../components/BookTable';
import Filter from '../functionality/Filter';
import ExportExcelButton from '../components/ExportToExcelButton';
import ExportToExcel from '../components/ExportToExcel';


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
