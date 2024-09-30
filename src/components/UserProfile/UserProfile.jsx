import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import authService from '../../services/authService';
import './UserProfile.css';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State to manage which posts are expanded
  const [expandedPosts, setExpandedPosts] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { user, posts } = await authService.getUserProfile(userId);
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
        <div className="profile-info">
          <h1>{user?.username}</h1>
          <p>Phone: {user?.phone}</p>
          <p>Email: {user?.email}</p>
        </div>
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
                {/* expandedPosts to show more or less  */}
                  {expandedPosts[post._id] 
                    ? post.text 
                    : post.text.length > maxLength 
                      ? `${post.text.substring(0, maxLength)}...` 
                      : post.text
                  }
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
    </div>
  );
};

export default UserProfile;
