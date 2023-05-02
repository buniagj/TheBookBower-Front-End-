import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sort from './Sort';
import FilterBooks from './FilterBook';
import Search from './Search';
import ChangeStatus from './ChangeStatus';
import AvailableStock from './AvailableStock';
import DeleteBook from './DeleteBook';
import EditBook from './EditBook';
import AddBook from './AddBook';
import ExportToExcel from './ExportToExcel';
import Pagination from './Pagination';

export default function ManageBook() {
  const [books, setBooks] = useState([]);
  const [sortType, setSortType] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [editing, setEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState({});
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [showEditBookForm, setShowEditBookForm] = useState(false);
  const [showDeleteBookForm, setShowDeleteBookForm] = useState(false);

  useEffect(() => {
    axios.get('/api/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const sortBooks = (type) => {
    setSortType(type);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const filteredBooks = currentBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBooks = filteredBooks.sort((a, b) => {
    const isReversed = (sortType === 'asc') ? 1 : -1;
    return isReversed * a.title.localeCompare(b.title);
  });

  const editBook = (book) => {
    setEditing(true);
    setCurrentBook(book);
    setShowEditBookForm(true);
  };

  const addBook = () => {
    setShowAddBookForm(true);
  };

  const deleteBook = (book) => {
    setCurrentBook(book);
    setShowDeleteBookForm(true);
  };

  const closeAddBookForm = () => {
    setShowAddBookForm(false);
  };

  const closeEditBookForm = () => {
    setEditing(false);
    setShowEditBookForm(false);
  };

  const closeDeleteBookForm = () => {
    setShowDeleteBookForm(false);
  };

  const renderBookTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Title <Sort sortType={sortType} onSort={sortBooks} /></th>
            <th>Author</th>
            <th>Price</th>
            <th>Status</th>
            <th>Available Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.price}</td>
              <td><ChangeStatus book={book} /></td>
              <td>{book.availableStock}</td>
              <td>
                <button onClick={() => editBook(book)}>Edit</button>
                <button onClick={() => deleteBook(book)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Manage Books</h1>
      <div>
        <button onClick={addBook}>Add Book</button>
        <ExportToExcel books={books} />
      </div>
      <div>
        <Search searchTerm={searchTerm} handleSearch={handleSearch} />
        <FilterBooks />
        <Sort sortType={sortType} onSort={sortBooks} />
      </div>
      {renderBookTable()}
      <AvailableStock books={books} />
      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={books.length}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
      {showAddBookForm && <AddBook onClose={closeAddBookForm} />}
      {showEditBookForm && <EditBook book={currentBook} onClose={closeEditBookForm} />}
      {editing && <EditBook book={currentBook} onClose={closeEditBookForm} />}
      {showDeleteBookForm && <DeleteBook book={currentBook} onClose={closeDeleteBookForm} />}
    </div>
  );
}
