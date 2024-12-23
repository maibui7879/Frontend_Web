import React, { createContext, useState, useContext } from "react";

// Create AuthContext to manage login state
const AuthContext = createContext();

// Create a provider to manage login/logout states
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true); // Set login state to true
  };

  const logout = () => {
    setIsLoggedIn(false); // Set login state to false
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext state
export const useAuth = () => useContext(AuthContext);
