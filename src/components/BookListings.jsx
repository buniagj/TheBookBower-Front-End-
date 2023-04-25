import React, { useEffect, useState } from 'react';
import Pagination from '../functionality/Pagination';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get('/api/books'); // Replace with your Laravel API endpoint
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Year: {book.year}</p>
          </li>
        ))}
      </ul>
      <Pagination />
    </div>
  );
}

export default BookList;
