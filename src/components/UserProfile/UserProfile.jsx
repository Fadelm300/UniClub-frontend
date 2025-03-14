import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './UserProfile.css';
import axios from 'axios';
import ErrorModal  from '../Events/ErrorModal/ErrorModal'
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
    const [blockStatus, setBlockStatus] = useState(null);

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const DEFAULT_IMAGE_URL = "https://img.icons8.com/?size=100&id=kfZajSPygW1l&format=png&color=000000"; // Default image URL

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { user, posts } = await authService.getUserProfile(userId);
        setUser(user);

        if (user.blockedUntil) {
          const blockDate = new Date(user.blockedUntil);
          const now = new Date();

          if (blockDate > now) {
            setBlockStatus(`Blocked from posting until: ${blockDate.toLocaleString()}`);
          } else {
            setBlockStatus(null); // Unblock if the date has passed
          }
        }

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
        // setError('');
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

  const formatBlockedDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
            <input type="file" 
            id="image" 
            name="image" 
            onChange={uploadImage} 
            placeholder="URL img" />
            <input
                id="image" 
                name="image" 
                onChange={handleChange}
                placeholder="URL img"
              />
            <div className='Save_and_Cancel'>
            <button className="reset-button" onClick={resetToDefaultImage}> <img src="https://img.icons8.com/?id=K2njhUKeLfle&format=png&color=000000" alt="" /> </button>
              <button onClick={() => setShowEditConfirm(true)}> 
                <img src="https://img.icons8.com/?size=50&id=18764&format=png&color=000000" alt="save" /> 
              </button>
              <button onClick={() => setIsEditing(false)}> 
                <img src="https://img.icons8.com/?size=50&id=fYgQxDaH069W&format=png&color=000000" alt="Cancel" /> 
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <h1>{user?.username}</h1>
            {user?.blockedUntil && (
                <p className="blocked-info">
                  🛑 <strong>Posting Blocked Until:</strong> {formatBlockedDate(user.blockedUntil)}
                </p>
              )}

            <p>Phone: {user?.phone}</p>
            <p>Email: {user?.email}</p>
            <div className="follow-stats2">
              <div onClick={fetchFollowers} className="clickable" >Followers: {user.followers.length}</div>
              <div onClick={fetchFollowing} className="clickable" >Following: {user.following.length}</div>
              
            </div>
            <div className='EandD'>
              <button onClick={() => setIsEditing(true)}> 
                <img src="https://img.icons8.com/?size=50&id=XPJ22YD4LrLc&format=png&color=000000" alt="Edit Profile" /> 
              </button>
              <button onClick={() => setShowDeleteConfirm(true)}>  
                <img src="https://img.icons8.com/?size=50&id=T5dnyLNPujOw&format=png&color=000000" alt="Delete Profile" /> 
              </button>
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
      <ErrorModal
        show={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        errorMessage={error}
      />
    </div>
  );
};

export default UserProfile;
