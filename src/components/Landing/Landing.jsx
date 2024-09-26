import React, { useState, useEffect } from "react";
import "./Landing.css";
import channelService from "../../services/channelService";
import { useParams, Link } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
import PostList from "../PostList/PostList";
import FileList from "../FileList/FileList";

const Landing = (props) => {
  const [channel, setChannel] = useState({});
  const [viewType, setViewType] = useState("posts"); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For controlling the sidebar
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });

  useEffect(() => {
    async function getChannel() {
      const channelData = await channelService.index(path);
      setChannel(channelData);
    }
    getChannel();
  }, [path]);

  const handleViewChange = (type) => {
    setViewType(type); 
  };

  // Toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main>
      <div className="LandingPageMain">
        <button className="toggleSidebarBtn" onClick={toggleSidebar}>
          {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
        </button>

        {/* sidebar */}
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="channelsNAV">
            {channel.subchannels?.map((subchannel) => (
              <Link key={subchannel.name} to={`${path}/${subchannel.name}`}>
                <button className="channelButton">{subchannel.name}</button>
              </Link>
            ))}
          </div>
        </div>

        <div className="mainContent">
          <h1 className="titlename">{channel.name}</h1>
          <p>{channel.description}</p>

          {props.user && (
            <div className="addbtn">
              <button
                className="buttonsfiles"
                onClick={() => handleViewChange("files")}
              >
                Files
              </button>
              <button
                className="buttonsposts"
                onClick={() => handleViewChange("posts")}
              >
                Posts
              </button>
              <Link to={`${path}/newpost`}>
                <button className="buttonsAddPost">Add Post</button>
              </Link>
              <Link to={`${path}/newchannel`}>
                <button className="buttonsAddChannel">Add Channel</button>
              </Link>
              <Link to={`${path}/newfile`}>
                <button className="buttonsAddFile">Add File</button>
              </Link>
            </div>
          )}

          {viewType === "posts" ? (
            <PostList
              posts={channel.posts}
              handleDeletePost={props.handleDeletePost}
              path={path}
            />
          ) : (
            <FileList
              files={channel.files}
              handleDeleteFile={props.handleDeleteFile}
              handleUpdateFile={props.handleUpdateFile}
              path={path}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Landing;
