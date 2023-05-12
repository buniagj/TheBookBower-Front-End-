import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboardNavbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/Dashboard/Notifications">Notifications</Link></li>
        <li><Link to="/Dashboard/settings">Settings</Link></li>
      </ul>
    </nav>
  );
}

export default AdminDashboardNavbar;
