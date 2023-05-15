import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, Navbar, Container, Modal, Button } from 'react-bootstrap';
import UserDashboardNavbar from '../pages/Dashboard/UserDashboard/UserDashboardNavbar';
import AdminDashboardNavbar from '../pages/Dashboard/AdminDashboard/AdminNavbar';
import { MdExitToApp } from 'react-icons/md';
import Logo from '../assets/the-book-bower-logo.png';
import './Navigation.css';

function Navigation() {
  const { token, user } = localStorage;
  const isLoggedIn = !!token;
  const isAdmin = user && JSON.parse(user);
  const [editMode, setEditMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

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
            <Nav.Link as={Link} to="/contact">
              Contact Us
            </Nav.Link>
            {isLoggedIn && !isAdmin ? (
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
            ) : null}
          </Nav>
          {isLoggedIn ? (
            <Nav className="ml-auto">
              {isAdmin ? (
                <span className="navbar-text">
                  Welcome, {isAdmin.name || 'Admin'}!
                </span>
              ) : null}
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
            </Nav>
          )}
          {isLoggedIn && !isAdmin ? <UserDashboardNavbar /> : null}
          {isLoggedIn && isAdmin ? <AdminDashboardNavbar /> : null}
          {isLoggedIn ? (
            <Nav className="logout-btn">
              <Nav.Link onClick={() => setShowLogoutModal(true)}>
                <MdExitToApp />
              </Nav.Link>
            </Nav>
          ) : null}
        </Navbar.Collapse>
      </Container>
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton className="close">
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
    </Navbar>
  );
}


export default Navigation;