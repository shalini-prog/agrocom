import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './FarmerDashboard.css'; // Import the CSS

const FarmerDashboard = () => {
  const [profile, setProfile] = useState({ name: '', zone: '', area: '' });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/farmer/profile`, {
          withCredentials: true,
        });
        setProfile(res.data);
        setLoading(false)
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          // Handle unauthorized access (e.g., expired token)
          setAuthUser(null); // Clear auth context
          navigate('/login'); // Redirect to login page
        }
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchProfile();
  }, [navigate, setAuthUser]);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/farmer/profile`, profile, {
        withCredentials: true,
      });
      alert('Profile updated!');
      setEditMode(false);
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
      setAuthUser(null); // Clear user context
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error(err);
    }
  };

  const isProfileComplete = profile.name && profile.zone && profile.area;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Farmer Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {isProfileComplete && !editMode ? (
        <div className="profile-view">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Zone:</strong> {profile.zone}</p>
          <p><strong>Area:</strong> {profile.area}</p>
          <button onClick={() => setEditMode(true)} className="edit-btn">Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="profile-form">
          <input
            className="form-input"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            className="form-input"
            name="zone"
            value={profile.zone}
            onChange={handleChange}
            placeholder="Zone"
          />
          <input
            className="form-input"
            name="area"
            value={profile.area}
            onChange={handleChange}
            placeholder="Area"
          />
          <button className="submit-btn">{isProfileComplete ? 'Save Changes' : 'Create Profile'}</button>
        </form>
      )}
    </div>
  );
};

export default FarmerDashboard;
