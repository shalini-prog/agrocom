import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

import './FarmerMain.css';
import MyProducts from './Product';
import FarmerOrders from './Orders';
import FarmerNotifications from './Notification';
import FarmerReviews from './Review';

const FarmerMainDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { setAuthUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
      setAuthUser(null);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="home-content">
            <h2 className="content-title">Welcome to your Farmer Dashboard!</h2>
            <ul className="tips-list">
              <li>🌱 Rotate your crops to keep soil healthy.</li>
              <li>☀️ Monitor weather forecasts for better planning.</li>
              <li>💧 Use drip irrigation to save water.</li>
              <li>🐛 Use natural pesticides to protect crops.</li>
              <li>📈 Keep records of your farming activities for improvements.</li>
            </ul>
          </div>
        );
      case 'products':
        return <MyProducts/>
      case 'notifications':
        return <FarmerNotifications/>;
      case 'orders':
        return <FarmerOrders/>
      case 'review':
        return <FarmerReviews/>
      default:
        return <h2 className="content-title">Welcome!</h2>;
    }
  };
  

  return (
    <div className="main-dashboard-container">
    {sidebarOpen && (
      <aside className="sidebar">
        <h3 onClick={() => setSidebarOpen(prev => !prev)} className="sidebar-title">Farmer Panel</h3>
        <nav className="nav-links">
          <button onClick={() => setActiveTab('home')} className="nav-btn">Dashboard</button>
          <button onClick={() => setActiveTab('products')} className="nav-btn">My Products</button>
          <button onClick={() => setActiveTab('notifications')} className="nav-btn">Notifications</button>
          <button onClick={() => setActiveTab('orders')} className="nav-btn">Orders</button>
          <button onClick={() => setActiveTab('review')} className="nav-btn">Review</button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </aside>
    )}
  
    <main className="main-content">
      <button
        className="toggle-sidebar-btn"
        onClick={() => setSidebarOpen(prev => !prev)}
      >
        {sidebarOpen ? '' : '...'}
      </button>
  
      {renderContent()}
    </main>
  </div>
  
  );
};

export default FarmerMainDashboard;
