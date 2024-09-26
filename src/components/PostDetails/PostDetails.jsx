import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './PostDetails.css';
// Services
import postService from "../../services/postService";
import commentService from "../../services/commentService";

// Router
import { Link } from 'react-router-dom';

// Components
import AuthorDate from "../common/AuthorDate";
import CommentForm from '../CommentForm/CommentForm';

// Function
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";

const PostDetails = ({ user, handleDeletePost }) => {
  const { postid } = useParams();
  const [post, setPost] = useState(null);
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });

  useEffect(() => {
    async function getPost() {
      const postData = await postService.show(path, postid);
      setPost(postData);
    }
    getPost();
  }, [postid, path]);

  const handleAddComment = async (formData) => {
    const newComment = await commentService.create(path, postid, formData);

    const copyPost = { ...post };
    copyPost.comments.push(newComment);

    setPost(copyPost);
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
              <p>{post.text}</p>
            </div>
            {post.user._id === user?.id && (
              <button
                className="deleteButton"
                onClick={() => handleDeletePost(postid, path)}
              >
                Delete
              </button>
            )}
            <section>
              <CommentForm handleAddComment={handleAddComment} />
              {!post.comments.length && <p>There are no comments.</p>}
              <div className="commentShow">
                <h4>Replies</h4>
                {post.comments.map((comment) => (
                  <div className="comments" key={comment._id}> {/* Unique key added here */}
                    <article>
                      <header>
                        <div className="usernamecontener"> 
                          <div>
                            {comment.user?.username} 
                          </div>
                          <div>
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </div>
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
