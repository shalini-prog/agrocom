import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/user-dashboard"
            element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>}
          />
          <Route
            path="/farmer-dashboard"
            element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>}
          />
          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
