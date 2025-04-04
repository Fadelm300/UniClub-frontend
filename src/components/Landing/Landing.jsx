import React, { useState, useEffect } from "react";
import "./Landing.css";
import channelService from "../../services/channelService";
import { useParams, Link } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
import PostList from "../PostList/PostList";
import FileList from "../FileList/FileList";
import RightNav  from '../rightNav/rightNav';
import LeftNav from '../LeftNav/LeftNav';

const Landing = (props) => {
  const [viewType, setViewType] = useState("posts"); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [members, setMembers] = useState(0);
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subchannelToDelete, setSubchannelToDelete] = useState(null);

  useEffect(() => {
    async function getChannel() {
      const channelData = await channelService.index(path);
      props.setChannel(channelData);
      setIsMember(channelData.members?.includes(props.user?.id)); 
      setMembers(channelData.members.length);
    }
    getChannel();
  }, [path, props.user]);

  const handleViewChange = (type) => {
    setViewType(type); 
  };

  const [isToggling, setIsToggling] = useState(false);

  const toggleMembership = async () => {
    if (isToggling) return; // Prevent duplicate calls while toggling
  
    try {
      setIsToggling(true); 
      setIsMember(!isMember);
      if (isMember) {
        setMembers(members-1);
      } else {
        setMembers(members+1);
      } 
      await channelService.toggleMembership(props.user.id, props.channel._id);
    } catch (error) {
      console.error("Error toggling membership:", error);
      setIsMember(isMember); 
    } finally {
      setIsToggling(false); 
    }
  };
  
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


 const confirmDeleteSubchannel = (subchannelId) => {
    setSubchannelToDelete(subchannelId);
    setShowDeleteModal(true);
  };

  const handleDeleteSubchannel = async () => {
    if (!subchannelToDelete) return;

    try {
      await channelService.deleteSubchannel(subchannelToDelete);
      setChannel((prevChannel) => ({
        ...prevChannel,
        subchannels: prevChannel.subchannels.filter((sub) => sub._id !== subchannelToDelete),
      }));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting subchannel:", error);
      alert("Failed to delete the subchannel.");
    }
  };
  
  return (
    <main>
      <div className="LandingPageMain">
        <button className="toggleSidebarBtn" onClick={toggleSidebar}>
          {isSidebarOpen ? <img className="closNavLogo" src="https://img.icons8.com/?&id=13903&format=png&color=000000" alt="closNavLogo" /> :  <img className="OpenNavLogo" src="https://img.icons8.com/?id=Idvk8HDG8UEG&format=png&color=000000" alt="OpenNavLogo" /> }
        </button>

        {/* sidebar */}
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="channelsNAV">
             <Link className="logoHomeLandin" to="/">
                          <div className="NavimgLanding">
                            <img className="imginthenav22" src="/newlogo.png" alt="UoB Logo" />
                          </div>
                        </Link>
              {props.user?.admin &&(
                          <Link to={`${path}/newchannel`}>
                            <button className="channelButton2">Add Channel</button>
                          </Link>
                        )}

                        
                      <div className="navBar">
                        <Link to={`${path}/newpost`} className="navItem">
                          <img className="navIcon" src="/icons8-add-94.png" alt="Add Post" />
                          <span>New Post</span>
                        </Link>

                        <Link to={`${path}/newfile`} className="navItem">
                          <img className="navIcon" src="/icons8-add-file-50.png" alt="Add File" />
                          <span>New File</span>
                        </Link>
                      </div>


            <span></span>

            <hr className="separatorLine" />
            {props.channel.subchannels?.map((subchannel) => (
                  <div key={subchannel._id} className="subchannel-container">
                    
                    <Link to={`${path.endsWith(subchannel.name) ? path : `${path}/${subchannel.name}`}`}>
                      <button className="channelButton">{subchannel.name}</button>
                    </Link>

                    {props.user?.admin && (
                      <button
                        className="deleteButtonconfirmDeleteSubchannel"
                        onClick={() => confirmDeleteSubchannel(subchannel._id)}
                      >
                        Delete
                      </button>
                      
                    )}

                  </div>
                  
                ))}

          </div>
        </div>
        <div className="mainContentWithRightNav">
          <LeftNav/>
        <div className="mainContent">
          <h1 className="titlename">{props.channel.name}</h1>
          <p>{props.channel.description}</p>
          <Link to={`${path}/members`}>
          <div>{members} {members==1?'member':'members'} </div>
          </Link>
          {props.user && (
            <div className="addbtn">
              
              <Link>
                <button className="buttonsfiles" onClick={() => handleViewChange("files")}>Files</button>
              </Link>

              <Link>
                <button className="buttonsposts" onClick={() => handleViewChange("posts")}>Posts</button>
              </Link>

              
              {/* <Link to={`${path}/newpost`}>
                <button className="buttonsAddPost">Add Post</button>
              </Link>
            <Link to={`${path}/newfile`}>
                            <button className="buttonsAddFile">Add File</button>
                          </Link> */}

              {(props.user?.admin || props.channel.moderators?.includes(props.user?.id))&& (
                <>
                <Link to={`${path}/newchannel`}>
                  <button className="buttonsAddChannel">Add Channel</button>
                </Link>
                <Link to={`${path}/reports`}>
                  <button className="buttonsAddChannel">REPORTS</button>
                </Link>
                </>

              )}

             

              <Link to={``}>
              <button onClick={toggleMembership} className=" buttonsAddChannel">
                {isMember ? 'Leave Channel' : 'Join Channel'}
              </button>
              </Link>

            </div>
          )}

          {viewType === "posts" ? (
            <PostList
              posts={props.channel.posts}
              handleDeletePost={props.handleDeletePost}
              path={path}
              toggleLike={props.toggleLike}
              user={props.user}
            />
          ) : (
            <FileList
              files={props.channel.files}
              handleDeleteFile={props.handleDeleteFile}
              handleUpdateFile={props.handleUpdateFile}
              path={path}
            />
          )}

        </div>
        <RightNav />

        </div>
      </div>
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete this subchannel?</p>
            <button onClick={handleDeleteSubchannel}>Confirm</button>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Landing;
