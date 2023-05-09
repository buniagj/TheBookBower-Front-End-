import React, { useState, useEffect } from 'react';

function FilterBook() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetch('/api/books')
      .then(response => response.json())
      .then(data => {
        // set the due date property on each book object
        const booksWithDueDate = data.map(book => {
          const dueDate = new Date(book.borrowedDate);
          dueDate.setDate(dueDate.getDate() + 7); // assuming a 7-day borrowing period
          return { ...book, dueDate };
        });
        setBooks(booksWithDueDate);
        setFilteredBooks(booksWithDueDate);
      })
      .catch(error => console.log(error));
  }, []);
  

  function handleSearchInputChange(event) {
    setFilters({ ...filters, search: event.target.value });
  }

  function handleStatusSelectChange(event) {
    setFilters({ ...filters, status: event.target.value });
  }

  function handleStartDateInputChange(event) {
    setFilters({ ...filters, startDate: event.target.value });
  }

  function handleEndDateInputChange(event) {
    setFilters({ ...filters, endDate: event.target.value });
  }

  function handleFilterButtonClick() {
    let filteredBooks = [...books];

    if (filters.search !== '') {
      filteredBooks = filteredBooks.filter(book => {
        return book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
               book.author.toLowerCase().includes(filters.search.toLowerCase()) ||
               book.publisher.toLowerCase().includes(filters.search.toLowerCase());
      });
    }

    if (filters.status !== '') {
      filteredBooks = filteredBooks.filter(book => {
        return book.status.toLowerCase() === filters.status.toLowerCase();
      });
    }

    if (filters.startDate !== '') {
      filteredBooks = filteredBooks.filter(book => {
        return new Date(book.borrowedDate) >= new Date(filters.startDate);
      });
    }

    if (filters.endDate !== '') {
      filteredBooks = filteredBooks.filter(book => {
        return new Date(book.borrowedDate) <= new Date(filters.endDate);
      });
    }

    setFilteredBooks(filteredBooks);
  }

  return (
    <div>
      <input type="text" value={filters.search} onChange={handleSearchInputChange} />
      <select value={filters.status} onChange={handleStatusSelectChange}>
        <option value="">--Select Status--</option>
        <option value="borrowed">Borrowed</option>
        <option value="returned">Returned</option>
        <option value="out of stock">Out of Stock</option>
      </select>
      <input type="date" value={filters.startDate} onChange={handleStartDateInputChange} />
      <input type="date" value={filters.endDate} onChange={handleEndDateInputChange} />
      <button onClick={handleFilterButtonClick}>Filter</button>
    </div>
  );
}

export default FilterBook;
