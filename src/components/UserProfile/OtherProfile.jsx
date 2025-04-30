import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './OtherProfile.css';
import UserCreativeSpaces from './CreateCreativeSpace/UserCreativeSpaces';

const UserProfile = ({userUser}) => {
  const { userId } = useParams();
  
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [expandedPosts, setExpandedPosts] = useState({});
  const [change, setChange] = useState(true);

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

  if (loading) return <div className="loading2">Loading...</div>;
  if (error) return <div className="error2">Error: {error}</div>;

  const maxLength = 100;
  return (
    <div className="user-profile2">
      <div className="profile-header2">
        <img
          className="profile-picture2"
          src="https://img.icons8.com/?size=100&id=kfZajSPygW1l&format=png&color=000000"
          alt="User Avatar"
        />
        <h1>{user?.username}</h1>
        <div className="follow-stats2">
          <div>Followers: {user.followers.length}</div>
          <div>Following: {user.following.length}</div>
        </div>
        <button className="follow-button2" onClick={() => toggleFollow(user._id)}>
          {user.followers.includes(userUser.id) ? 'Unfollow' : 'Follow'}
        </button>
      </div>

      <div className="user-posts2">
        <h2>Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post._id} className="post-item2">
                <Link to={`/${post.path}/post/${post._id}`}>
                  {expandedPosts[post._id]
                    ? post.text
                    : post.text.length > maxLength
                    ? `${post.text.substring(0, maxLength)}...`
                    : post.text}
                </Link>
                {post.text.length > maxLength && !expandedPosts[post._id] && (
                  <button className="see-more2" onClick={() => togglePostVisibility(post._id)}>
                    Click to see more details
                  </button>
                )}
                {expandedPosts[post._id] && (
                  <button className="see-less2" onClick={() => togglePostVisibility(post._id)}>
                    Click to see less
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <UserCreativeSpaces userId={userId} isReadOnly={true} />

    </div>
  );
};

export default UserProfile;