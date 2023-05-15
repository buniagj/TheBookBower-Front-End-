import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AppErrorBoundary from './components/AppErrorBoundary';
import Home from './pages/Home/HomePage';
import BooksPage from './pages/Books/BooksPage';
import BookDetails from './pages/Books/BookDetails';
import BorrowForm from './pages/Dashboard/UserDashboard/BorrowForm';
import ReturnForm from './pages/Dashboard/UserDashboard/ReturnForm';
import SearchBar from './pages/Books/SearchBar';
import About from './pages/About/About';
import Contact from './pages/Contact/ContactPage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import UserDashboard from './pages/Dashboard/UserDashboard/User';
import AdminDashboard from './pages/Dashboard/AdminDashboard/Admin';
import ForgotPassword from './pages/Auth/ForgotPassword';
import BorrowedTable from './pages/Dashboard/BorrowedTable';
import ReturnedTable from './pages/Dashboard/ReturnedTable';
import ManageUsers from './pages/Dashboard/AdminDashboard/ManageUsers';
import BookTable from './pages/Dashboard/BookTable';
import BookForm from './pages/Dashboard/BookForm';
import ManageBooks from './pages/Dashboard/AdminDashboard/ManageBooks';
import Notifications from './pages/Dashboard/Notifications';
import Settings from './pages/Dashboard/Settings';
import PrivacyPolicy from './pages/Auth/PrivacyPolicy';
import TermsOfUse from './pages/Auth/TermsOfUse';
import EditProfile from './pages/Dashboard/UserDashboard/EditProfile';
import AddUsers from './pages/Dashboard/AdminDashboard/AddUsers';

const AppRoutes = ({ user, admin, notificationCount }) => {
  const isAdmin = user?.role === "admin";

  return (
    <AppErrorBoundary>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/bookspage" element={<BooksPage />} />
        <Route exact path="/books/:id" element={<BookDetails />} />
        <Route exact path="/borrowform" element={<BorrowForm />} />
        <Route exact path="/returnform" element={<ReturnForm />} />
        <Route exact path="/searchbar" element={<SearchBar />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/user" element={<UserDashboard user={user} />} />
        <Route exact path="/admin" element={<AdminDashboard user={admin} />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/borrowedtable" element={<BorrowedTable />} />
        <Route exact path="/returnedtable" element={<ReturnedTable />} />
        <Route exact path="/manageusers" element={<ManageUsers />} />
        <Route exact path="/booktable" element={<BookTable />} />
        <Route exact path="/bookform" element={<BookForm />} />
        <Route exact path="/managebooks" element={<ManageBooks />} />
        <Route exact path="/notifications" element={<Notifications notificationCount={notificationCount} />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route exact path="/privacy" element={<PrivacyPolicy />} />
        <Route exact path="/terms" element={<TermsOfUse />} />
        <Route exact path="/edit-profile" element={<EditProfile />} />
        <Route exact path="/adduser" element={<AddUsers />} />
      </Routes>
      <Footer />
    </AppErrorBoundary>
  );
};

export default AppRoutes;
