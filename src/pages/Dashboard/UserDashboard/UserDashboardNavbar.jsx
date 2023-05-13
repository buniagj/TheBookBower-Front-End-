import React from 'react';
import { Link } from 'react-router-dom';
import { BsBell, BsGear } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { MdExitToApp } from 'react-icons/md';
import './UserNavbar.css';

function UserDashboardNavbar({ role, notificationCount }) {
  const isAdmin = role === "admin";
  console.log('Rendering UserDashboardNavbar');

  const dashboardUrl = isAdmin ? '/admin' : '/user';

  return (
    <nav>
      <ul className="icon-row">
        <li>
          <Link to={dashboardUrl} title="My Dashboard">
            <BiUser size={24} className="icon-purple" />
            <span className="sr-only">My Dashboard</span>
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link to="/admin" title="Admin Dashboard">
              <BiUser size={24} className="icon-purple" />
              <span className="sr-only">Admin Dashboard</span>
            </Link>
          </li>
        )}
        <li>
          <Link to="/notifications" title="Notifications">
            <BsBell size={24} className="icon-purple" />
            {notificationCount !== undefined && (
              <span className="notification-count">{notificationCount}</span>
            )}
            <span className="sr-only">Notifications</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" title="Settings">
            <BsGear size={24} className="icon-purple" />
            <span className="sr-only">Settings</span>
          </Link>
        </li>
        <li>
          <Link to="/logout" title="Logout">
            <MdExitToApp size={24} className="icon-purple" onClick={() => setShowLogoutModal(true)} />
            <span className="sr-only">Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserDashboardNavbar;
