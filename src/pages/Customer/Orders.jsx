// CustomerOrders.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [review, setReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/customer/orders`, {
        withCredentials: true,
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/order/${orderId}/cancel`, null, {
        withCredentials: true,
      });
      alert('Order cancelled successfully!');
      fetchOrders();
    } catch (err) {
      console.error('Error canceling order:', err);
    }
  };

  const handleReview = (productId) => {
    setSelectedProductId(productId);
    setShowReviewForm(true);
    setTimeout(() => {
      const el = document.getElementById('review-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReviewSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/reviews/${selectedProductId}`,
        {
          rating: Number(review.rating),
          comment: review.comment,
        },
        { withCredentials: true }
      );
      alert('Review submitted successfully!');
      setShowReviewForm(false);
      setReview({ rating: 5, comment: '' });
      fetchOrders();
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review.');
    }
  };

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-details">
              <h3>{order.product?.title || 'Product not found'}</h3>
              <p>Price: ₹{order.product?.price || 'N/A'}</p>
              <p>Status: {order.status}</p>
              {order.product?.image && (
                <img
                  src={order.product.image}
                  alt={order.product.title}
                  className="order-image"
                />
              )}
            </div>
            <div className="order-actions">
              {order.status === 'completed' && (
                <button onClick={() => handleReview(order.product._id)}>Leave Review</button>
              )}
              {order.status !== 'completed' && order.status !== 'cancelled' && (
                <button onClick={() => handleCancel(order._id)}>Cancel Order</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showReviewForm && (
        <div className="review-form" id="review-form">
          <h3>Leave a Review</h3>
          <label>Rating (1–5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: e.target.value })}
          />
          <label>Comment:</label>
          <textarea
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
          />
          <div className="review-buttons">
            <button onClick={handleReviewSubmit}>Submit</button>
            <button onClick={() => setShowReviewForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
