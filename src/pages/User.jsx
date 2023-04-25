import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookTable from '../components/BookTable';

function UserDashboard() {
  const [user, setUser] = useState({});
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);

  useEffect(() => {
    // Fetch user data from the server
    axios.get('/api/user')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    // Fetch user's borrowed books from the server
    axios.get('/api/borrowed-books')
      .then(response => {
        setBorrowedBooks(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    // Fetch user's returned books from the server
    axios.get('/api/returned-books')
      .then(response => {
        setReturnedBooks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <p>Your email address is: {user.email}</p>
      <p>You joined on: {user.created_at}</p>

      <h2>Borrowed Books</h2>
      <BookTable books={borrowedBooks} />

      <h2>Returned Books</h2>
      <BookTable books={returnedBooks} />
    </div>
  );
}

export default UserDashboard;
