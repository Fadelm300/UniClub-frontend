import { Link } from 'react-router-dom';
import './PostList.css';

const PostList = (props) => {
  if (!props.posts || props.posts.length === 0) return <main>No posts yet</main>;

  const sortedPosts = [...props.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      {sortedPosts.map((post, idx) => {
        const postDate = new Date(post.createdAt);

        return (
          <Link key={idx} to={`${props.path}/post/${post._id}`}>
            <div className="card">
              <div className="topCard">
                <div className="topcardtex">{post.text}</div>
              </div>
              <div className="dawnCard">
                <div className="dawncardusername">{post.user.username}</div>
                <div className="dawncardDate">
                  {postDate.toLocaleDateString()}
                  <span> | </span>
                  {postDate.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default PostList;
