import React, { useState, useMemo } from "react";
import { Container, Row, Col, Table, DropdownButton, Dropdown } from "react-bootstrap";
import Sort from "./AdminDashboard/Sort";
import Filterbook from "./AdminDashboard/FilterBook";
import Search from "./AdminDashboard/Search";
import AddBook from "./AdminDashboard/AddBook";
import DeleteBook from "./AdminDashboard/DeleteBook";
import EditBook from "./AdminDashboard/EditBook";
import ChangeStatusButton from "./AdminDashboard/ChangeStatusButton";
import ExportToExcel from "./AdminDashboard/ExportToExcel";
import Pagination from "./AdminDashboard/Pagination";

const Header = ({titleDropdownValue, handleTitleDropdownSelect, authorDropdownValue, handleAuthorDropdownSelect, handleSearch, handleFilter}) => {
  return (
    <Row>
      <Col>
        <DropdownButton
          id="dropdown-title"
          title={`Title ${titleDropdownValue}`}
          onSelect={handleTitleDropdownSelect}
        >
          <Dropdown.Item eventKey="A-Z">A-Z</Dropdown.Item>
          <Dropdown.Item eventKey="Z-A">Z-A</Dropdown.Item>
        </DropdownButton>
      </Col>
      <Col>
        <DropdownButton
          id="dropdown-author"
          title={`Author ${authorDropdownValue}`}
          onSelect={handleAuthorDropdownSelect}
        >
          <Dropdown.Item eventKey="A-Z">A-Z</Dropdown.Item>
          <Dropdown.Item eventKey="Z-A">Z-A</Dropdown.Item>
        </DropdownButton>
      </Col>
      <Col>
        <Search handleSearch={handleSearch} />
      </Col>
      <Col>
        <Filterbook handleFilter={handleFilter} />
      </Col>
    </Row>
  );
};

const ReturnedTable = ({ data = [], isAdmin }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [titleDropdownValue, setTitleDropdownValue] = useState("");
  const [authorDropdownValue, setAuthorDropdownValue] = useState("");

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

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleTitleDropdownSelect = (eventKey) => {
    setTitleDropdownValue(eventKey);
  };

  const handleAuthorDropdownSelect = (eventKey) => {
    setAuthorDropdownValue(eventKey);
  };

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
      ),
    [data, searchTerm]
  );

  const sortedData = useMemo(() => {
    if (sortColumn) {
      return filteredData.slice().sort((a, b) => {
        const fieldA = a