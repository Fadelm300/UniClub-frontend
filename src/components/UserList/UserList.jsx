import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminService from "../../services/adminService";
import authService from "../../services/authService";
import postService from "../../services/postService";
import "./UserList.css";

function UserList({ userUser }) {
  const [users, setUsers] = useState([]);
  const [change, setChange] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // البحث
  const [blockDurations, setBlockDurations] = useState({}); // مدة الحظر لكل مستخدم
  const [modalData, setModalData] = useState(null); // بيانات الـ Modal

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUsers();
  }, [change]);

  const toggleAdmin = async (userId) => {
    await adminService.toggleAdmin(userId);
    setChange(!change);
  };

  const toggleFollow = async (userId) => {
    await authService.toggleFollow(userId);
    setChange(!change);
  };

  // إظهار الـ Modal لتأكيد الحظر
  const showModal = (action, userId) => {
    setModalData({ action, userId });
  };

  // تنفيذ الحظر عند تأكيد العملية
  const handleConfirmAction = async () => {
    if (!modalData) return;

    const { action, userId } = modalData;

    try {
      if (action === "blockUser") {
        const duration = blockDurations[userId];
        if (!duration) return alert("Please select a block duration.");
        
        await postService.blockUser(userId, duration);
        setUsers(users.filter((user) => user._id !== userId)); // إزالة المستخدم من القائمة
        alert(`User blocked for ${duration}.`);
      }
    } catch (err) {
      console.error(`Error performing action (${action}):`, err);
      alert(`Failed to ${action.replace(/([A-Z])/g, " $1").toLowerCase()}.`);
    } finally {
      setModalData(null); // إغلاق الـ Modal
    }
  };

  // تصفية المستخدمين بناءً على البحث
  const filteredUsers = users.filter(
    (user) =>
      (user.username?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (user.phone || "").includes(searchQuery)
  );

  return (
    <div className="user-list-container">
      <div className="search-container">
        <i className="fa fa-search search-icon"></i>
        <input
          type="text"
          className="search-bar"
          placeholder="Search by username, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>
                <Link to={`/userlist/${user._id}`}>{user.username}</Link>
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.admin ? "Admin" : "User"}</td>
              <td>
                <button onClick={() => toggleAdmin(user._id)}>
                  {user.admin ? "Demote to User" : "Promote to Admin"}
                </button>

                <button onClick={() => toggleFollow(user._id)}>
                  {user.followers && user.followers.includes(userUser.id)
                    ? "Unfollow"
                    : "Follow"}
                </button>

                <select
                  onChange={(e) =>
                    setBlockDurations({
                      ...blockDurations,
                      [user._id]: e.target.value,
                    })
                  }
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Duration
                  </option>
                  <option value="1m">Block for 1 minute</option>
                  <option value="24h">Block for 24 hours</option>
                  <option value="30d">Block for 30 days</option>
                  <option value="10y">Block for 10 years</option>
                </select>

                <button onClick={() => showModal("blockUser", user._id)}>
                  Block
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Confirmation */}
      {modalData && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to {modalData.action}?</p>
            <button onClick={handleConfirmAction}>Confirm</button>
            <button onClick={() => setModalData(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
