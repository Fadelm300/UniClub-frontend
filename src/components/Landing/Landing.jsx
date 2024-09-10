import React, { useState, useEffect } from "react";
import "./Landing.css";
import channelService from "../../services/channelService";
import { useParams, Link } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
import PostList from "../PostList/PostList";




const Landing = (props) => {
  console.log(props.handleDeletePost)
  const [channel, setChannel] = useState({});
  // const [post, setPost] = useState({});
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });

  useEffect(() => {
    async function getChannel() {
      const channelData = await channelService.index(path);
      setChannel(channelData);
    }
    getChannel();
  }, [path]);

  console.log(channel.posts);

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
            <>
            <div className="addbtn">
            <Link to={`${path}/newpost`}>
              <button className="buttons">Add Post</button>
            </Link>
         
            <Link to={`${path}/newchannel`}>
              <button className="buttons">Add channel</button>
            </Link>
            </div>
         
            </>
          )}


          <PostList
            posts={channel.posts}
            handleDeletePost={props.handleDeletePost}
            path={path}
          />
        </div>

       
      </div>
    </main>
  );
};

export default Landing;