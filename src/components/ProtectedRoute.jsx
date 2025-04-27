import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { authUser, loading } = useAuth(); // 👈 access loading

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-lg">Loading...</div>;
  }

  if (!authUser) return <Navigate to="/login" />;
  if (authUser.role !== role && authUser.role !== "admin") return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
