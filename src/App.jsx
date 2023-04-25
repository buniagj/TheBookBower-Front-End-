import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import  SearchBar  from './components/SearchBar';
import BooksPage from './pages/BooksPage';
import BookDetails from './components/BookDetails';
import  BorrowForm  from './components/BorrowForm';
import  ReturnForm  from './components/ReturnForm';
import  About  from './pages/About';
import  Login  from './pages/Login';
import  Signup  from './pages/Signup';
import  User  from './pages/User';
import  Admin  from './pages/Admin';
import  Footer  from './components/Footer';
import  Navigation  from './components/Navigation';
import  ErrorBoundary  from './functionality/ErrorBoundary';


function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
        <Route exact path="/searchbar" element={<ErrorBoundary><SearchBar /></ErrorBoundary>} />
        <Route exact path="/books/:id" element={<ErrorBoundary><BookDetails /></ErrorBoundary>} />
        <Route exact path="/borrowform" element={<ErrorBoundary><BorrowForm /></ErrorBoundary>} />
        <Route exact path="/returnform" element={<ErrorBoundary><ReturnForm /></ErrorBoundary>} />
        <Route exact path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
        <Route exact path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
        <Route exact path="/signup" element={<ErrorBoundary><Signup /></ErrorBoundary>} />
        <Route exact path="/bookspage" element={<ErrorBoundary><BooksPage /></ErrorBoundary>} />
        <Route exact path="/user" element={<ErrorBoundary><User /></ErrorBoundary>} />
        <Route exact path="/admin" element={<ErrorBoundary><Admin /></ErrorBoundary>} />
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;
