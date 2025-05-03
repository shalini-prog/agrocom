import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerMain from "./pages/Farmer/FarmerMain";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerMain from "./pages/Customer/CustomerMain";
import AdminMain from "./pages/Admin/AdminMain";
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-wrapper">
          <main className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/user-dashboard"
                element={
                  <ProtectedRoute role="user">
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/user/dashboard/main"
                element={
                  <ProtectedRoute role="user">
                    <CustomerMain />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/farmer-dashboard"
                element={
                  <ProtectedRoute role="farmer">
                    <FarmerDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/farmer/dashboard/main"
                element={
                  <ProtectedRoute role="farmer">
                    <FarmerMain />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/dashboard/main"
                element={
                  <ProtectedRoute role="farmer">
                    <AdminMain />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
