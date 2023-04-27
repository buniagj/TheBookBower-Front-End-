import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import SearchBar from './pages/Books/SearchBar';
import BooksPage from './pages/Books/BooksPage';
// import BookDetails from './pages/Books/BookDetails';
import BorrowForm from './pages/Dashboard/UserDashboard/BorrowForm';
import ReturnForm from './pages/Dashboard/UserDashboard/ReturnForm';
import About from './pages/About/About';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import User from './pages/Dashboard/UserDashboard/User';
import Admin from './pages/Dashboard/AdminDashboard/Admin';
import  Footer  from './components/Footer';
import  Navigation  from './components/Navigation';
import ErrorBoundary from './pages/Dashboard/AdminDashboard/ErrorBoundary';
import ForgotPassword from './pages/Auth/ForgotPassword';


function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
        <Route exact path="/searchbar" element={<ErrorBoundary><SearchBar /></ErrorBoundary>} />
        {/* <Route exact path="/books/:id" element={<ErrorBoundary><BookDetails /></ErrorBoundary>} /> */}
        <Route exact path="/borrowform" element={<ErrorBoundary><BorrowForm /></ErrorBoundary>} />
        <Route exact path="/returnform" element={<ErrorBoundary><ReturnForm /></ErrorBoundary>} />
        <Route exact path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
        <Route exact path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
        <Route exact path="/signup" element={<ErrorBoundary><Signup /></ErrorBoundary>} />
        <Route exact path="/bookspage" element={<ErrorBoundary><BooksPage /></ErrorBoundary>} />
        <Route exact path="/user" element={<ErrorBoundary><User /></ErrorBoundary>} />
        <Route exact path="/admin" element={<ErrorBoundary><Admin /></ErrorBoundary>} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;
