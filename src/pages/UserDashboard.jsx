import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const [profile, setProfile] = useState({ name: '', phone: '', dob: '' });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/user/profile`, {
          withCredentials: true,
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          setAuthUser(null);
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, setAuthUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/user/profile`, profile, {
        withCredentials: true,
      });
      alert('Profile updated!');
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
      setAuthUser(null);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const isProfileComplete = profile.name && profile.phone && profile.dob;

  const handleSkip = () => {
    if (isProfileComplete) {
      navigate('/user/dashboard/main');
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
        <h2 className="dashboard-title">User Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {isProfileComplete && !editMode ? (
        <div className="profile-view">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Date of Birth:</strong> {profile.dob}</p>
          <button onClick={() => setEditMode(true)} className="edit-btn">Edit Profile</button>
          <button onClick={handleSkip} className="skip-btn">Skip</button>
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
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <input
            className="form-input"
            type="date"
            name="dob"
            value={profile.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
          />
          <button type="submit" className="submit-btn">
            {isProfileComplete ? 'Save Changes' : 'Create Profile'}
          </button>
        </form>
      )}
    </div>
  );
};

export default UserDashboard;
