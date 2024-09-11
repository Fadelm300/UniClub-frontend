import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import authService from '../../services/authService';
import './UserProfile.css';

const UserProfile = (props) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { user, posts } = await authService.getUserProfile(userId); // Fetch user and posts
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      <h1>{user?.username} Profile</h1>
      <img src="https://img.icons8.com/?size=100&id=kfZajSPygW1l&format=png&color=000000" alt="" />
      <h2>Your Posts </h2>
      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <Link key={post._id} to={`/${post.path}/post/${post._id}`}>{post.text}</Link> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfile;
