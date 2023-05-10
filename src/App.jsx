import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRoutes from './Routes';
import CustomCursor from '../src/components/CustomCursor';
import './App.css';

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <Router>
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
