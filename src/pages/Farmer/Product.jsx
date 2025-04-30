import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css'; // Or switch to Tailwind if you prefer

const FarmerProducts = () => {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    title: '',
    type: '',
    description: '',
    price: '',
    quantity: '',
    image: null
  });
  const [editMode, setEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/farmer/my-products`, {
        withCredentials: true,
      });
      setProducts(res.data.products);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductForm({ ...productForm, image: file });
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(productForm).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      if (editingProductId) {
        // Update product
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/farmer/product/${editingProductId}`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert('Product updated successfully');
      } else {
        // Add product
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/farmer/product`, formData, {
          withCredentials: true,
        });
        alert('Product added successfully');
      }

      // Reset form and refresh
      setProductForm({
        title: '',
        type: '',
        description: '',
        price: '',
        quantity: '',
        image: null
      });
      setEditingProductId(null);
      setEditMode(false);
      fetchProducts();

    } catch (err) {
      console.error('Error submitting product:', err);
      alert('Error submitting product');
    }
  };

  

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/farmer/product/${productId}`, {
        withCredentials: true,
      });
      fetchProducts();
      alert('Product deleted successfully');
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Error deleting product');
    }
  };

  const handleEditClick = (product) => {
    setProductForm({
      title: product.title,
      type: product.type,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      image: null // new image can be uploaded
    });
    setEditingProductId(product._id);
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditingProductId(null);
    setProductForm({
      title: '',
      type: '',
      description: '',
      price: '',
      quantity: '',
      image: null
    });
  };

  return (
    <div className="farmer-products-container">
      <h3 className="title">Your Products</h3>

      {editMode && (
        <form onSubmit={handleSubmitProduct} className="product-form">
          <input
            type="text"
            name="title"
            value={productForm.title}
            onChange={handleChange}
            placeholder="Product Title"
            required
          />
          <input
            type="text"
            name="type"
            value={productForm.type}
            onChange={handleChange}
            placeholder="Product Type"
            required
          />
          <textarea
            name="description"
            value={productForm.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            type="number"
            name="price"
            value={productForm.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            type="number"
            name="quantity"
            value={productForm.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
          />
          <button type="submit" className="submit-btn">
            {editingProductId ? 'Update Product' : 'Add product'}
          </button>
          <button type="button" onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
        </form>
      )}




      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.title} className="product-image" />
            )}
            <div className="product-details">
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <p>Type: {product.type}</p>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
            <div className="product-actions">
              <button className="edit-btn" onClick={() => handleEditClick(product)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {!editMode && (
        <button
          onClick={() => setEditMode(true)}
          className="add-product-btn"
        >
          +
        </button>
      )}
    </div>
  );
};

export default FarmerProducts;
