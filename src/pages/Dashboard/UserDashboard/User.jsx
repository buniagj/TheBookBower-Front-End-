import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookTable from '../BookTable';
import defaultProfilePhoto from '../../../assets/owl.png';
import '../AdminDashboard/Admin.css';

function UserDashboard({ userId }) {
  const [user, setUser] = useState({});
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '' });
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      axios.get(`/api/user/${userId}`),
      axios.get(`/api/user/${userId}/borrowed-books`),
      axios.get(`/api/user/${userId}/returned-books`),
    ])
      .then(([userResponse, borrowedBooksResponse, returnedBooksResponse]) => {
        setUser(userResponse.data);
        setUpdatedUser(userResponse.data);
        setBorrowedBooks(borrowedBooksResponse.data);
        setReturnedBooks(returnedBooksResponse.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch data');
        setIsLoading(false);
      });
  }, [userId]);

  function handleEdit() {
    setEditMode(true);
  }

  function handleCancel() {
    setEditMode(false);
    setUpdatedUser(user);
  }

  function handleSave() {
    if (window.confirm('Are you sure you want to update your information?')) {
      setIsLoading(true);
      axios.put(`/api/user/${userId}`, updatedUser)
        .then(response => {
          setUser(response.data);
          setEditMode(false);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setError('Failed to update user information');
          setIsLoading(false);
        });
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  }

  function handlePhotoUpload(event) {
    setIsUploadingPhoto(true);
    const formData = new FormData();
    formData.append('photo', event.target.files[0]);

    axios.post(`/api/user/${userId}/photo`, formData, {
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
        setError('Failed to upload profile photo');
        setIsUploadingPhoto(false);
      });
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <div className="user-info">
            <div className="profile-photo">
              <img
                src={user.profile_photo_url || defaultProfilePhoto}
                alt={`${user.name}'s profile`}
              />
              <input
                type="file"
                name="photo"
                onChange={handlePhotoUpload}
                disabled={isUploadingPhoto}
              />
              {isUploadingPhoto && <p>Uploading photo...</p>}
            </div>
            <div className="user-details">
              {editMode ? (
                <div>
                  <input
                    type="text" name="name"
                    value={updatedUser.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="email"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleInputChange}
                  />
                  <div className="edit-buttons">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                  <button onClick={handleEdit}>Edit</button>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2>Borrowed Books</h2>
            <BookTable books={borrowedBooks} />
          </div>
          <div>
            <h2>Returned Books</h2>
            <BookTable books={returnedBooks} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
