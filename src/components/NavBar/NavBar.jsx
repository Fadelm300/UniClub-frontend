import { Link } from 'react-router-dom';
import './NavBar.css';
import React from 'react';

const NavBar = ({ user, handleSignout }) => { 
  const DEFAULT_IMAGE_URL = "https://img.icons8.com/?size=40&id=z-JBA_KtSkxG&format=png&color=000000";

  return (
    <>
      {user ? (
        <nav>
          <div className="links-container"></div>

          <div className="topNav">
            <Link className="logoHome" to="/">
              <div className="Navimg">
                <img className="imginthenav" src="/newlogo.png" alt="UoB Logo" />
              </div>
            </Link>

            <div className="otherNav">
              <li>
                <Link to="/userlist">
                  <img
                  className='imgSerch'
                    src="https://img.icons8.com/?id=12773&format=png&color=000000"
                    alt="Search Logo"
                  />
                </Link>
              </li>
              <li className='profilePicAndName'>
                <Link to={`/profile/${user.id}`}>
                 
                  <img
                        className="profilePic"
                        src={user?.image || DEFAULT_IMAGE_URL}
                        alt="User Avatar"
                      />
                  <div className='username-nav'>{user.username}</div>
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
              </li> 
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
