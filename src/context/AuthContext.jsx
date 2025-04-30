import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true); // initially loading

  useEffect(() => {
    const fetchUser = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
      withCredentials: true, // Send cookies
    });
    setAuthUser(res.data.user);
  } catch (err) {
    console.error("❌ Failed to fetch user:", err.response?.data || err.message);
    setAuthUser(null);
  }
  setLoading(false);
};


    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
