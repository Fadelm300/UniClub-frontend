import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './UserProfile.css';

const UserProfile = ({userUser}) => {
  const { userId } = useParams();
  console.log(userId)
  
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [expandedPosts, setExpandedPosts] = useState({});
  const [change, setChange] = useState(true);

  // Edit state
  
  // Confirmation modals
  
  const navigate = useNavigate();

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
  }, [change]);

  const togglePostVisibility = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const toggleFollow = async (userId) => {
    await authService.toggleFollow(userId);
    setChange(!change);
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
        <h1>{user?.username}</h1>
        <div>followers: {user.followers.length}</div>
        <div>following: {user.following.length}</div>
        <button onClick={() => toggleFollow(user._id)}>
          {user.followers.includes(userUser.id) ? 'unfollow' : 'Follow'}
        </button>


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





                      

                {/* Confirmation Modal for Edit */}
                



    </div>
  );
};

export default UserProfile;
