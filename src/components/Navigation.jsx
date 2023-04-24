import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const isLoggedIn = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('role') === 'admin';

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // remove role from local storage as well
    window.location.replace('/login');
  }

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/borrow">Borrow a Book</Link></li>
        <li><Link to="/return">Return a Book</Link></li>
        <li><Link to="/about">About</Link></li>
        {isLoggedIn ? (
          <>
            <li><Link to={isAdmin ? '/admin' : '/user'}>Dashboard</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
