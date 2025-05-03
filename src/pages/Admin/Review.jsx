import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Review.css'; // optional for styling

const AdminReviews = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reviews/admin`, {
        withCredentials: true,
      });
      setReviewsData(res.data.reviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId, reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/reviews/${productId}/${reviewId}`,
        { withCredentials: true }
      );
      setReviewsData((prev) =>
        prev.map((product) =>
          product.productId === productId
            ? {
                ...product,
                reviews: product.reviews.filter((r) => r._id !== reviewId),
              }
            : product
        )
      );
      alert('Review deleted successfully');
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Failed to delete review');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="admin-reviews-container">
      <h2>All Product Reviews</h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviewsData.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        reviewsData.map((product) => (
          <div key={product.productId} className="product-review-section">
            <h3>{product.productTitle}</h3>
            {product.reviews.length === 0 ? (
              <p>No reviews for this product.</p>
            ) : (
              product.reviews.map((review) => (
                <div key={review._id} className="review-card">
                  <p><strong>Customer:</strong> {review.customer?.name || 'N/A'} ({review.customer?.email || 'N/A'})</p>
                  <p><strong>Rating:</strong> {review.rating}</p>
                  <p><strong>Comment:</strong> {review.comment}</p>
                  <button onClick={() => handleDelete(product.productId, review._id)} className="delete-review-btn">
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminReviews;
