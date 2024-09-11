import React, { useState, useEffect } from "react";
import "./Landing.css";
import channelService from "../../services/channelService";
import { useParams, Link } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
import PostList from "../PostList/PostList";
import FileList from "../FileList/FileList";

const Landing = (props) => {
  const [channel, setChannel] = useState({});
  const [viewType, setViewType] = useState("posts"); // 'posts' or 'files'
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
    setViewType(type); // Update the view type based on button click
  };

  return (
    <main>
      <div className="LandingPageMain">
        <div className="LandingPagecontener">
          <div className="landingpagContainer">
            <div className="channelsNAV">
              {channel.subchannels?.map((subchannel) => (
                <Link key={subchannel.name} to={`${path}/${subchannel.name}`}>
                  <button className="channelButton">{subchannel.name}</button>
                </Link>
              ))}
            </div>
          </div>

          <h1>{channel.name}</h1>
          <p>{channel.description}</p>

          {props.user && (
            <div className="addbtn">
              <button className="buttons" onClick={() => handleViewChange("files")}>Files</button>
              <button className="buttons" onClick={() => handleViewChange("posts")}>Posts</button>
              <Link to={`${path}/newpost`}>
                <button className="buttons">Add Post</button>
              </Link>
              <Link to={`${path}/newchannel`}>
                <button className="buttons">Add Channel</button>
              </Link>
              <Link to={`${path}/newfile`}>
                <button className="buttons">Add File</button>
              </Link>
            </div>
          )}

          {/* Conditionally render PostList or FileList based on viewType */}
          {viewType === "posts" ? (
            <PostList posts={channel.posts} handleDeletePost={props.handleDeletePost} path={path} />
          ) : (
            <FileList files={channel.files} path={path} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Landing;
