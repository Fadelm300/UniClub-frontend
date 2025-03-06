import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import './Dashboard.css'; 
import UpcomingEvents from '../Events/UpcomingEvents/UpcomingEvents';
import AddChannelForm from "../Channel/AddChannelForm";
import channelService from "../../services/channelService";
 
const AdminDashboard = ({ user }) => {
  const [Channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddChannelModal, setShowAddChannelModal] = useState(false); // State to control modal visibility

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
  
  const handleDeleteChannel = async (path) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this channel? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await channelService.deleteChannel(path);  // Call the delete method from service
      setChannels((prevChannels) =>
        prevChannels.filter((channel) => channel.path !== path)
      );
      alert("Channel deleted successfully.");
    } catch (error) {
      console.error("Error deleting channel:", error);
      alert("Failed to delete the channel.");
    }
  };


  const toggleAddChannelModal = () => {
    setShowAddChannelModal(!showAddChannelModal); // Toggle modal visibility
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
    
           




      {/* Add New Channel Button */}
      <button className="channelButtonun1" onClick={toggleAddChannelModal}>
        Add New Channel
      </button>

      
    {/* Modal for adding new channel */}
      {showAddChannelModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={toggleAddChannelModal}>
              X
            </button>
            <AddChannelForm onChannelAdded={refreshChannels} />
          </div>
        </div>
      )}





             {/* Render Channels Dynamically */}
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
                         src={channel.image || "/default-channel-img.jpg"} // Fallback image if no image provided
                         alt={channel.name}
                       />
                     </div>
                     <div className="rightbox">
                       <h1>{channel.name}</h1>
                       <p>{channel.description}</p>
                       <div className="unbutton">
                         <Link to={`/${channel.path}`}>
                           <button className="channelButtonun1">Learn More</button>
                         </Link>
                         <button
                           className="deleteButton"
                           onClick={() => handleDeleteChannel(channel.path)}
                         >
                           Delete
                         </button>
                       </div>
                     </div>
                   </div>
                 ))
               )}
             </div>
     


























    
                 <div className="uobabout">
                       <div className="liftbox">
                               <img className="imgintherightbox" src="/UOB1.jpg" alt="UoB pic" />
                       </div>
                       
                       <div className="rightbox">
                              <h1>About University of BAHRAINB</h1>
                                 <p>
                                   Learn more about the history, mission, and values of the University of B.
                                 </p>
                           <div className="unbutton">
                                <Link to="/uob">
                                 <button className="channelButtonun1">Learn More</button>
                              </Link>
                           </div>
                        </div>
                 </div>
                 



                 <div className="uobabout">
                       <div className="liftbox">
                               <img className="imgintherightbox" src="/OxfordImg.jpg" alt="OxfordImg" />
                       </div>
                       
                       <div className="rightbox">
                              <h1>About University of Oxford</h1>
                                 <p>
                                   Learn more about the history, mission, and values of the University of Oxford.
                                 </p>
                                 
                           <div className="unbutton">
                                <Link to="/oxf">
                                 <button className="channelButtonun1">Learn More</button>
                              </Link>
                           </div>
                        </div>
                        
                 </div>
                 


{/* Oxford */}
                 <div className="uobabout">
                       <div className="liftbox">
                               <img className="imgintherightbox" src="/ScienceUniversity.jpg" alt="ScienceUniversity" />
                       </div>
                       
                          <div className="rightbox">
                                    <h1>About University of Science University</h1>
                                      <p>
                                        Learn more about the history, mission, and values of the University of Science University.
                                      </p>
                                      
                                <div className="unbutton">
                                      <Link to="/oxf">
                                      <button className="channelButtonun1">Learn More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>

{/* Polytechnic */}


                        <div className="uobabout">
                              <div className="liftbox">
                                      <img className="imgintherightbox" src="/PT15.jpg" alt="PT15" />
                              </div>
                              
                              <div className="rightbox">
                                          <h1>About University of Bahrain Polytechnic</h1>
                                            <p>
                                              Learn more about the history, mission, and values of the University of Bahrain Polytechnic.
                                            </p>
                                            
                                      <div className="unbutton">
                                            <Link to="/poly">
                                            <button className="channelButtonun1">Learn More</button>
                                          </Link>
                                      </div>
                                </div>
                        </div>

                        
               

             
                        
            
                           

                
                          <Link to="/AddEvent">
                                <button className="channelButtonun1">AddEvent</button>
                          </Link>
    
                               <UpcomingEvents user={user}/>   
    
          
      </div>
          
      );
};

export default AdminDashboard;
