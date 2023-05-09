import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookTable from '../BookTable';
import defaultProfilePhoto from '../../../assets/owl.png';
import '../AdminDashboard/Admin.css';

function UserDashboard() {
  const [user, setUser] = useState({});
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '' });
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  
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

  function handlePhotoUpload(event) {
    setIsUploadingPhoto(true);
    const formData = new FormData();
    formData.append('photo', event.target.files[0]);

    axios.post('/api/user/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setUser(response.data);
        setIsUploadingPhoto(false);
      })
      .catch(error => {
        console.error(error);
        setIsUploadingPhoto(false);
      });
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <div className="user-info">
        <div className="profile-photo">
          <img
            src={user.profile_photo_url || defaultProfilePhoto}
            alt="Profile"
            onClick={() => document.getElementById('photo-upload').click()}
          />
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
          />
          {isUploadingPhoto && <p>Uploading...</p>}
        </div>
        <div className="user-details">
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
              <div className="buttons">
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSave}>Save</button>
              </div>
            </>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <button onClick={handleEdit}>Edit</button>
            </>
          )}
        </div>
      </div>
      <div className="borrowed-books">
        <h2><i className="fas fa-book"></i> Borrowed Books</h2>
        <BookTable books={borrowedBooks} />
      </div>
      <div className="returned-books">
        <h2><i className="fas fa-history"></i> Returned Books</h2>
        <BookTable books={returnedBooks} />
      </div>
    </div>
  );
}

export default UserDashboard;