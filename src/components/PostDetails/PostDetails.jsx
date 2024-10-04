import { useParams } from "react-router-dom";
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
    await postService.update(postid, { text: editText }, path);
    setPost((prevPost) => ({ ...prevPost, text: editText }));
    setIsEditing(false);
  };

  if (!post) {
    return <main><h3>Loading...</h3></main>;
  }

  return (
    <main>
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
              </>
            )}
            <section>
              <CommentForm handleAddComment={handleAddComment} />
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
