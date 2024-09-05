import { Link } from 'react-router-dom';
import AuthorDate from '../common/AuthorDate';

const HootList = ({hoots}) => {
  if (!hoots.length) return <main>Loading...</main>;

  return <main>
      {
        hoots.map((hoot)=> <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
          <article>
            <header>
              <h2>{hoot.title}</h2>
              <AuthorDate name={hoot?.author?.username ?? "Anonymous"} date={hoot.createdAt}/>
            </header>
            <p>{hoot.text}</p>
          </article>
        </Link>)
      }
    </main>;
};

export default HootList;