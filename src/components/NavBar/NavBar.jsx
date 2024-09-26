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









// import React, { useState, useEffect } from "react";
// import "./Landing.css";
// import channelService from "../../services/channelService";
// import { useParams, Link } from "react-router-dom";
// import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
// import PostList from "../PostList/PostList";
// import FileList from "../FileList/FileList";

// const Landing = (props) => {
//   const [channel, setChannel] = useState({});
//   const [viewType, setViewType] = useState("posts"); 
//   const { uni, college, major, course, event } = useParams();
//   const path = deriveChannelPath({ uni, college, major, course, event });

//   useEffect(() => {
//     async function getChannel() {
//       const channelData = await channelService.index(path);
//       setChannel(channelData);
//     }
//     getChannel();
//   }, [path]);

//   const handleViewChange = (type) => {
//     setViewType(type); 
//   };

//   return (
//     <main>
//       <div className="LandingPageMain">
//         <div className="LandingPagecontener">
     

     

//           <h1 className="titlename">{channel.name}</h1>
//           <p>{channel.description}</p>

//           {props.user && (
//             <div className="addbtn">
//               <Link>
//                 <button
//                   className="buttonsfiles"
//                   onClick={() => handleViewChange("files")}
//                 >
//                   Files
//                 </button>
//               </Link>
//               <Link>
//                 <button
//                   className="buttonsposts"
//                   onClick={() => handleViewChange("posts")}
//                 >
//                   Posts
//                 </button>
//               </Link>
//               <Link to={`${path}/newpost`}>
//                 <button className="buttonsAddPost">Add Post</button>
//               </Link>
//               <Link to={`${path}/newchannel`}>
//                 <button className="buttonsAddChannel">Add Channel</button>
//               </Link>
//               <Link to={`${path}/newfile`}>
//                 <button className="buttonsAddFile">Add File</button>
//               </Link>
//             </div>
//           )}

//           {viewType === "posts" ? (
//             <PostList
//               posts={channel.posts}
//               handleDeletePost={props.handleDeletePost}
//               path={path}
//             />
//           ) : (
//             <FileList
//               files={channel.files}
//               handleDeleteFile={props.handleDeleteFile}
//               handleUpdateFile={props.handleUpdateFile}
//               path={path}
//             />
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Landing;
