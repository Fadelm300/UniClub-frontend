import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ user, handleSignout }) => {
  return (
    <>
      {user ? (
        <nav>
          <div className="links-container"></div>

          <div className="topNav">
            <Link className="logoHome" to="/">
              <div className="Navimg">
                <img className="imginthenav" src="/logo.png" alt="UoB Logo" />
              </div>
            </Link>

            <div className="otherNav">
              <li><Link to={`/profile/${user.id}`}><img  src="https://img.icons8.com/?size=50&id=kfZajSPygW1l&format=png&color=f1f2f6" alt="logopro" />
              </Link></li> {/* Profile Link */}
              <li><Link onClick={handleSignout} to="/">Sign Out</Link></li>
            </div>
          </div>
        </nav>
      ) : (
        <nav>
          <div className="links-container"></div>
          <div className="topNav">
            <Link className="logoHome" to="/">
              <div className="Navimg">
                <img className="imginthenav" src="/logo.png" alt="UoB Logo" />
              </div>
            </Link>
            <div className="otherNav">
              <li><Link to="/signin">Sign In</Link></li>
              {/* <li><Link to="/signup">Sign Up</Link></li> */}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
