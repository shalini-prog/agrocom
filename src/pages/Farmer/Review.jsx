import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Review.css';

const FarmerReviews = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFarmerReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reviews/farmer`, {
        withCredentials: true,
      });
      setReviewsData(res.data.reviews || []);
    } catch (err) {
      console.error('Error fetching reviews:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmerReviews();
  }, []);

  return (
    <div className="farmer-reviews-container">
      <h2>Product Reviews</h2>
      {loading ? (
        <p className="loading-text">Loading reviews...</p>
      ) : reviewsData.length === 0 ? (
        <p className="no-reviews-text">No reviews available.</p>
      ) : (
        reviewsData.map((product) => (
          <div key={product.productId} className="review-card">
            <h3>{product.productTitle}</h3>
            {product.reviews.length === 0 ? (
              <p className="no-reviews-text">No reviews for this product.</p>
            ) : (
              product.reviews.map((review) => (
                <div key={review._id} className="review-item">
                  <p><strong>{review.customer?.name || 'Anonymous'}:</strong> {review.comment}</p>
                  <p className="rating">Rating: ⭐ {review.rating}</p>
                </div>
              ))
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default FarmerReviews;
