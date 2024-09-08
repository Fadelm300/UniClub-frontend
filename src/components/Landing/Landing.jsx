import React, { useState, useEffect } from "react";
import "./Landing.css";
import channelService from "../../services/channelService";

const Landing = () => {
  const [channel, setChannel] = useState([]);

  useEffect(() => {
    // async function getPosts (){
    //   const postsData = await postService.index()
    //   setPosts(postsData)
    // }
    async function getChannel() {
      const channelData = await channelService.index();
      console.log(channelData);
      setChannel(channelData);
    }
    // if(user){
    //   // fetch the posts
    //   // getPosts()
    getChannel();
    // }
  }, []);
  return (
    <main>
      <div className="LandingPageMain">
        <div className="LandingPagecontener">
          <h1>Hello, you are on the landing page for visitors.</h1>

          <div className="card">
            <div className="topCard"></div>
            <div className="dawnCard"></div>
          </div>

          <div className="card">
            <div className="topCard"></div>
            <div className="dawnCard"></div>
          </div>

          <div className="card">
            <div className="topCard"></div>
            <div className="dawnCard"></div>
          </div>
          <div className="card">
            <div className="topCard"></div>
            <div className="dawnCard"></div>
          </div>
        </div>

        <div className="channelsContainer">
          {channel.subchannels?.map((channel) => (
            <button className="channelButton">{channel.name}</button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Landing;
