import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import './Dashboard.css'; 
import UpcomingEvents from '../Events/UpcomingEvents/UpcomingEvents';
import channelService from "../../services/channelService";
 import ExpectSection from "../ExpectSection/ExpectSection"
const Dashboard = ({ user }) => {
  const [Channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const data = await channelService.getbasechannel();
        setChannels(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

const refreshChannels = async () => {
    try {
      const data = await channelService.getbasechannel(); // Re-fetch channels
      setChannels(data);  // Update the state to trigger re-render
    } catch (err) {
      console.error("Error refreshing channels:", err);
    }
  };

  return (

    <div className="LandingRealContainer">
    
    
                <div className="landingimg">
                 <div className="landing-text">
                  <p className="titleUniClub">UniClub</p>
                   <p>
                     UniClub is a platform designed to provide university students with essential academic resources and tools. Founded in 2024, we aim to simplify student life and support academic success.
                   </p>
                 </div>
                 <img className="imginthelanding" src="/Untitled-design.png" alt="Untitled-design" />
                </div>
    
           

             <div className="channel-list">
               {loading ? (
                 <p>Loading channels...</p>
               ) : error ? (
                 <p>Error loading channels: {error}</p>
               ) : (
                 Channels.map((channel) => (
                   <div className="uobabout" key={channel._id}>
                     <div className="liftbox">
                       <img
                         className="imgintherightbox"
                         src={channel.picture || "/default-channel-img.jpg"} // Fallback image if no image provided
                         alt={channel.name}
                       />
                     </div>
                     <div className="rightbox">

                     <h1>{channel.titel}</h1>
                       <h2>{channel.name}</h2>
                       <p>{channel.description}</p>

                       <div className="unbutton">
                         <Link to={`/${channel.path}`}>
                           <button className="channelButtonun1">View More</button>
                         </Link>
                        
                       </div>
                     </div>
                   </div>
                 ))
               )}
             </div>
     


    
            <div className="UpcomingEvents">
                          
                 <UpcomingEvents user={user}/>
                 
                 
                 </div>


                 

            <ExpectSection/>



      </div>
          
      );
};

export default Dashboard;
