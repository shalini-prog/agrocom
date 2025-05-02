import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/farmer/orders`, {
        withCredentials: true,
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error('Error fetching farmer orders:', err);
    }
  };

  const handleAccept = async (orderId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/accept/${orderId}`, {}, {
        withCredentials: true,
      });
      alert('Order accepted!');
      fetchOrders();
    } catch (err) {
      console.error('Error accepting order:', err);
      alert('Failed to accept order');
    }
  };

  const handleComplete = async (orderId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/complete/${orderId}`, {}, {
        withCredentials: true,
      });
      alert('Order completed!');
      fetchOrders();
    } catch (err) {
      console.error('Error completing order:', err);
      alert('Failed to complete order');
    }
  };

  const handleCancel = async (orderId) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/cancel/${orderId}`, {}, {
        withCredentials: true,
      });
      alert('Order cancelled!');
      fetchOrders();
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('Failed to cancel order');
    }
  };

  return (
    <div className="farmer-orders-container">
      <h2 className="farmer-orders-title">Customer Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <p><strong>Product:</strong> {order.product?.title}</p>
            <p><strong>Customer:</strong> {order.customer?.name} ({order.customer?.email})</p>
            <p><strong>Price:</strong> ₹{order.product?.price}</p>
            <p><strong>Status:</strong> {order.status}</p>

            <div className="order-buttons">
              {order.status === 'pending' && (
                <>
                  <button className="btn accept" onClick={() => handleAccept(order._id)}>Accept</button>
                  <button className="btn cancel" onClick={() => handleCancel(order._id)}>Cancel</button>
                </>
              )}
              {order.status === 'accepted' && (
                <button className="btn complete" onClick={() => handleComplete(order._id)}>Complete</button>
              )}
              {order.status === 'completed' && (
                <span className="status completed">Completed</span>
              )}
              {order.status === 'cancelled' && (
                <span className="status cancelled">Cancelled</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FarmerOrders;
