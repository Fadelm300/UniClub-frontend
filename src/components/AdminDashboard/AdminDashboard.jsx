import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import './Dashboard.css'; 
import UpcomingEvents from '../Events/UpcomingEvents/UpcomingEvents';
import AddChannelForm from "../Channel/AddChannelForm";
import channelService from "../../services/channelService";
 import ExpectSection from "../ExpectSection/ExpectSection"
const AdminDashboard = ({ user }) => {
  const [Channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddChannelModal, setShowAddChannelModal] = useState(false); // State to control modal visibility
  const [showDeleteModal33, setShowDeleteModal33] = useState(false);
  const [channelToDelete33, setChannelToDelete33] = useState(null);
  const [deleteFeedbackMessage, setDeleteFeedbackMessage] = useState('');

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
  const handleDeleteChannel33 = (path) => {
    setChannelToDelete33(path);
    setShowDeleteModal33(true);
  };

  const handleConfirmDelete33 = async () => {
    if (!channelToDelete33) return;
    try {
      await channelService.deleteChannel(channelToDelete33);
      setChannels((prevChannels) =>
        prevChannels.filter((channel) => channel.path !== channelToDelete33)
      );
      setDeleteFeedbackMessage('✅ Channel has been deleted successfully.');
      setChannelToDelete33(null);
    } catch (error) {
      console.error("Error deleting channel:", error);
      setDeleteFeedbackMessage('❌ Failed to delete the channel.');
    }
  };
  

  const toggleAddChannelModal = () => {
    setShowAddChannelModal(!showAddChannelModal);
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
      <button className="channelButtonunadd" onClick={toggleAddChannelModal}>
        Add New Channel
      </button>

      
    {/* Modal for adding new channel */}
      {showAddChannelModal && (
        <div className="modal-overlay">
          <div className="modal-content1">
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
                         <button
                           className="deleteButton"
                           onClick={() => handleDeleteChannel33(channel.path)}
                         >
                           Delete
                         </button>
                       </div>
                     </div>
                   </div>
                 ))
               )}
             </div>
     
             {showDeleteModal33 && (
  <div className="modal-overlay">
    <div className="modal-content">
      {deleteFeedbackMessage ? (
        <>
          <p>{deleteFeedbackMessage}</p>
          <button
            className="confirm-button"
            onClick={() => {
              setShowDeleteModal33(false);
              setDeleteFeedbackMessage('');
            }}
          >
            Close
          </button>
        </>
      ) : (
        <>
          <p>Are you sure you want to delete this channel?</p>
          <button className="confirm-button" onClick={handleConfirmDelete33}>Confirm</button>
          <button className="cancel-button" onClick={() => {
            setShowDeleteModal33(false);
            setChannelToDelete33(null);
          }}>
            Cancel
          </button>
        </>
      )}
    </div>
  </div>
)}


    
    
            <div className="UpcomingEvents">
                          <Link to="/AddEvent">
                                <button className="channelButtonunadd">Add New Event</button>
                          </Link>
                 <UpcomingEvents user={user}/>
                 
                 
                 </div>


                 

<ExpectSection/>







          
          
      </div>
          
      );
};

export default AdminDashboard;
