import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import BooksPage from './pages/BooksPage';
// import BookDetails from './components/BookDetails';
import Borrow from './components/BorrowForm';
import Return from './components/ReturnForm';
import SearchBar from './components/SearchBar';
import About from './pages/About';
import Contact from './pages/ContactPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import Admin from './pages/Admin';

function AppRoutes() {
  return (
    <Router>
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
    </Router>
  );
}

export default AppRoutes;
