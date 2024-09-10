import React, { useState, useEffect } from "react";
import "./Landing.css";
import channelService from "../../services/channelService";
import { useParams, Link } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";

const Landing = () => {
  const [channel, setChannel] = useState({});
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });

  useEffect(() => {
    async function getChannel() {
      const channelData = await channelService.index(path);
      setChannel(channelData);
    }
    getChannel();
  }, [path]);

  return (
    <main>

      <div className="LandingPageMain">
        <div className="LandingPagecontener">
          <h1>{channel.name}</h1>
          <p>{channel.description}</p>

          <Link to={`${path}/newpost`}>
              <button className="buttons">add post</button>

               </Link>
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
          {channel.subchannels?.map((subchannel) => (
            <Link key={subchannel.name} to={`${path}/${subchannel.name}`}>
              <button className="channelButton">{subchannel.name}</button>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Landing;