import { useParams , useResolvedPath} from "react-router-dom";
import { useEffect, useState } from "react";
import './PostDetails.css';
import postService from "../../services/postService";
import commentService from "../../services/commentService";
import { Link } from 'react-router-dom';
import AuthorDate from "../common/AuthorDate";
import CommentForm from '../CommentForm/CommentForm';
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
import FileView from "../FileView/FileView";
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
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const DEFAULT_IMAGE_URL = "https://img.icons8.com/?size=40&id=z-JBA_KtSkxG&format=png&color=000000";
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

  const handleDeleteComment = async (commentId) => {
    try {
      await commentService.deleteComment(postid, commentId);
      const updatedComments = post.comments.filter((comment) => comment._id !== commentId);
      setPost((prevPost) => ({ ...prevPost, comments: updatedComments }));
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
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



              
          {user ? (
                <Link to={post.user._id === user.id ? `/profile/${post.user._id}` : `/userlist/${post.user._id}`}>
                  <div className="post-detail-user-image">
                    <img src={post.user.image || DEFAULT_IMAGE_URL} alt="Post Image" />
                    <h4>{post.user.username}</h4>
                  </div>
                </Link>
              ) : (
                <div className="post-detail-user-image">
                  <img src={post.user.image || DEFAULT_IMAGE_URL} alt="Post Image" />
                  <h4>{post.user.username}</h4>
                  <div className="login-warning" >
                    🔒 You need to log in to view profiles
                  </div>
                </div>
              )}





              {isEditing ? (
              <div className="editBox">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className="editButtons">
                <button onClick={handleEditPost}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
              ) : (
                <>
                <p>{post.text}</p>
                {post.file && (
                  <div className="postfile">
                    <button className="toggleFileButton" onClick={() => setShowFile(!showFile)}>
                      {showFile ? "Hide File" : "Show File"}
                    </button>
                    
                    {showFile && (
                      post.file.type.includes('image') ? (
                        <img src={post.file.link} alt="Post" />
                      ) : post.file.type.includes('video') ? (
                        <video controls>
                          <source src={post.file.link} type="video/mp4" />
                        </video>
                      ) : post.file.type.includes('pdf') ? (
                        <div className="pdf-container">
                          <iframe
                            src={post.file.link}
                            width="100%"
                            height="500px"
                            title={post.file.title}
                            className="file-preview-iframe"
                          />
                        </div>
                      ) : null
                    )}
                    
                  </div>
                )}
              </>
              
                
              )}
              <div className="postimg"><img src={post.image} alt="" /></div>
            </div>
            {(post.user._id === user?.id || user?.admin) && (
              <>
              <div className="buttonContainer">
              {(post.user._id === user?.id)&&
                <button className="editButton" onClick={() => setIsEditing(true)}>Edit</button>
              }
                  <button className="deleteButton" onClick={() => setShowDeleteModal(true)}>Delete</button>
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
                        ? "/icons8-love-48.png"
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
              {user&&(
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
                        {/* <Link to={comment.user._id === user?.id ? `/profile/${comment.user._id}` : `/userlist/${comment.user._id}`}>

                          <div>{comment.user?.username}</div>
                          </Link> */}

                              {user ? (

                              <Link to={comment.user._id === user?.id ? `/profile/${comment.user._id}` : `/userlist/${comment.user._id}`}>
                            <div className="comment-detail-user-image">
                              <img src={comment.user.image || DEFAULT_IMAGE_URL} alt="Post Image" />

                                <h4>{comment.user?.username}</h4>
                                
                                </div>  
                                </Link>
                              ) : (
                              <div className="comment-detail-user-image">
                              <img src={comment.user.image || DEFAULT_IMAGE_URL} alt="Post Image" />
                              <h4>{comment.user?.username}</h4>
                              {/* <div className="login-warning-comment" >
                              🔒 You need to log in to view profiles
                              </div> */}
                              </div>                   
                              )}
                          <div>
                            {new Date(comment.createdAt).toLocaleDateString(
                             navigator.language.startsWith('ar') ? 'ar-EG' : 'en-US',
                            { year: 'numeric', month: 'long', day: 'numeric' 
                        
                            })}
                        {(user?.id === comment.user?._id || user?.admin || user?.id === post.user?._id) && (
                          <div className="commentButtons">
                            <button className="trash2" onClick={() => handleDeleteComment(comment._id)}>
                              <img src="/trash2.png" alt="Delete" className="trashIcon" />
                            </button>
                          </div>
                        )} 
                         </div>

                        </div>
                        <div className="usercomment">{comment.text}</div> 
                        <FileView file={comment.file} /> 
                                           
                          
                        {user && (
                        <div className="interactionItem" onClick={() => toggleLikeComment(comment._id ,post._id)}>
                          <img
                            src={(!hasUserLikedComment && isCommentLiked) || (hasUserLikedComment && !isCommentLiked)
                              ? "/icons8-love-48.png"
                              : "/icons8-love-circled-50.png"
                            
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
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-rtx">
            <h3>Are you sure you want to delete this post?</h3>
            <div className="modal-buttons">
              <button className="confirm" onClick={() => {
                handleDeletePost(postid, path);
                setShowDeleteModal(false);
              }}>Yes, Delete</button>
              <button className="cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PostDetails;
