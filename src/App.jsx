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
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/">
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>
        </Route>
        <Route exact path="/books">
          <ErrorBoundary>
            <Books />
          </ErrorBoundary>
        </Route>
        <Route exact path="/books/:id">
          <ErrorBoundary>
            <BookDetails />
          </ErrorBoundary>
        </Route>
        <Route exact path="/borrow">
          <ErrorBoundary>
            <Borrow />
          </ErrorBoundary>
        </Route>
        <Route exact path="/return">
          <ErrorBoundary>
            <Return />
          </ErrorBoundary>
        </Route>
        <Route exact path="/about">
          <ErrorBoundary>
            <About />
          </ErrorBoundary>
        </Route>
        <Route exact path="/login">
          <ErrorBoundary>
            <Login />
          </ErrorBoundary>
        </Route>
        <Route exact path="/signup">
          <ErrorBoundary>
            <Signup />
          </ErrorBoundary>
        </Route>
        <Route exact path="/dashboard">
          <ErrorBoundary>
            <Dashboard />
          </ErrorBoundary>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
