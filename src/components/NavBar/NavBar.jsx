import { Link } from 'react-router-dom';
import './NavBar.css'
const NavBar = ({ user, handleSignout }) => {
  return (
    <>
      { user ? (
        
        <nav>
            <div class="links-container"></div>


          <div className='topNav'>
                 <Link className='logoHome' to="/">
                   <div className="Navimg">
                     <img className="imginthenav" src="/logo.png" alt="UoB Logo" />
                   </div>
                 </Link>
          </div>

          <div className='downNav'>
             <div className="dropNav">
              
                  <li > <Link >Category</Link>
                  <ul className="dropdownMenu">
                      <li> <Link to="/posts/new">NEW Post</Link> </li>
                      <li><Link to="/uob">Category 1</Link></li>
                      <li><Link to="/posts/category2">Category 2</Link></li>
                      <li><Link to="/posts/category3">Category 3</Link></li>
                  </ul>
              
                  </li>
                    </div>


              <div className='otherNav'>
              <li>  <Link to='/posts'>Posts</Link></li>
              <li> <Link to="/posts/new">NEW Post</Link> </li>
            <li> <Link onClick={handleSignout} to="">Sign Out</Link> </li>
            
           
            </div>
          </div>


         
        </nav>
      ) : (
      <nav>
      <div className="links-container"></div>
      <div className='topNav'>
          <Link className='logoHome' to="/">
            <div className="Navimg">
              <img className="imginthenav" src="/logo.png" alt="UoB Logo" />
            </div>
          </Link>
      </div>

<div className='downNav'>
 <div className="dropNav">
  
  
  
    
        </div>


             <div className='otherNav'>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
  

            </div>
</div>



      </nav>
      )}
    </>
  )
}

export default NavBar;