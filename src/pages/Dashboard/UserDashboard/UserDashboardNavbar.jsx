import React from 'react';
import { Link } from 'react-router-dom';

function UserDashboardNavbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/Dashboard/UserDashboard/ReturnForm">Return Form</Link></li>
        <li><Link to="/Dashboard/UserDashboard/BorrowForm">Borrow Form</Link></li>
        <li><Link to="/Dashboard/Notifications">Notifications</Link></li>
        <li><Link to="/Dashboard/settings">Settings</Link></li>
      </ul>
    </nav>
  );
}

export default UserDashboardNavbar;
