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
  const [showPopUp, setShowPopUp] = useState(false); 

  const [showFile , setShowFile] = useState(false);

  const [liked, setLiked] = useState(false);
  const [LikedComments, setLikedComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const toggleLikeComment = async (commentId , postId) => {
    try {

      if (LikedComments.includes(commentId)) {
        setLikedComments(LikedComments.filter(id => id !== commentId));
      } else {
        setLikedComments([...LikedComments, commentId]);
      }
      postService.toggleCommentLike(commentId , postId );

    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };


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
              <Link to={`/userlist/${post.user._id}`}>
                <h4>{post.user.username}</h4>
              </Link>
              
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
                <div className="PostText">
                  <p>{post.text}</p>

                  {post.file && (
                    <div className="file-container">
                      <button className="showfilebutton" onClick={() => setShowFile(!showFile)}>
                        {showFile ? "Hide File" : "Show File"}
                      </button>

                      {showFile && (
                        <div className="file-preview">
                          {post.file?.type?.includes('image') ? (
                            <img src={post.file.link} alt="Post" />
                          ) : post.file?.type?.includes('video') ? (
                            <video controls>
                              <source src={post.file.link} type="video/mp4" />
                            </video>
                          ) : post.file?.type?.includes('pdf') ? (
                            <iframe 
                              src={post.file.link} 
                              width="100%" 
                              height="100%" 
                              title={post.file.title}
                            />
                          ) : null}
                        </div>
                      )}
                    </div>
                  )}
                </div>


                
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
                </>
            )}
            
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
             
            <section>
              <button className="commentFormButton" onClick={() => setShowCommentForm(!showCommentForm)}>
                {showCommentForm?'hide comment form':'Add Comment'}
                </button>
              {(user&&showCommentForm)&&(
              <CommentForm handleAddComment={handleAddComment} user={user} />
            )}
              {!post.comments.length && <p>There are no comments.</p>}
              <div className="commentShow">
                <h4>Replies</h4>
                {post.comments.map((comment) => {
                  const isCommentLiked = LikedComments.includes(comment._id);
                  const hasUserLikedComment = comment.likes.includes(user?.id);

                  return (<div className="comments" key={comment._id}>
                    <article>
                      <header>
                        <div className="usernamecontener">
                          <div>{comment.user?.username}</div>
                          <div>{new Date(comment.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className="usercomment">{comment.text}</div>
                        

                        {
                          comment.file?.type?.includes('image') ? (
                            <img src={comment.file.link} alt="Post" />
                          ) : 
                          comment.file?.type?.includes('video') ? (
                            <video controls>
                              <source src={comment.file.link} type="video/mp4" />
                            </video>
                          ) : comment.file?.type?.includes('pdf') ? (  
                            <iframe 
                              src={comment.file.link} 
                              width="100%" 
                              height="100%" 
                              title={comment.file.title}
                              className="file-preview-iframe"
                              display="initial"
                              position="relative" 
                              />
                          ) : <> </>
                          }




                        {user && (
                        <div className="interactionItem" onClick={() => toggleLikeComment(comment._id ,post._id)}>
                          <img
                            src={(!hasUserLikedComment && isCommentLiked) || (hasUserLikedComment && !isCommentLiked)
                              ? "/like.png"
                              : "/icons8-like-50.png"
                            
                            }
                            alt="Likes"
                          />

                          <span>
                          {isCommentLiked
                            ? hasUserLikedComment
                            ? comment.likes.length - 1
                            : comment.likes.length + 1
                            : comment.likes.length}
                          </span>
                        </div>
                        )}
                      </header>
                    </article>
                  </div>)
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostDetails;
