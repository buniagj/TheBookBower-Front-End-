import React, { useState, useMemo, useEffect } from "react";
import { Container, Row, Col, Table, DropdownButton, Dropdown } from "react-bootstrap";
import Sort from "./AdminDashboard/Sort";
import Search from "./AdminDashboard/Search";
import ExportToExcel from "./AdminDashboard/ExportToExcel";
import Pagination from "./AdminDashboard/Pagination";
import FilterBook from "./AdminDashboard/FilterBook";
import '../Dashboard/AdminDashboard/Admin.css';

// Define the BorrowedTable component
const BorrowedTable = ({ data = [], isAdmin }) => {
  // Define state variables
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState(null);

  // Define event handlers
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortDirection((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(columnName);
      setSortDirection("asc");
    }
  };

  const handleTitleDropdownSelect = (eventKey) => {
    handleSort("title");
    setSortDirection(eventKey === "A-Z" ? "asc" : "desc");
  };

  const handleAuthorDropdownSelect = (eventKey) => {
    handleSort("author");
    setSortDirection(eventKey === "A-Z" ? "asc" : "desc");
  };

  const handleFilter = (filterValue) => {
    setFilterStatus(filterValue);
  };

  // Define memoized data
  const filteredData = useMemo(
    () =>
      data.filter(
        (item) =>
          searchTerm === "" ||
          [
            item.title,
            item.author,
            item.isbn,
            item.borrower,
            item.status
          ].some((field) =>
            field.toLowerCase().includes(searchTerm.toLowerCase())
          )
      ).filter(
        (item) =>
          !filterStatus || filterStatus === item.status
      ),
    [data, searchTerm, filterStatus]
  );

  const sortedData = useMemo(() => {
    if (!sortColumn) {
      return filteredData;
    }

    const sorted = [...filteredData].sort((a, b) => {
      const columnA = a[sortColumn].toLowerCase();
      const columnB = b[sortColumn].toLowerCase();

      if (columnA < columnB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (columnA > columnB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [filteredData, sortColumn, sortDirection]);

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    fetch('/api/books')
      .then(response => response.json())
      .then(data => {
        // set the due date property on each book object
        const booksWithDuedate = data.map(book => {
          const dueDate = new Date(book.borrowedDate);
          dueDate.setDate(dueDate.getDate() + 14);
          book.dueDate = dueDate.toLocaleDateString();
          return book;
        });
        setData(booksWithDueDate);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Container fluid>
      <Col>
          <h2 className="mb-3">Borrowed Books</h2>
      </Col>
      <br />
        <Row className="justify-content-center">
          <Col xs={12} md={12}>
            <Search searchTerm={searchTerm} handleSearch={handleSearch} />
          </Col>
      </Row>
      <br></br>
      <Row>
        <Col className="d-flex justify-content-end">
          <ExportToExcel data={sortedData} />
        </Col>
      </Row>
      <Row className="mb-3 align-items-center">
  <Col xs={12} md={8}>
    <FilterBook handleFilter={handleFilter} />
  </Col>
  <Col xs={6} md={2}>
    <DropdownButton
      title="Sort by Title"
      variant="secondary"
      onSelect={handleTitleDropdownSelect}
      className="sort-filter-btn"
    >
      <Dropdown.Item eventKey="A-Z">A-Z</Dropdown.Item>
      <Dropdown.Item eventKey="Z-A">Z-A</Dropdown.Item>
    </DropdownButton>
  </Col>
  <Col xs={6} md={2}>
    <DropdownButton
      title="Sort by Author"
      variant="secondary"
      onSelect={handleAuthorDropdownSelect}
      className="sort-filter-btn"
    >
      <Dropdown.Item eventKey="A-Z">A-Z</Dropdown.Item>
      <Dropdown.Item eventKey="Z-A">Z-A</Dropdown.Item>
    </DropdownButton>
  </Col>
</Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Borrower</th>
                <th>Status</th>
                <th>Due Date</th>
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
                  <td>{item.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={sortedData.length}
            currentPage={currentPage}
            handleChangePage={handleChangePage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default BorrowedTable;
