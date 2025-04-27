
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch the current user
  const fetchCurrentUser = async () => {
    // Try to get the token from cookies
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwt-page='));

    // If no token, mark user as logged out
    if (!token) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
        withCredentials: true,
      });
      setAuthUser(res.data);
    } catch (error) {
      setAuthUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []); // Run this once when the component mounts

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
