import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookTable from '../BookTable';


function UserDashboard() {
  const [user, setUser] = useState({});
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '' });

  useEffect(() => {
    // Fetch user data from the server
    axios.get('/api/user')
      .then(response => {
        setUser(response.data);
        setUpdatedUser(response.data); // Set the initial value for updatedUser
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

  function handleEdit() {
    setEditMode(true);
  }

  function handleCancel() {
    setEditMode(false);
    setUpdatedUser(user); // Reset updatedUser to the original value
  }

  function handleSave() {
    // Update the user's information on the server
    axios.put('/api/user', updatedUser)
      .then(response => {
        setUser(response.data);
        setEditMode(false);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      {editMode ? (
        <>
          <label>
            Name:
            <input type="text" name="name" value={updatedUser.name} onChange={handleInputChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={updatedUser.email} onChange={handleInputChange} required />
          </label>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <p>Welcome, {user.name}!</p>
          <p>Your email address is: {user.email}</p>
          <p>You joined on: {user.created_at}</p>
          <button type="button" onClick={handleEdit}>Edit</button>
        </>
      )}

      <h2>Borrowed Books</h2>
      <BookTable books={borrowedBooks} />

      <h2>Returned Books</h2>
      <BookTable books={returnedBooks} />
    </div>
  );
}

export default UserDashboard;
