import React, { useState } from "react";
import Sort from './AdminDashboard/Sort';
import Filter from './AdminDashboard/FilterBook';
import Search from './AdminDashboard/Search';
import AddBook from './AdminDashboard/AddBook';
import DeleteBook from './AdminDashboard/DeleteBook';
import EditBook from './AdminDashboard/EditBook';
import ChangeStatus from './AdminDashboard/ChangeStatus';
import ExportToExcel from './AdminDashboard/ExportToExcel';
import Pagination from './AdminDashboard/Pagination';

const ReturnedTable = ({ data, isAdmin }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnName);
      setSortDirection("asc");
    }
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const searchTermFound =
      searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.borrower.toLowerCase().includes(searchTerm.toLowerCase());
    const filterFound = filter === "" || item.status === filter;

    return searchTermFound && filterFound;
  });

  const sortedData = filteredData.sort((a, b) => {
    if (sortColumn === "title") {
      return sortDirection === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortColumn === "author") {
      return sortDirection === "asc"
        ? a.author.localeCompare(b.author)
        : b.author.localeCompare(a.author);
    } else if (sortColumn === "isbn") {
      return sortDirection === "asc"
        ? a.isbn.localeCompare(b.isbn)
        : b.isbn.localeCompare(a.isbn);
    } else if (sortColumn === "borrower") {
      return sortDirection === "asc"
        ? a.borrower.localeCompare(b.borrower)
        : b.borrower.localeCompare(a.borrower);
    } else if (sortColumn === "status") {
      return sortDirection === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    } else {
      return 0;
    }
  });

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? "active" : ""}
      >
        {number}
      </li>
    );
  });

  return (
    <div className="returned-table">
      <div className="returned-table__header">
        {isAdmin && (
          <>
            <AddBook />
            <DeleteBook />
            <EditBook />
            <ChangeStatus />
            <ExportToExcel />
          </>
        )}
        <Search handleSearch={handleSearch} />
        <Filter handleFilter={handleFilter} />
        <Sort handleSort={handleSort} />
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>Title</th>
            <th onClick={() => handleSort("author")}>Author</th>
            <th onClick={() => handleSort("isbn")}>ISBN</th>
            <th onClick={() => handleSort("borrower")}>Borrower</th>
            <th onClick={() => handleSort("status")}>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>{item.isbn}</td>
              <td>{item.borrower}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="returned-table__pagination">
        <Pagination
          pageNumbers={renderPageNumbers}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default ReturnedTable;
