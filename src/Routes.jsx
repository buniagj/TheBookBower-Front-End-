import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Books from './components/Books';
import BookDetails from './components/BookDetails';
import Borrow from './components/BorrowForm';
import Return from './components/ReturnForm';
import About from './pages/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function Routes() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route exact path="/books" component={Books} />
        <Route exact path="/books/:id" component={BookDetails} />
        <Route exact path="/borrow" component={Borrow} />
        <Route exact path="/return" component={Return} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Routes>
    </Router>
  );
}

export default Routes;
