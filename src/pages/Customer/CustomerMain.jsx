import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './CustomerMain.css'
import CustomerProducts from './Product';
import CustomerOrders from './Orders';
import CustomerCart from './Cart';
import CustomerReviews from './Reviews';


const CustomerMainDashboard = () => {
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
            <h2 className="content-title">Welcome to your Customer Dashboard!</h2>
            <ul className="tips-list">
              <li>🛒 Browse and purchase fresh farm products directly from farmers.</li>
              <li>📂 View and manage your orders easily in one place.</li>
              <li>🛍️ Add products to your cart and place orders with just a few clicks.</li>
              <li>❌ Cancel orders conveniently before they are processed.</li>
              <li>⭐ Leave reviews and feedback to help others and support farmers.</li>
            </ul>
          </div>
        );
      case 'products':
        return <CustomerProducts/>
      case 'cart':
        return <  CustomerCart/>
      case 'orders':
        return <CustomerOrders/>
      case 'review':
        return <CustomerReviews/>
      default:
        return <h2 className="content-title">Welcome!</h2>;
    }
  };
  

  return (
    <div className="main-dashboard-container">
    {sidebarOpen && (
      <aside className="sidebar">
        <h3 onClick={() => setSidebarOpen(prev => !prev)} className="sidebar-title">Customer Panel</h3>
        <nav className="nav-links">
          <button onClick={() => setActiveTab('home')} className="nav-btn">Dashboard</button>
          <button onClick={() => setActiveTab('products')} className="nav-btn">Products</button>
          <button onClick={() => setActiveTab('cart')} className="nav-btn">Cart</button>
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

export default CustomerMainDashboard;
