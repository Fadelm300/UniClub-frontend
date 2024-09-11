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
              <li><Link to={`/profile/${user.id}`}>Profile</Link></li> {/* Profile Link */}
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
              <li><Link to="/signup">Sign Up</Link></li>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
