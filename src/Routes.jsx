import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Navigation  from './components/Navigation';
import Home from './pages/Home/HomePage';
import BooksPage from './pages/Books/BooksPage';
// import BookDetails from './pages/Books/BookDetails';
import Borrow from './pages/Dashboard/UsersDashboard/BorrowForm';
import Return from './pages/Dashboard/UsersDashboard/ReturnForm';
import SearchBar from './pages/Books/SearchBar';
import About from './pages/About';
import Contact from './pages/Contact/ContactPage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import User from './pages/Dashboard/UserDashboard/User';
import Admin from './pages/Dashboard/AdminDashboard/Admin';
import  Footer  from './components/Footer';

function AppRoutes() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/bookspage" element={<BooksPage />} />
        {/* <Route exact path="/books/:id" element={<BookDetails />} /> */}
        <Route exact path="/borrowform" element={<Borrow />} />
        <Route exact path="/returnform" element={<Return />} />
        <Route exact path="/searchbar" element={<SearchBar />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contactpage" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/user" element={<User />} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRoutes;
