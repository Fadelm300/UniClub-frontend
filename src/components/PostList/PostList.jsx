import { Link } from 'react-router-dom';
import './PostList.css';
import postService from '../../services/postService';
import { useState } from 'react';

const PostList = (props) => {
  if (!props.posts || props.posts.length === 0) return <main>No posts yet...</main>;

  const sortedPosts = [...props.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const DEFAULT_IMAGE_URL = "https://img.icons8.com/?size=100&id=kfZajSPygW1l&format=png&color=000000"; 

  const MAX_TEXT_LENGTH = 200; 

  const [LikedPosts, setLikedPosts] = useState([]);

  const toggleLike = async (postId) => {
    try {
      await postService.toggleLike(postId);

      // Check if the post is already liked
      if (LikedPosts.includes(postId)) {
        // If liked, remove it from the LikedPosts array
        setLikedPosts(LikedPosts.filter(id => id !== postId));
      } else {
        // Otherwise, add it to the LikedPosts array
        setLikedPosts([...LikedPosts, postId]);
      }
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };

  return (
    <>        
    <div className="cardContaner">
      {sortedPosts.map((post, idx) => {
        const postDate = new Date(post.createdAt);
        const isLongText = post.text.length > MAX_TEXT_LENGTH;
        const truncatedText = isLongText ? post.text.slice(0, MAX_TEXT_LENGTH) + '...' : post.text;

        const isPostLiked = LikedPosts.includes(post._id);
        const hasUserLikedPost = post.likes.includes(props.user?.id);

        return (
          <div className="card" key={idx}>
            <Link to={`${props.path}/post/${post._id}`}>
              <div className="dawnCard">
                <div className="dawnCardpostimg">
                  <img src={post.user.image || DEFAULT_IMAGE_URL} alt="Post Image" />
                  <div className="dawncardusername">{post.user.username}</div>
                </div>
                <div className="dawnCardText">
                  <div className="dawncardDate">
                    {postDate.toLocaleDateString()} <span> | </span> {postDate.toLocaleTimeString()}
                  </div>
                </div>
              </div>

              <div className="topCard">
                <div className="topcardtex">
                  <div className="topcardTextContent">
                    {truncatedText}
                    {isLongText && <span className="readMore"> Click to read more</span>}
                  </div>
                </div>
                <div className='topcardimage'>
                  <img src={post.image} alt="" />
                </div>
              </div>
            </Link>
            
            {/* Social Interaction Section */}
            {props.user&&(<div className="interactionBar">
            <div className="interactionItem">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
                  <g>
                    <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
                  </g>
                </svg>
                <img src="/icons8-share-50.png" alt="Share" />
                <span>{post.shares || 0}</span>
              </div>

              <div className="interactionItem">
                <img src="/icons8-save-48.png" alt="Save" />
                <span>{post.saves || 0}</span>
              </div>

              <div className="interactionItem">
                <img src="/icons8-results-24.png" alt="Views" />
                <span>{post.views || 0}</span>
              </div>
              
              <div className="interactionItem" onClick={() => toggleLike(post._id)}>
                
                  <img
                    src={
                      (!hasUserLikedPost && isPostLiked) || (hasUserLikedPost && !isPostLiked)
                        ? "https://img.icons8.com/?size=100&id=JD2A4WXqotI8&format=png&color=FA5252"
                        : "/icons8-like-50.png"
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
              

              <div className="interactionItem">
                <img src="/icons8-comment-50.png" alt="Comments" />
                <span>{post.comment || 0}</span>
              </div>
            </div>
          )}
            
            
          </div>
        );
      })}
    </div>
    </>
  );
};

export default PostList;
