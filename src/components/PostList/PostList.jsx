import { Link } from 'react-router-dom';
import './PostList.css'

const PostList = (props) => {
  if (!props.posts || props.posts.length === 0) return <main>no posts yet</main>;

  return (
    <>
      {props.posts.map((post, idx) => {
        const postDate = new Date(post.createdAt);

        return (
          <Link to = {`${props.path}/post/${post._id}`}>
            <div key={idx} className="card">
              <div className="topCard">
                <h1>{post.text}</h1>
                <p>{post.user.username}</p>
                <p>
                  {postDate.toLocaleDateString()} {postDate.toLocaleTimeString()}{" "}
                </p>
              </div>
              <div className="dawnCard">
                <button className="deleteButton"
                  onClick={() => props.handleDeletePost(post._id, props.path)}
                >
                  Delete
                </button>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default PostList;
