import React, { useState } from "react";
import Sort from "../functionality/Sort";
import Filter from "../functionality/Filter";
import Search from "../functionality/Search";
import AddBook from "../functionality/AddBook";
import DeleteBook from "../functionality/DeleteBook";
import EditBook from "../functionality/EditBook";
import ChangeStatus from "../functionality/ChangeStatus";
import ExportToExcel from "./ExportToExcel";

const ReturnedTable = ({ data, isAdmin }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [filter, setFilter] = useState("");

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

  return (
    <>
      {isAdmin && (
        <>
          <AddBook />
          <DeleteBook />
          <EditBook />
          <ChangeStatus />
          <ExportToExcel />
        </>
      )}
      <Search searchTerm={searchTerm} handleSearch={handleSearch} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <Sort handleSort={handleSort} />
      <Table striped bordered hover>
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
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>{item.isbn}</td>
              <td>{item.borrower}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ReturnedTable;

