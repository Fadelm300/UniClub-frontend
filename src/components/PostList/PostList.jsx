import { Link } from 'react-router-dom';
import './PostList.css'

const PostList = (props) => {
  if (!props.posts || props.posts.length === 0) return <main>no posts yet</main>;

  return (
    <>
      {props.posts.map((post, idx) => {
        const postDate = new Date(post.createdAt);

        return (
          <Link key={idx} to={`${props.path}/post/${post._id}`}>
            <div className="card">
              <div className="topCard">
                <p>{post.text}</p>
                <p>{post.user.username}</p>
                <p>
                  {postDate.toLocaleDateString()}{" "}
                  {postDate.toLocaleTimeString()}{" "}
                </p>
              </div>
              <div className="dawnCard">
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default PostList;
