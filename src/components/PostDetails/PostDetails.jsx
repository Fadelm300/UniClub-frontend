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

//func 
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";

const PostDetails = ({user, handleDeletePost}) => {
  const { postid } = useParams();
  const [post, setPost] = useState(null);
  console.log(postid)
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });


  useEffect(()=>{
    async function getPost(){
      const postData = await postService.show(path , postid)
      setPost(postData)
    }
    getPost()
  },[postid])

  const handleAddComment = async (formData) => {
    const newComment = await commentService.create(path , postid, formData)

    const copyPost = {...post}
    copyPost.comments.push(newComment)
    console.log("this one"+copyPost)

    setPost(copyPost)
  }


  if(!post){
    return <main><h3>borken...</h3></main>
  }
  console.log(post)
  return (
    <main>
      <div className="postmain">
        
    
      <div className="postform">
        <div className="postContener">
          <div className="PostShow">
      <h4>{post.user.username}</h4>
      <p>{post.text}</p>
      </div>
      {post.user._id === user.id && (<button
        className="deleteButton"
        onClick={() => handleDeletePost(postid, path)}
      >
        Delete
      </button>)}
      <section>
        
        <h2>replies</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!post.comments.length && <p>There are no comments.</p>}
        <div className="commentShow">
        {post.comments.map((comment) => (
         
         <div className="comments">
         <article key={comment._id}>
            <header>
             <div className="username"> 
              <p>
               {comment.user.username} posted on
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
              </div>
            </header>
            <p>{comment.text}</p>
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