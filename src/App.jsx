import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./components/Theme";
import AppRoutes from "./Routes";

const App = ({ notificationCount }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  useEffect(() => {
    const preferredTheme = localStorage.getItem("preferredTheme");
    if (preferredTheme) {
      setTheme(preferredTheme);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("preferredTheme", newTheme);
  };

  return (
    <ChakraProvider theme={customTheme[theme]}>
      <Router>
        <div className="App">
          <AppRoutes
            user={user}
            handleLogout={handleLogout}
            handleThemeChange={handleThemeChange}
            notificationCount={notificationCount}
          />
        </div>
      </Router>
    </ChakraProvider>
  );
};

export default App;
