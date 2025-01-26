import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './UserProfile.css';
import axios from 'axios';
import ErrorModal from '../Events/ErrorModal/ErrorModal';

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
    email: '',
    image: ''
  });
  const [loading2, setLoading2] = useState(false);
  const [error2, setError2] = useState(null);

  // Confirmation modals
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Followers and Following modals
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const DEFAULT_IMAGE_URL = "https://img.icons8.com/?size=100&id=kfZajSPygW1l&format=png&color=000000"; // Default image URL

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { user, posts } = await authService.getUserProfile(userId);
        setUser(user);
        setPosts(posts);
        setEditData({ username: user.username, phone: user.phone, email: user.email });
      } catch (error) {
        setError(error.message);
        setShowErrorModal(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}/followers`);
      setFollowers(response.data);
      setShowFollowersModal(true);
    } catch (error) {
      setError(error.message);
      setShowErrorModal(true);
    }
  };

  const fetchFollowing = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}/following`);
      setFollowing(response.data);
      setShowFollowingModal(true);
    } catch (error) {
      setError(error.message);
      setShowErrorModal(true);
    }
  };

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
        email: editData.email,
        image: editData.image
      };
      const response = await authService.updateUserProfile(userId, updatedUser);
      setUser(response.user);
      setIsEditing(false); // Exit edit mode
      setShowEditConfirm(false); // Close modal
    } catch (error) {
      setError(error.message);
      setShowErrorModal(true);
    }
  };

  const confirmDeleteProfile = async () => {
    try {
      await authService.deleteUserProfile(userId);
      navigate('/');
    } catch (error) {
      setError(error.message);
      setShowErrorModal(true);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const resetToDefaultImage = async () => {
    try {
      setEditData((prev) => ({
        ...prev,
        image: DEFAULT_IMAGE_URL
      }));

      await authService.updateUserProfile(userId, { ...user, image: DEFAULT_IMAGE_URL });

      setUser((prev) => ({
        ...prev,
        image: DEFAULT_IMAGE_URL
      }));

      setError2('');
    } catch (error2) {
      setError2('Failed to reset profile picture.');
      setShowErrorModal(true);
    }
  };

  const maxLength = 100;

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    const files = event.target.files[0];
    if (!files) return;

    setError2('');

    const base64 = await convertBase64(files);
    setLoading2(true);

    axios
      .post(`${BASE_URL}/uploadImg`, { image: base64 })
      .then((res) => {
        setEditData((prev) => ({
          ...prev,
          image: res.data.url,
        }));
      })
      .then(() => {
        setLoading2(false);
      })
      .catch((err) => {
        setLoading2(false);
        if (err.response && err.response.status === 413) {
          setError2('The image is too large. Please upload a smaller file.');
          setShowErrorModal(true);
        }
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="imgside">
          <img
            className="profile-picture"
            src={user?.image || DEFAULT_IMAGE_URL}
            alt="User Avatar"
          />
          {loading2 && <div className="loading">Loading...</div>}
          {error2 && <div className="error"> <h6>{error2}</h6></div>}
        </div>
        {isEditing ? (
          <div className="edit-profile-form">
            {/* ... Editing form fields ... */}
          </div>
        ) : (
          <div className="profile-info">
            <h1>{user?.username}</h1>
            <p>Phone: {user?.phone}</p>
            <p>Email: {user?.email}</p>
            <div className="follow-stats2">
              <div onClick={fetchFollowers} className="clickable">
                Followers: {user?.followers.length}
              </div>
              <div onClick={fetchFollowing} className="clickable">
                Following: {user?.following.length}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Followers Modal */}
      {showFollowersModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Followers</h2>
            <ul>
              {followers.map((follower) => (
                <li key={follower._id}>
                  <img src={follower.image || DEFAULT_IMAGE_URL} alt={follower.username} />
                  <span>{follower.username}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowFollowersModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowingModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Following</h2>
            <ul>
              {following.map((followedUser) => (
                <li key={followedUser._id}>
                  <img src={followedUser.image || DEFAULT_IMAGE_URL} alt={followedUser.username} />
                  <span>{followedUser.username}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowFollowingModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
