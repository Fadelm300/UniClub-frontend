import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EventService from '../../../services/EventService';
import postService from '../../../services/postService';
import { useParams, useNavigate } from 'react-router-dom';
import './EditEvent.css';

const EditEvent = () => {
  const { eventid } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: ''
  });
  const [file, setFile] = useState(null);
  const [oldData, setOldData] = useState({});
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await EventService.getEventById(eventid);
        const formattedEvent = {
          ...event,
          date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
        };
        setFormData(formattedEvent);
        setOldData(formattedEvent);
      } catch (err) {
        setError(err.message);
      }
    };
    if (eventid) {
      fetchEvent();
    }
  }, [eventid]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(file) {
        const response = await postService.upload()
        const formDataLink = { ...formData, image: response.publicUrl };
        const { url: uploadUrl } = response;
        const r2 = await fetch(uploadUrl, { 
          method: 'PUT',
          body: file,
        });
        await EventService.editEvent(eventid, formDataLink);
      }else{
        await EventService.editEvent(eventid, formData);
      }
      setShowModal(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOk = () => {
    setShowModal(false);
    navigate('/');
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const hasChanged = (field) => oldData[field] !== formData[field];

  return (
    <motion.div 
      className="edit-event-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Edit Event</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <motion.input id="title" name="title" value={formData.title} onChange={handleChange} required 
          whileHover={{ scale: 1.02, transition: { duration: 0.15 } }} />

        <label htmlFor="description">Description</label>
        <motion.input id="description" name="description" value={formData.description} onChange={handleChange} required 
          whileHover={{ scale: 1.02, transition: { duration: 0.15 } }} />

        <label htmlFor="date">Date</label>
        <motion.input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required 
          whileHover={{ scale: 1.02, transition: { duration: 0.15 } }} />

        <label htmlFor="time">Time</label>
        <motion.input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required 
          whileHover={{ scale: 1.02, transition: { duration: 0.15 } }} />

        <label htmlFor="location">Location</label>
        <motion.input id="location" name="location" value={formData.location} onChange={handleChange} required 
          whileHover={{ scale: 1.02, transition: { duration: 0.15 } }} />

        <label htmlFor="logo">picture</label>
        <motion.input  type='file' accept='image/* 'id="logo" name="logo"onChange={handleFileChange} 
          whileHover={{ scale: 1.02, transition: { duration: 0.15 } }} />

        <div className="button-container">
          <motion.button type="submit" className='UpdateEvent'
            whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}>
            Update Event
          </motion.button>
        </div>
      </form>

      {showModal && (
        <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="modal-content" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
            <h3>Event Updated Successfully!</h3>
            {hasChanged('title') && (
              <div>
                <p><strong>Old Title:</strong> {oldData.title}</p>
                <p><strong>New Title:</strong> {formData.title}</p>
              </div>
            )}
            {hasChanged('date') && (
              <div>
                <p><strong>Old Date:</strong> {oldData.date}</p>
                <p><strong>New Date:</strong> {formData.date}</p>
              </div>
            )}
            {hasChanged('description') && (
              <div>
                <p><strong>Old Description:</strong> {oldData.description}</p>
                <p><strong>New Description:</strong> {formData.description}</p>
              </div>
            )}
            {hasChanged('time') && (
              <div>
                <p><strong>Old Time:</strong> {oldData.time}</p>
                <p><strong>New Time:</strong> {formData.time}</p>
              </div>
            )}
            {hasChanged('location') && (
              <div>
                <p><strong>Old Location:</strong> {oldData.location}</p>
                <p><strong>New Location:</strong> {formData.location}</p>
              </div>
            )}
            {hasChanged('logo') && (
              <div>
                <p><strong>Old Logo:</strong> {oldData.logo}</p>
                <p><strong>New Logo:</strong> {formData.logo}</p>
              </div>
            )}
            <div className="modal-buttons">
              <motion.button onClick={handleOk} className="save-btn"
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}>
                Save
              </motion.button>
              <motion.button onClick={handleCancel} className="cancel-btn"
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}>
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EditEvent;