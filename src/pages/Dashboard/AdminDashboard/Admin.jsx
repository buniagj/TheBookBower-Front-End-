import React from 'react';
import { Link } from 'react-router-dom';
import usermanagement from '../../../assets/user_management.png';
import bookmanagement from '../../../assets/book_management.png';
import './Admin.css';
import './Admin.css';

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="card-container">
        <Link to="/manageusers" className="card">
          <img src={usermanagement} alt="User Management" />
          <div className="label">User Management</div>
        </Link>
        <Link to="/managebooks" className="card">
          <img src={bookmanagement} alt="Book Management" />
          <div className="label">Book Management</div>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
