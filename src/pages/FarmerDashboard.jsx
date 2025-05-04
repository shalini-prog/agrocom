import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './FarmerDashboard.css';

const FarmerDashboard = () => {
  const [profile, setProfile] = useState({ name: '', zone: '', area: '' });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(true); // Start in form mode
  const [profileCreated, setProfileCreated] = useState(false);

  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/farmer/profile`, {
          withCredentials: true,
        });

        if (res.data && res.data.name) {
          setProfile(res.data);
          setProfileCreated(true);
          setEditMode(false);
        }
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          setAuthUser(null);
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, setAuthUser]);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/farmer/profile`, profile, {
        withCredentials: true,
      });
      alert(profileCreated ? 'Profile updated!' : 'Profile created!');
      setProfileCreated(true);
      setEditMode(false);
    } catch (err) {
      alert('Something went wrong. Try again.');
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem('token');
      setAuthUser(null);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const isProfileComplete = profile.name && profile.zone && profile.area;

  const handleSkip = () => {
    if (isProfileComplete) {
      navigate('/farmer/dashboard/main');
    } else {
      alert('Please complete your profile before skipping.');
    }
  };

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
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {!editMode && profileCreated ? (
        <div className="profile-view">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Zone:</strong> {profile.zone}</p>
          <p><strong>Area:</strong> {profile.area}</p>
          <button onClick={() => setEditMode(true)} className="edit-btn">Edit Profile</button>
          <button onClick={handleSkip} className="skip-btn">Skip</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <input
            className="form-input"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            className="form-input"
            name="zone"
            value={profile.zone}
            onChange={handleChange}
            placeholder="Zone"
            required
          />
          <input
            className="form-input"
            name="area"
            value={profile.area}
            onChange={handleChange}
            placeholder="Area"
            required
          />
          <button type="submit" className="submit-btn">
            {profileCreated ? 'Save Changes' : 'Create Profile'}
          </button>
        </form>
      )}
    </div>
  );
};

export default FarmerDashboard;
