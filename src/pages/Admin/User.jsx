import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingUserId, setDeletingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/users`,
        { withCredentials: true }
      );
      console.log("Fetched users:", res.data);
      setUsers(res?.data?.users || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
  
    try {
      setDeletingUserId(userId);
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${userId}`,
        { withCredentials: true }
      );
  
      if (res.status === 200) {
        setUsers((prev) => prev.filter((user) => user._id !== userId));  // Ensure _id matches
        alert('User deleted successfully');
      } else {
        alert('Failed to delete user');
      }
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert('Error deleting user. Please try again.');
    } finally {
      setDeletingUserId(null);
    }
  };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="loading-text">Loading users...</p>;

  return (
    <div className="admin-users-container">
      <h2 className="title">Manage Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Details</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.phone || user.zone|| user.empType||"N/A"}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(user._id)}
                      disabled={deletingUserId === user._id}
                    >
                      {deletingUserId === user._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
