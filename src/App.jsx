import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes";
import "./App.css";

const App = ({ notificationCount }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="App">
        <AppRoutes user={user} handleLogout={handleLogout} notificationCount={notificationCount} />
      </div>
    </Router>
  );
};

export default App;
