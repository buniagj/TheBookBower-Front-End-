import React from 'react';
import { Link } from 'react-router-dom';
import { BsBell, BsGear } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi'; 
import './AdminNavbar.css'; 

function AdminDashboardNavbar() {
  console.log('Rendering Admin DashboardNavbar');
  return (
    <nav>
      <ul className="icon-row">
        <li>
          <Link to="/admin" title="My Dashboard">
            <BiUser size={24} className="icon-purple" />
            <span className="sr-only">My Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/notifications" title="Notifications">
            <BsBell size={24} className="icon-purple" />
            <span className="sr-only">Notifications</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" title="Settings">
            <BsGear size={24} className="icon-purple" />
            <span className="sr-only">Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminDashboardNavbar;
