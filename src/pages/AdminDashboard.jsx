import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [profile, setProfile] = useState({
    empType: '',
    empId: '',
    dept: '',
    phone: '',
    address: '',
  });

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(true); // Start in form mode
  const [profileCreated, setProfileCreated] = useState(false);

  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/auth/admin/profile`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            withCredentials: true,
          }
        );

        // If data exists, show the profile instead of the form
        if (res.data && res.data.empId) {
          setProfile(res.data);
          setProfileCreated(true);
          setEditMode(false);
        }
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          setAuthUser(null);
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, setAuthUser]);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admin/profile`,
        profile,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      alert(editMode ? 'Profile updated!' : 'Profile created!');
      setProfileCreated(true);
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem('token');
      setAuthUser(null);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSkip = () => {
    if (profileCreated) {
      navigate('/admin/dashboard/main');
    } else {
      alert('Please complete your profile before skipping.');
    }
  };

  if (loading) {
    return <p className="center-text">Loading...</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn logout-btn">
          Logout
        </button>
      </div>

      {!editMode && profileCreated ? (
        <div className="profile-view">
          <p><strong>Employee Type:</strong> {profile.empType}</p>
          <p><strong>Employee ID:</strong> {profile.empId}</p>
          <p><strong>Department:</strong> {profile.dept}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <button onClick={() => setEditMode(true)} className="btn edit-btn">
            Edit Profile
          </button>
          <button onClick={handleSkip} className="skip-btn">
            Skip
          </button>
        </div>
      ) : (
        <form className="profile-form" onSubmit={handleSubmit}>
          <input
            className="input"
            name="empType"
            value={profile.empType}
            onChange={handleChange}
            placeholder="Employee Type"
            required
          />
          <input
            className="input"
            name="empId"
            value={profile.empId}
            onChange={handleChange}
            placeholder="Employee ID"
            required
          />
          <input
            className="input"
            name="dept"
            value={profile.dept}
            onChange={handleChange}
            placeholder="Department"
            required
          />
          <input
            className="input"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          <input
            className="input"
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          <button className="btn save-btn" type="submit">
            {profileCreated ? 'Save Changes' : 'Create Profile'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminDashboard;
