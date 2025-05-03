import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Review.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reviews/my`, {
        withCredentials: true,
      });
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      toast.error('Failed to fetch reviews.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/reviews/${reviewId}`, {
        withCredentials: true,
      });
      toast.success('Review deleted successfully!');
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (err) {
      console.error('Error deleting review:', err);
      toast.error('Failed to delete review.');
    }
  };

  return (
    <div className="reviews-container">
      <ToastContainer position="top-right" />
      <h2 className="reviews-title">Your Reviews</h2>

      {loading ? (
        <p className="loading">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="no-reviews">You haven't written any reviews yet.</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review._id} className="review-card">
              <h3 className="product-title">
                {review.product?.title || 'Unknown Product'}
              </h3>
              <p><strong>Rating:</strong> {review.rating} / 5</p>
              <p><strong>Comment:</strong> {review.comment || 'No comment'}</p>
              <p className="review-date">
                <strong>Reviewed on:</strong>{" "}
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <button
                className="delete-button"
                onClick={() => handleDelete(review._id)}
              >
                Delete Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
