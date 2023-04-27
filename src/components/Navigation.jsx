import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import UserDashboardNavbar from '../pages/Dashboard/UserDashboard/UserDashboardNavbar';
import Logo from '../assets/the-book-bower-logo.png';
import './Navigation.css';

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
    <Navbar bg="light" expand="lg"  fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/"><img src={Logo}alt="the-book-bower.png" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
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
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {isLoggedIn && <UserDashboardNavbar />}
    </Navbar>
  );
}

export default Navigation;
