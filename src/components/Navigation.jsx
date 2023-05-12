import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, Navbar, Container, Modal, Button } from 'react-bootstrap';
import UserDashboardNavbar from '../pages/Dashboard/UserDashboard/UserDashboardNavbar';
import AdminDashboardNavbar from '../pages/Dashboard/AdminDashboard/AdminNavbar';
import Logo from '../assets/the-book-bower-logo.png';
import './Navigation.css';

function Navigation() {
  const isLoggedIn = !!localStorage.getItem('token');
  const isAdmin = JSON.parse(window.localStorage.getItem('user'))
  // console.log(isAdmin)
  const [editMode, setEditMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  console.log('isAdmin:', isAdmin); 
  console.log(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutModal(false);
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg"  fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/"><img src={Logo}alt="the-book-bower.png" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/bookspage">Books</Nav.Link>
            {isAdmin && (
              <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
            )}
            {isLoggedIn && !isAdmin && (
              <>
                <Nav.Link as={Link} to="/searchbar">Search Books</Nav.Link>
                <Nav.Link as={Link} to={isAdmin.role_name === 'admin' ? '/admin' : '/user'}>Dashboard</Nav.Link>
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
      {isLoggedIn && !isAdmin && <UserDashboardNavbar />}
      {isLoggedIn && isAdmin && <AdminDashboardNavbar />}
    </Navbar>
  );
}

export default Navigation;
