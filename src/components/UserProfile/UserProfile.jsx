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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

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
              <li key={post._id}>
                <Link to={`/${post.path}/post/${post._id}`}>{post.text}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
