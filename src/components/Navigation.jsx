import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, Navbar, Container, Modal, Button } from 'react-bootstrap';
import UserDashboardNavbar from '../pages/Dashboard/UserDashboard/UserDashboardNavbar';
import AdminDashboardNavbar from '../pages/Dashboard/AdminDashboard/AdminNavbar';
import Logo from '../assets/the-book-bower-logo.png';
import './Navigation.css';

function Navigation() {
  const isLoggedIn = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('role_name') === 'admin';
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
    <>
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
            </Nav>
            <Nav className="justify-content-end">
              {isLoggedIn ? (
                <>
                  <Nav.Link className="nav-link-custom" onClick={() => setShowLogoutModal(true)}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link className="nav-link-custom" as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link className="nav-link-custom" as={Link} to="/signup">
                    Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
        {isLoggedIn && isAdmin && <AdminDashboardNavbar />}
        {isLoggedIn && !isAdmin && <UserDashboardNavbar />}
      </Navbar>

      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Navigation;
