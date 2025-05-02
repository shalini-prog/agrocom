import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Product.css'; // Assuming styling is shared

const CustomerCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/view`, {
        withCredentials: true,
      });
      setCartItems(res.data.cart);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/cart/remove/${productId}`, {
        withCredentials: true,
      });
      alert('Removed from cart');
      fetchCart();
    } catch (err) {
      console.error('Error removing from cart:', err);
      alert('Failed to remove from cart');
    }
  };

  const handleOrder = async (productId, quantity) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
        productId,
        quantity,
      }, {
        withCredentials: true,
      });
      alert('Order placed!');
      fetchCart(); // Optional: refresh cart after ordering
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order');
    }
  };

  return (
    <div className="customer-products-container">
      <h3 className="customer-title">Your Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="customer-product-list">
          {cartItems.map(({ product, quantity }) => (
            <div key={product._id} className="customer-product-card">
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.title} className="product-image" />
              )}
              <div className="customer-product-details">
                <h4>{product.title}</h4>
                <p>Price: ₹{product.price}</p>
                <p>Quantity in Cart: {quantity}</p>
              </div>
              <div className="customer-buttons">
                <button className="customer-order-btn" onClick={() => handleOrder(product._id, quantity)}>
                  Order
                </button>
                <button className="customer-cart-btn" onClick={() => handleRemoveFromCart(product._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerCart;
