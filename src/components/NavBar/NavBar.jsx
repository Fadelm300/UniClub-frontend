import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ user, handleSignout }) => { // Keeping handleSignout prop
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
              <li>
                <Link to="/UserList">
                  <img
                  className='imgSerch'
                    src="icons8-reserch-64.png"
                    alt="Search Logo"
                  />
                </Link>
              </li>
              <li>
                <Link to={`/profile/${user.id}`}>
                  <img
                    src="https://img.icons8.com/?size=50&id=kfZajSPygW1l&format=png&color=f1f2f6"
                    alt="Profile Logo"
                  />
                </Link>
              </li>
              <li>
                <Link onClick={handleSignout} to="/">
                  <img
                  className='SignOutLogo'
                    src="/icons8-sign-out-50.png"
                    alt="Sign Out Logo"
                  />
                </Link>
              </li> {/* Replaced Sign Out text with a logo */}
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
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
