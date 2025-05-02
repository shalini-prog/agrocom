import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomerReviews.css'; // Style this separately

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reviews/display/${userId}`, {
        withCredentials: true,
      });
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      alert('Failed to fetch reviews.');
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/reviews/${reviewId}/review`, {
        withCredentials: true,
      });
      alert('Review deleted successfully!');
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Failed to delete review.');
    }
  };

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">Your Reviews</h2>
      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews yet.</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review._id} className="review-card">
              <h3 className="product-title">{review.product?.title || 'Unknown Product'}</h3>
              <p><strong>Rating:</strong> {review.rating}/5</p>
              <p><strong>Comment:</strong> {review.comment}</p>
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
