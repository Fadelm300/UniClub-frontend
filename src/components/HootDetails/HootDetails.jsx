import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import hootService from "../../services/hootService";
import commentService from "../../services/commentService";

// Router
import { Link } from 'react-router-dom';


// Components
import AuthorDate from "../common/AuthorDate";
import CommentForm from '../CommentForm/CommentForm';


const HootDetails = ({user, handleDeleteHoot}) => {
  const { hootId } = useParams();
  const [hoot, setHoot] = useState(null);

  useEffect(()=>{
    async function getHoot(){
      const hootData = await hootService.show(hootId)
      setHoot(hootData)
    }
    getHoot()
  },[hootId])

  const handleAddComment = async (formData) => {
    const newComment = await commentService.create(hootId, formData)

    const copyHoot = {...hoot}
    copyHoot.comments.push(newComment)

    setHoot(copyHoot)
  }


  if(!hoot){
    return <main><h3>Loading...</h3></main>
  }

  return (
    <main>
      <header>
        <p>{hoot.category.toUpperCase()}</p>
        <h1>{hoot.title}</h1>
        <AuthorDate name={hoot.author.username} date={hoot.createdAt}/>
        {hoot.author._id === user.id && (
          <>
            <button onClick={() => handleDeleteHoot(hootId)}>Delete</button>
          </>
        )}
      </header>
      <p>{hoot.text}</p>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment}/>
        {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => (
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

export default HootDetails;