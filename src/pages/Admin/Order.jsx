import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AOrder.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/orders`, {
        withCredentials: true,
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/orders/${orderId}`, {
          withCredentials: true,
        });
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
        alert('Order deleted successfully');
      } catch (err) {
        console.error('Error deleting order:', err);
        alert('Failed to delete order');
      }
    }
  };

  return (
    <div className="admin-orders-container">
      <h2>All Orders</h2>

      {loading ? (
        <p className="loading-text">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="no-orders">No orders available</p>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Farmer</th>
                  <th>Product</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.customer.name}</td>
                    <td>{order.farmer.name}</td>
                    <td>{order.product.title}</td>
                    <td>₹{order.totalAmount}</td>
                    <td>{order.status}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(order._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="order-cards-wrapper">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                <div className="order-row"><span className="order-label">Order ID:</span><span>{order._id}</span></div>
                <div className="order-row"><span className="order-label">Customer:</span><span>{order.customer.name}</span></div>
                <div className="order-row"><span className="order-label">Farmer:</span><span>{order.farmer.name}</span></div>
                <div className="order-row"><span className="order-label">Product:</span><span>{order.product.title}</span></div>
                <div className="order-row"><span className="order-label">Total Amount:</span><span>₹{order.totalPrice}</span></div>
                <div className="order-row"><span className="order-label">Status:</span><span>{order.status}</span></div>
                <button className="delete-btn" onClick={() => handleDelete(order._id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrders;
