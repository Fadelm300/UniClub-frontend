import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import postService from "../../services/postService";
import commentService from "../../services/commentService";

// Router
import { Link } from 'react-router-dom';


// Components
import AuthorDate from "../common/AuthorDate";
import CommentForm from '../CommentForm/CommentForm';


const PostDetails = ({user, handleDeletePost}) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(()=>{
    async function getPost(){
      const postData = await postService.show(postId)
      setPost(postData)
    }
    getPost()
  },[postId])

  const handleAddComment = async (formData) => {
    const newComment = await commentService.create(postId, formData)

    const copyPost = {...post}
    copyPost.comments.push(newComment)

    setPost(copyPost)
  }


  if(!post){
    return <main><h3>No posts yet...</h3></main>
  }

  return (
    <main>
      <header>
        <p>{post.category.toUpperCase()}</p>
        <h1>{post.title}</h1>
        <AuthorDate name={post.author.username} date={post.createdAt}/>
        {post.author._id === user.id && (
          <>
            <button onClick={() => handleDeletePost(postId)}>Delete</button>
          </>
        )}
      </header>
      <p>{post.text}</p>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment}/>
        {!post.comments.length && <p>There are no comments.</p>}

        {post.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {comment.author.username} posted on
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default PostDetails;