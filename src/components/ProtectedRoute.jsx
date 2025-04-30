import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './ProtectedRoute.css'

const ProtectedRoute = ({ children, role }) => {
  const { authUser, loading } = useAuth(); // 👈 access loading

  
  if (loading) {
    console.log("Loading user...");
      return <div className="loading-screen">Loading...</div>;
  }
    
  

  if (!authUser) {
    console.log("User not authenticated.");
    return <Navigate to="/" replace/>
  };
  if (authUser.role !== role && authUser.role !== "admin"){
    console.log("User role unauthorized:", authUser.role); 
    return <Navigate to="/"  replace/>;
  }
  return children;
};

export default ProtectedRoute;
