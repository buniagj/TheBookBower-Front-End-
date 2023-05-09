import React from 'react';
import '../../../assets/owl.png';
import './Admin.css';

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="card-container">
        <Link to="/borrowedtable" className="card">
          <img src={image} alt="Borrowed Books" />
          <div className="label">Borrowed Books</div>
        </Link>
        <Link to="/returnedtable" className="card">
          <img src={image} alt="Returned Books" />
          <div className="label">Returned Books</div>
        </Link>
        <Link to="/manageusers" className="card">
          <img src={image} alt="User Management" />
          <div className="label">User Management</div>
        </Link>
        <Link to="/managebooks" className="card">
          <img src={image} alt="Book Management" />
          <div className="label">Book Management</div>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
