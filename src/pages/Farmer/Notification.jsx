import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notification.css'; // optional CSS

const FarmerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/farmer/notifications`, {
        withCredentials: true,
      });

      console.log("Fetched notifications:", res.data.notifications); // Debug output
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error('Error fetching notifications:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="farmer-notifications-container">
      <h2>Notifications</h2>
      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((note, index) => (
            <li key={index} className="notification-item">
              {typeof note === 'string' || typeof note === 'number'
                ? note
                : typeof note === 'object' && note !== null
                ? JSON.stringify(note)
                : 'Invalid notification'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FarmerNotifications;
