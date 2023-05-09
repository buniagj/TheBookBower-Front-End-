import React, { useState } from 'react';
import Sort from './AdminDashboard/Sort';
import Filter from './AdminDashboard/FilterBook';
import Search from './AdminDashboard/Search';
import AddBook from './AdminDashboard/AddBook';
import DeleteBook from './AdminDashboard/DeleteBook';
import EditBook from './AdminDashboard/EditBook';
import ChangeStatus from './AdminDashboard/ChangeStatus';
import ExportToExcel from './AdminDashboard/ExportToExcel';
import Pagination from './AdminDashboard/Pagination';

export default function BorrowedTable({ borrowedBooks, onDelete, onEdit, onChangeStatus, onAdd, isAdmin }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortType, setSortType] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);

  function handleSort(type) {
    if (type === sortType) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortType(type);
      setSortOrder('asc');
    }
  }

  function handleDelete(book) {
    onDelete(book);
  }

  function handleEdit(book) {
    onEdit(book);
  }

  function handleChangeStatus(book) {
    onChangeStatus(book);
  }

  function handleAdd(book) {
    onAdd(book);
  }

  const filteredBooks = (borrowedBooks ?? []).filter((book) => {
  if (filterStatus === '') {
    return true;
  }
  return book.status === filterStatus;
});

  const sortedBooks = filteredBooks.sort((book1, book2) => {
    if (sortType === '') {
      return 0;
    }
    let a, b;
    if (sortType === 'title') {
      a = book1.title.toLowerCase();
      b = book2.title.toLowerCase();
    } else if (sortType === 'author') {
      a = book1.author.toLowerCase();
      b = book2.author.toLowerCase();
    } else if (sortType === 'status') {
      a = book1.status.toLowerCase();
      b = book2.status.toLowerCase();
    }
    if (a > b) {
      return sortOrder === 'asc' ? 1 : -1;
    } else if (a < b) {
      return sortOrder === 'asc' ? -1 : 1;
    } else {
      return 0;
    }
  });

  const isAdminView = isAdmin ? true : false;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {isAdminView && <AddBook onSubmit={handleAdd} />}
      <div>
        <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Filter value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} />
        <Sort type={sortType} order={sortOrder} onSort={handleSort} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            {isAdminView && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.status}</td>
              {isAdminView && (
                <td>
                  <EditBook book={book} onEdit={handleEdit} />
                  <ChangeStatus book={book} onChangeStatus={handleChangeStatus} />
                  <DeleteBook book={book} onDelete={handleDelete} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={sortedBooks.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      {isAdminView && <ExportToExcel books={borrowedBooks} />}
    </div>
  );
}
