import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './OtherProfile.css';
import axios from 'axios';
import ErrorModal  from '../Events/ErrorModal/ErrorModal';
import postService from '../../services/postService';
import UserCreativeSpaces from './CreateCreativeSpace/UserCreativeSpaces'
import './UserProfile.css';
const UserProfile = () => {
  const { userId } = useParams();
  
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [change, setChange] = useState(true);

  const navigate = useNavigate();

  // Confirmation modals
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);


    // Followers and Following modals
    const [showFollowersModal, setShowFollowersModal] = useState(false);
    const [showFollowingModal, setShowFollowingModal] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const DEFAULT_IMAGE_URL = "https://img.icons8.com/?size=100&id=kfZajSPygW1l&format=png&color=000000"; // Default image URL

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { user, posts } = await authService.getOtherUserProfile(userId);
        setUser(user);
        setPosts(posts);
      
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
  const toggleCommentVisibility = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  let isTogglingFollow = false; // simple mutex

const toggleFollow = async (userId) => {
  if (isTogglingFollow) return;
  isTogglingFollow = true;
  
  setUser((prev) => {
    const isFollowing = prev.followers.includes(userId);
    return {
      ...prev,
      followers: isFollowing
        ? prev.followers.filter((id) => id !== userId)
        : [...prev.followers, userId]
    };
  });

  try {
    authService.toggleFollow(userId);
  } catch (error) {
    console.error('Toggle follow failed, reverting UI:', error);

    // Revert UI on failure
    setUser((prev) => {
      const isFollowing = prev.followers.includes(userId);
      return {
        ...prev,
        followers: isFollowing
          ? prev.followers.filter((id) => id !== userId)
          : [...prev.followers, userId]
      };
    });
  } finally {
    isTogglingFollow = false;
  }
};


  
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

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
  const maxLengthForCommintSection = 60;
  const commentMaxLength = 150;

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
   <div className="background-animation"></div>


      <div className='profile-header-container'>
      <div className="profile-header">
        <div className="imgside">
        <img
          className="profile-picture"
          src={user?.image || DEFAULT_IMAGE_URL}
          alt="User Avatar"
        />
    
           </div>
        
          <div className="profile-info">
          <h1>{user?.username.charAt(0).toUpperCase() + user?.username.slice(1)}</h1>
          <button className='follow-button' onClick={() => toggleFollow(user._id)}>
            {user?.followers.includes(userId) ? 'Unfollow' : 'Follow'}
          </button>
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
            
          </div>
       
      </div>
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









                        <div className='user-profile-body'>
                     



                        <div className='user-profile-ads'>
                     
                        <UserCreativeSpaces userId={userId} isReadOnly={true} />

                      </div>







      <div className="user-posts">
        <h2>My Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet</p>
        ) : (
          <ul>
            {posts.slice().reverse().map((post) => (
              <li key={post._id} className="post-item">
                <span className="post-label">Post text:</span>{' '}

                <Link to={`/${post.path}/post/${post._id}`}>
                  {expandedPosts[post._id]
                    ? post.text
                    : post.text.length > maxLength
                    ? `Post text: ${post.text.substring(0, maxLength)}...`
                    : post.text}
                </Link>
                {post.file && (

                      <div className="post-media-wrapper">
                        {post.file.type.includes('image') ? (
                          <img
                            src={post.file.link}
                            alt="Post media"
                            className="post-media-profile"
                          />
                        ) : post.file.type.includes('video') ? (
                          <video controls className="post-media-profile">
                            <source src={post.file.link} type="video/mp4" />
                          </video>
                        ) : null}

                        {post.file.type.includes('pdf') ? (
                          <div className="pdf-container">
                            <iframe
                              src={post.file.link}
                              width="100%"
                              height="250px"
                              title={post.file.title}
                              className="file-preview-iframe"
                            />
                          </div>
                        ) : null}
                      </div>
                    )}

            
        
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









{/* user profile comment  */}


      <div className='user-profile-comments'>
  <h2>Comments on my Posts</h2>
  {posts.length === 0 ? (
    <p>No posts or Comments  yet</p>
  ) : (
    <ul>
      {posts
        .filter((post) => post.comments && post.comments.length > 0)
        .map((post) => (
          <li key={post._id} className="post-item-for-comment11">
          <div className="comment-section">
            
            <div className="post-item-for-comment">
              <span className="post-label">Post text: </span>
        
              <Link to={`/${post.path}/post/${post._id}`} className="post-text-link">
                {expandedPosts[post._id]
                  ? post.text
                  : post.text.length > maxLengthForCommintSection
                  ? `${post.text.substring(0, maxLengthForCommintSection)}...`
                  : post.text}
              </Link>
        
              {post.text.length > maxLengthForCommintSection && !expandedPosts[post._id] && (
                <button className="see-more" onClick={() => togglePostVisibility(post._id)}>
                  Click to see more details
                </button>
              )}
              {expandedPosts[post._id] && (
                <button className="see-less" onClick={() => togglePostVisibility(post._id)}>
                  Click to see less
                </button>
              )}
            </div>
        
            {post.comments.map((comment) => (
              <div key={comment._id} className="comment">
                <div className="comment-header">
                  <Link
                    to={
                      String(comment.user._id) === String(user?._id)
                        ? `/profile/${comment.user._id}`
                        : `/userlist/${comment.user._id}`
                    }
                    className="comment-user-link"
                  >
                    <img
                      className="comment-avatar"
                      src={comment.user?.image || DEFAULT_IMAGE_URL}
                      alt="commenter"
                    />
                    <strong>{comment.user?.username || 'Unknown'}</strong>
                  </Link>
                </div>


                <p className="comment-text">
                    {expandedComments[comment._id]
                      ? comment.text
                      : comment.text.length > commentMaxLength
                      ? `${comment.text.substring(0, commentMaxLength)}...`
                      : comment.text}
                  </p>

                  {comment.text.length > commentMaxLength && !expandedComments[comment._id] && (
                    <button className="see-more" onClick={() => toggleCommentVisibility(comment._id)}>
                      Click to see more details
                    </button>
                  )}
                  {expandedComments[comment._id] && (
                    <button className="see-less" onClick={() => toggleCommentVisibility(comment._id)}>
                      Click to see less
                    </button>
                  )}
                </div>
              
            ))}
          </div>
        </li>
        
        ))}
    </ul>
  )}
</div>






</div>




     
      <ErrorModal
        show={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        errorMessage={error}
      />


    </div>
  );
};


export default UserProfile;
