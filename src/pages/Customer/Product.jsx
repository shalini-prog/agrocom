// CustomerProducts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Product.css';

const CustomerProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/customer/view`, {
        withCredentials: true,
      });
      setProducts(res.data.products);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleOrder = async (productId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
        { productId, quantity: 1 },
        { withCredentials: true }
      );
      alert('Order placed successfully!');
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order.');
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/cart/add`,
        { productId, quantity: 1 },
        { withCredentials: true }
      );
      alert('Added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add to cart.');
    }
  };

  return (
    <div className="customer-products-container">
      <h3 className="customer-title">Available Products</h3>
      <div className="customer-product-list">
        {products.map((product) => (
          <div key={product._id} className="customer-product-card">
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.title} className="customer-product-image" />
            )}
            <div className="customer-product-details">
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <p>Type: {product.type}</p>
              <p>Price: ₹{product.price}</p>
              <p>Available: {product.quantity}</p>
            </div>
            <div className="customer-buttons">
              <button onClick={() => handleOrder(product._id)} className="customer-order-btn">Order</button>
              <button onClick={() => handleAddToCart(product._id)} className="customer-cart-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerProducts;
