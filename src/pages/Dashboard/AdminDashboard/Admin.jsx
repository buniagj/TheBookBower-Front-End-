import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../../assets/owl.png';
import './Admin.css';
// import { Link } from "react-router-dom"
// import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="card-container">
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
