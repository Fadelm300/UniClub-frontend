import React, { useState, useEffect } from "react";
import "./Landing.css";
import channelService from "../../services/channelService";
import { useParams, Link } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";

const Landing = () => {
  const [channel, setChannel] = useState({});
  const { uni ,college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni ,college, major, course, event });

  async function getChannel() {
    const channelData = await channelService.index(path);
    console.log(channelData);
    setChannel(channelData);
  }

  useEffect(() => {
    getChannel();
  }, []);

  useEffect(() => {
    if (channel.path !== path) {
      getChannel();
    }
    console.log(path);
    console.log("CHANNEL PATH", channel);
  }, [channel]);

  return (
    <main>
      <div className="LandingPageMain">
        <div className="LandingPagecontener">
          <h1>{channel.name}</h1>
          <p>{channel.description}</p>

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
            <Link to={`${path}/${channel.name}`}>
              <button className="channelButton">{channel.name}</button>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Landing;
