import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BorrowedBooksTable from './BorrowedTable';
import ReturnedBooksTable from './ReturnedTable';
import Pagination from '../functionality/Pagination';

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

  const getPageData = (items) => {
    const filteredItems = searchQuery
      ? items.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : items;

    const sortedItems = _.orderBy(
      filteredItems,
      [sortColumn.path],
      [sortColumn.order]
    );

    const slicedItems = sortedItems.slice(
      (currentPage - 1) * resultsPerPage,
      currentPage * resultsPerPage
    );

    return {
      totalCount: filteredItems.length,
      data: slicedItems,
    };
  };

  const { totalCount: borrowedBooksCount, data: currentBorrowedBooks } = getPageData(
    borrowedBooks
  );

  const { totalCount: returnedBooksCount, data: currentReturnedBooks } = getPageData(
    returnedBooks
  );

  return (
    <div>
      <BorrowedBooksTable
        books={currentBorrowedBooks}
        sortColumn={sortColumn}
        onSort={handleSort}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
      <Pagination
        totalResults={borrowedBooksCount}
        resultsPerPage={resultsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onResultsPerPageChange={handleResultsPerPageChange}
      />
      <ReturnedBooksTable
        books={currentReturnedBooks}
        sortColumn={sortColumn}
        onSort={handleSort}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
     <Pagination
        totalResults={returnedBooksCount}
        resultsPerPage={resultsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onResultsPerPageChange={handleResultsPerPageChange}
      />
    </div>
  );
}

export default BookTable;
