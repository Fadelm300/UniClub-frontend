import { Link } from 'react-router-dom';
import AuthorDate from '../common/AuthorDate';

const PostList = ({posts}) => {
  if (!posts.length) return <main>Loading...</main>;

  return <main>
      {
        posts.map((post)=> <Link key={post._id} to={`/posts/${post._id}`}>
          <article>
            <header>
              <h2>{post.title}</h2>
              <AuthorDate name={post?.author?.username ?? "Anonymous"} date={post.createdAt}/>
            </header>
            <p>{post.text}</p>
          </article>
        </Link>)
      }
    </main>;
};

export default PostList;