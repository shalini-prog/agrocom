import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './AdminMain.css';
import AdminOrders from './Order';
import AdminUsers from './User';
import AdminReviews from './Review';
// import CustomerOrders from './CustomerOrders';
// import CustomerReviews from './CustomerReviews';

const AdminMain = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { setAuthUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setAuthUser(null);
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const renderContent = () => {
    try {
      switch (activeTab) {
        case 'home':
          return (
            <div className="home-content">
              <h2 className="content-title">Welcome to your Admin Dashboard!</h2>
              <ul className="tips-list">
                <li>🛡️ Ensure user data privacy and protect sensitive information.</li>
                <li>📊 Monitor platform activity for abuse or unauthorized access.</li>
                <li>⚖️ Enforce platform policies fairly.</li>
                <li>🔐 Secure access to admin functionalities.</li>
                <li>📝 Keep accurate records for accountability.</li>
                <li>📣 Handle user feedback responsibly.</li>
              </ul>
            </div>
          );
        case 'user':
          return <AdminUsers/>;
        case 'orders':
          return <AdminOrders/>
        case 'review':
          return <AdminReviews/>
        default:
          return <div>Invalid tab</div>;
      }
    } catch (err) {
      console.error('Error rendering content:', err);
      return <div>Error loading content. Please check the console.</div>;
    }
  };

  return (
    <div className="main-dashboard-container">
      {sidebarOpen && (
        <aside className="sidebar">
          <h3 onClick={() => setSidebarOpen((prev) => !prev)} className="sidebar-title">
            Admin Panel
          </h3>
          <nav className="nav-links">
            <button
              onClick={() => setActiveTab('home')}
              className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('user')}
              className={`nav-btn ${activeTab === 'user' ? 'active' : ''}`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className={`nav-btn ${activeTab === 'review' ? 'active' : ''}`}
            >
              Reviews
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </nav>
        </aside>
      )}

      <main className="main-content">
        <button className="toggle-sidebar-btn" onClick={() => setSidebarOpen((prev) => !prev)}>
          {sidebarOpen ? '' : '...'}
        </button>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminMain;
