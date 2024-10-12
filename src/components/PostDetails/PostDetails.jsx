import { useParams , useResolvedPath} from "react-router-dom";
import { useEffect, useState } from "react";
import './PostDetails.css';
import postService from "../../services/postService";
import commentService from "../../services/commentService";
import { Link } from 'react-router-dom';
import AuthorDate from "../common/AuthorDate";
import CommentForm from '../CommentForm/CommentForm';
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";

const PostDetails = ({ user, handleDeletePost }) => {
  const { postid } = useParams();
  const [post, setPost] = useState(null);
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [liked, setLiked] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false); 



  useEffect(() => {
    async function getPost() {
      const postData = await postService.show(path, postid);
      setPost(postData);
      setEditText(postData.text);
    }
    getPost();
  }, [postid, path]);

  const handleAddComment = async (formData) => {
    const newComment = await commentService.create(path, postid, formData);
    const copyPost = { ...post };
    copyPost.comments.push(newComment);
    setPost(copyPost);
  };

  const handleEditPost = async () => {
    await postService.update(postid, { text: editText });
    setPost((prevPost) => ({ ...prevPost, text: editText }));
    setIsEditing(false);
  };

  if (!post) {
    return <main><h3>Loading...</h3></main>;
  }

  const toggleLike = async () => {
    try {
      if (liked){
        setLiked(false)
      }else {
        setLiked(true)
      }

      postService.toggleLike(post._id);
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };

  const handleShare = (postId) => {
    const postLink = `${window.location.origin}${path}/post/${postId}`;
    navigator.clipboard.writeText(postLink)
      .then(() => {
        setShowPopUp(true);  
        setTimeout(() => {
          setShowPopUp(false);  
        }, 3000);
      })
      .catch((error) => {
        console.error('Failed to copy the link:', error);
      });
  };
  const hasUserLikedPost = post.likes.includes(user?.id)    

  
  return (
    
    <main>
      {showPopUp && (
        <div className="popup-message">
          Link copied to clipboard!
        </div>
    )}
      <div className="postmain">
        <div className="postform">
          <div className="postContener">
            <div className="PostShow">
              <h4>{post.user.username}</h4>
              {isEditing ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={handleEditPost}>Save</button>
                  <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              ) : (
                <p>{post.text} </p>
                
              )}
              <div className="postimg"><img src={post.image} alt="" /></div>
            </div>
            {(post.user._id === user?.id || user?.admin) && (
              <>
              <div className="buttonContainer">
              {(post.user._id === user?.id)&&
                <button className="editButton" onClick={() => setIsEditing(true)}>Edit</button>
              }
                <button className="deleteButton" onClick={() => handleDeletePost(postid, path)}>Delete</button>
                </div>
{/* Social Interaction Section */}
{user && (
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
                      <img src="/icons8-comment-50.png" alt="Comments" />
                      <span>{post.comments.length || 0}</span>
                  </div>
                  
                  <div className="interactionItem" onClick={() => toggleLike(post._id)}>
                    <img
                      src={(!hasUserLikedPost && liked) || (hasUserLikedPost && !liked)
                        ? "/like.png"
                        : "/icons8-like-50.png"
                      
                      }
                      alt="Likes"
                    />
                    <span>
                    {liked
                        ? hasUserLikedPost
                          ? post.likes.length - 1
                          : post.likes.length + 1
                        : post.likes.length}
                    </span>
                  </div>

                </div>
              )}
              </>
            )}
            <section>
              {user&&(
              <CommentForm handleAddComment={handleAddComment} user={user} />
            )}
              {!post.comments.length && <p>There are no comments.</p>}
              <div className="commentShow">
                <h4>Replies</h4>
                {post.comments.map((comment) => (
                  <div className="comments" key={comment._id}>
                    <article>
                      <header>
                        <div className="usernamecontener">
                          <div>{comment.user?.username}</div>
                          <div>{new Date(comment.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className="usercomment">{comment.text}</div>
                      </header>
                    </article>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostDetails;
