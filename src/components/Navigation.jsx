import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import UserDashboardNavbar from '../pages/Dashboard/UserDashboard/UserDashboardNavbar';

function Navigation() {
  const isLoggedIn = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('role') === 'admin';
  const [editMode, setEditMode] = useState(false);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // remove role from local storage as well
    window.location.replace('/login');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">The Book Bower</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/bookspage">Books</Nav.Link>
          {isLoggedIn && (
            <>
              <Nav.Link as={Link} to="/searchbar">Search Books</Nav.Link>
              <Nav.Link as={Link} to={isAdmin ? '/admin' : '/user'}>Dashboard</Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          {isLoggedIn ? (
            <>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              {isAdmin && (
                <Nav.Link as={Link} to="/createbook">Create Book</Nav.Link>
              )}
              {isLoggedIn && isAdmin ? (
                <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/user">User Dashboard</Nav.Link>
              )}
              {isLoggedIn && isAdmin ? (
                <Nav.Link as={Link} to="/manageusers">Manage Users</Nav.Link>
              ) : (
                <></>
              )}
              {isLoggedIn && (
                <UserDashboardNavbar
                  editMode={editMode}
                  setEditMode={setEditMode}
                />
              )}
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
