import { Link } from 'react-router-dom';
import './PostList.css';
import postService from '../../services/postService';
import { useState, useEffect } from 'react';

const PostList = (props) => {
  if (!props.posts || props.posts.length === 0) return <main>No posts yet...</main>;

  const sortedPosts = [...props.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const DEFAULT_IMAGE_URL = "https://img.icons8.com/?size=100&id=kfZajSPygW1l&format=png&color=000000";
  const MAX_TEXT_LENGTH = 200;

  const [LikedPosts, setLikedPosts] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(sortedPosts || []);

  // Handle likes
  const toggleLike = async (postId) => {
    try {
      if (LikedPosts.includes(postId)) {
        setLikedPosts(LikedPosts.filter((id) => id !== postId));
      } else {
        setLikedPosts([...LikedPosts, postId]);
      }
      postService.toggleLike(postId);
    } catch (error) {
      console.error('Error toggling like:', error.message);
    }
  };

  // Handle share
  const handleShare = (postId) => {
    const postLink = `${window.location.origin}${props.path}/post/${postId}`;
    navigator.clipboard.writeText(postLink)
      .then(() => {
        setShowPopUp(true);
        setTimeout(() => setShowPopUp(false), 3000);
      })
      .catch((error) => console.error('Failed to copy the link:', error));
  };

  // Filter posts based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPosts(sortedPosts); // Reset to all posts if the query is empty
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      setFilteredPosts(
        sortedPosts.filter(
          (post) =>
            post.text.toLowerCase().includes(lowerQuery) ||
            post.user.username.toLowerCase().includes(lowerQuery)
        )
      );
    }
  }, [searchQuery, sortedPosts]);

  return (
    <>
      {/* Pop-up message for copy link */}
      {showPopUp && <div className="popup-message">Link copied to clipboard!</div>}

      {/* Search bar */}
      <div className="searchBarContainer">
            <input
                type="text"
                className="searchInput"
                placeholder="Search posts or users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>


      {/* Post list */}
      <div className="cardContaner">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, idx) => {
            const postDate = new Date(post.createdAt);
            const isLongText = post.text.length > MAX_TEXT_LENGTH;
            const truncatedText = isLongText ? post.text.slice(0, MAX_TEXT_LENGTH) + '...' : post.text;

            const isPostLiked = LikedPosts.includes(post._id);
            const hasUserLikedPost = post.likes.includes(props.user?.id);

            return (
              <div className="card" key={idx}>
                {/* User information */}
                <div className="dawnCard">
                  <Link to={post.user._id === props.user?.id ? `/profile/${post.user._id}` : `/userlist/${post.user._id}`}>
                    <div className="dawnCardpostimg">
                      <img src={post.user.image || DEFAULT_IMAGE_URL} alt="User" />
                      <div className="dawncardusername">{post.user.username}</div>
                    </div>
                  </Link>
                  <div className="dawnCardText">
                    <div className="dawncardDate">
                      {postDate.toLocaleDateString()} <span> | </span> {postDate.toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                {/* Post content */}
                <Link to={`${props.path}/post/${post._id}`}>
                  <div className="topCard">
                    <div className="topcardtex">
                      <div className="topcardTextContent">
                        {truncatedText}
                        {isLongText && <span className="readMore"> Click to read more</span>}
                      </div>
                    </div>
                    {post.image && (
                      <div className="topcardimage">
                        <img src={post.image} alt="Post" />
                      </div>
                    )}
                  </div>
                </Link>

                {/* Interaction bar */}
                {props.user && (
                  <div className="interactionBar">
                    <div className="interactionItem" onClick={() => handleShare(post._id)}>
                      <img src="/icons8-share-50.png" alt="Share" />
                      <span>Share</span>
                    </div>

                    <div className="interactionItem">
                      <img src="/icons8-save-48.png" alt="Save" />
                      <span>{post.saves || 0}</span>
                    </div>

                    <div className="interactionItem">
                      <img src="/icons8-results-24.png" alt="Views" />
                      <span>{post.views || 0}</span>
                    </div>

                    <div className="interactionItem">
                      <Link to={`${props.path}/post/${post._id}`}>
                        <img src="/icons8-comment-50.png" alt="Comments" />
                        <span>{post.comments.length || 0}</span>
                      </Link>
                    </div>

                    <div className="interactionItem" onClick={() => toggleLike(post._id)}>
                      <img
                        src={
                          (!hasUserLikedPost && isPostLiked) || (hasUserLikedPost && !isPostLiked)
                            ? '/like.png'
                            : '/icons8-like-50.png'
                        }
                        alt="Likes"
                      />
                      <span>
                        {isPostLiked
                          ? hasUserLikedPost
                            ? post.likes.length - 1
                            : post.likes.length + 1
                          : post.likes.length}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>No posts found matching your search.</p>
        )}
      </div>
    </>
  );
};

export default PostList;
