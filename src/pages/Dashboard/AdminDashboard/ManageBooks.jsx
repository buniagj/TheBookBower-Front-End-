import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { sortByTitle, sortByAuthor, sortByStatus, sortByAvailableStock } from './Sort';
import FilterBooks from './FilterBook';
import Search from './Search';
import ChangeStatus from './ChangeStatus';
import AvailableStock from './AvailableStock';
import DeleteBook from './DeleteBook';
import EditBook from './EditBook';
import AddBook from './AddBook';
// import ExportToExcel from './ExportToExcel';
import Pagination from './Pagination';
import http from '../../../lib/https'
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

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
  const [meta, setMeta] = useState({});

  async function getBooks(page = 1) {
    const url = `/books?page=${page}`
    const res = await http.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    // console.log(res.data.data)
    setBooks(res.data.data)
    setMeta(res.data.meta)
  }
  useEffect(() =>{
    getBooks()
    return
  }, []) 

  // useEffect(() => {
  //   axios.get('/api/books')
  //     .then(response => {
  //       setBooks(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  const sortBooks = (type) => {
  setSortType(type);

  switch (type) {
    case "title":
      setBooks([...books.sort(sortByTitle)]);
      break;
    case "author":
      setBooks([...books.sort(sortByAuthor)]);
      break;
    case "status":
      setBooks([...books.sort(sortByStatus)]);
      break;
    case "availableStock":
      setBooks([...books.sort(sortByAvailableStock)]);
      break;
    default:
      break;
  }
};


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // const filteredBooks = currentBooks.filter(book =>
  //   book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   book.author.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const sortedBooks = filteredBooks.sort((a, b) => {
  //   const isReversed = (sortType === 'asc') ? 1 : -1;
  //   return isReversed * a.title.localeCompare(b.title);
  // });

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
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {books.map(book => (
    <tr key={book.id}>
      <td>{book.attributes.title}</td>
      <td>{book.attributes.author}</td>
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
<div className="actions">
<Search type="books" onChange={handleSearchChange} />
{/* <FilterBooks books={books} setBooks={setBooks} /> */}
<button onClick={addBook}>Add Book</button>
{/* <ExportToExcel books={books} /> */}
</div>
{renderBookTable()}
<Row>
  <Col>
    {meta.links && (
      <Pagination
        links={meta.links}
        active={meta.current_page}
        getUsers={getBooks}
      />
    )}
  </Col>
</Row>
{showAddBookForm && <AddBook closeAddBookForm={closeAddBookForm} />}
{showEditBookForm && (
<EditBook
       currentBook={currentBook}
       editing={editing}
       closeEditBookForm={closeEditBookForm}
     />
)}
{showDeleteBookForm && (
<DeleteBook
       currentBook={currentBook}
       closeDeleteBookForm={closeDeleteBookForm}
     />
)}
</div>
);
}
