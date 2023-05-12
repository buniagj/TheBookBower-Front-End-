import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, Navbar, Container, Modal, Button } from 'react-bootstrap';
import UserDashboardNavbar from '../pages/Dashboard/UserDashboard/UserDashboardNavbar';
import AdminDashboardNavbar from '../pages/Dashboard/AdminDashboard/AdminNavbar';
import { MdExitToApp } from 'react-icons/md'
import Logo from '../assets/the-book-bower-logo.png';
import './Navigation.css';

function Navigation() {
  const isLoggedIn = !!localStorage.getItem('token');
  const isAdmin = JSON.parse(window.localStorage.getItem('user'));
  const [editMode, setEditMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  console.log('isAdmin:', isAdmin);
  console.log(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowLogoutModal(false);
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="the-book-bower.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/bookspage">
              Books
            </Nav.Link>
            {isLoggedIn && !isAdmin && (
              <>
                <Nav.Link as={Link} to="/searchbar">
                  Search Books
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={isAdmin.role_name === 'admin' ? '/admin' : '/user'}
                >
                  Dashboard
                </Nav.Link>
              </>
            )}
          </Nav>
          {isLoggedIn && (
            <Nav className="ml-auto">
              <span className="navbar-text">Welcome, {isAdmin.name}!</span>
              <div className="nav-spacer"></div>
            </Nav>
          )}
          {!isLoggedIn && (
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
        {isLoggedIn && !isAdmin && <UserDashboardNavbar />}
        {isLoggedIn && isAdmin && <AdminDashboardNavbar />}
        <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Logout</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to logout?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Navbar>
  );
}

export default Navigation;
