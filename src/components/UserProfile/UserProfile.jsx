import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './UserProfile.css';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState({});
  
  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: '',
    phone: '',
    email: ''
  });
  
  // Confirmation modals
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { user, posts } = await authService.getUserProfile(userId);
        setUser(user);
        setPosts(posts);
        setEditData({ username: user.username, phone: user.phone, email: user.email });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  const togglePostVisibility = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleEditProfile = async () => {
    try {
      const updatedUser = {
        username: editData.username,
        phone: editData.phone,
        email: editData.email
      };
      const response = await authService.updateUserProfile(userId, updatedUser);
      setUser(response.user);
      setIsEditing(false); // Exit edit mode
      setShowEditConfirm(false); // Close modal
    } catch (error) {
      setError(error.message);
    }
  };

  const confirmDeleteProfile = async () => {
    try {
      await authService.deleteUserProfile(userId);
      navigate('/'); // Redirect to home after deletion
    } catch (error) {
      setError(error.message);
    } finally {
      setShowDeleteConfirm(false); // Close modal
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const maxLength = 100;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img
          className="profile-picture"
          src="https://img.icons8.com/?size=100&id=kfZajSPygW1l&format=png&color=000000"
          alt="User Avatar"
        />
        {isEditing ? (
          <div className="edit-profile-form">
            <input
              type="text"
              name="username"
              value={editData.username}
              onChange={handleChange}
              placeholder="Username"
            />
            <input
              type="text"
              name="phone"
              value={editData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <div className='Save_and_Cancel'>
            <button onClick={() => setShowEditConfirm(true)}> <img src="https://img.icons8.com/?size=50&id=18764&format=png&color=000000" alt="save" /> </button>
            <button onClick={() => setIsEditing(false)}> <img src="https://img.icons8.com/?size=50&id=fYgQxDaH069W&format=png&color=000000" alt="Cancel" /> </button>
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <h1>{user?.username}</h1>
            <p>Phone: {user?.phone}</p>
            <p>Email: {user?.email}</p>
                  <div className='EandD'>
                      <button onClick={() => setIsEditing(true)}> <img src="https://img.icons8.com/?size=50&id=XPJ22YD4LrLc&format=png&color=000000" alt="Edit Profile" /> </button>
                      <button onClick={() => setShowDeleteConfirm(true)}>  <img src="https://img.icons8.com/?size=50&id=T5dnyLNPujOw&format=png&color=000000" alt="delet Profile" /> </button>
                  </div>
          </div>
        )}
      </div>

      <div className="user-posts">
        <h2>Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post._id} className="post-item">
                <Link to={`/${post.path}/post/${post._id}`}>
                  {expandedPosts[post._id]
                    ? post.text
                    : post.text.length > maxLength
                    ? `${post.text.substring(0, maxLength)}...`
                    : post.text}
                </Link>
                {post.text.length > maxLength && !expandedPosts[post._id] && (
                  <button className="see-more" onClick={() => togglePostVisibility(post._id)}>
                    Click to see more details
                  </button>
                )}
                {expandedPosts[post._id] && (
                  <button className="see-less" onClick={() => togglePostVisibility(post._id)}>
                    Click to see less
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>





                      {showDeleteConfirm && (
                  <div className="modal">
                    <div className="modal-content">
                      <h2>Confirm Deletion</h2>
                      <p>Are you sure you want to delete your profile?</p>
                      <div className='Confirmation_but'>
                        <button className="delete" onClick={confirmDeleteProfile}>Yes, Delete</button>
                        <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Confirmation Modal for Edit */}
                {showEditConfirm && (
                  <div className="modal">
                    <div className="modal-content">
                      <h2>Confirm Edit</h2>
                      <p>Are you sure you want to save the changes?</p>
                      <div className='Confirmation_but'>
                        <button className="save" onClick={handleEditProfile}>Yes, Save</button>
                        <button onClick={() => setShowEditConfirm(false)}>Cancel</button>
                      </div>
                    </div>
                  </div>
                )}



    </div>
  );
};

export default UserProfile;
