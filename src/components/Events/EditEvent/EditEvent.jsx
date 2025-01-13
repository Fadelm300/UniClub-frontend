import React, { useState, useEffect } from 'react';
import EventService from '../../../services/EventService';
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
    logo: ''
  });
  const [oldData, setOldData] = useState({});
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Control the visibility of the modal

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await EventService.getEventById(eventid);
        const formattedEvent = {
          ...event,
          date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
        };
        setFormData(formattedEvent);
        setOldData(formattedEvent); // Store the old data
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await EventService.editEvent(eventid, formData);
      setShowModal(true); // Show the modal after successful update
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
    <div className="edit-event-container">
      <h2>Edit Event</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={formData.title} onChange={handleChange} required />

        <label htmlFor="description">Description</label>
        <input id="description" name="description" value={formData.description} onChange={handleChange} required />

        <label htmlFor="date">Date</label>
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />

        <label htmlFor="time">Time</label>
        <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required />

        <label htmlFor="location">Location</label>
        <input id="location" name="location" value={formData.location} onChange={handleChange} required />
    {/* احذفه او تاكد منه عدل اذا تحتاجه  */}
        <label htmlFor="logo">Logo URL</label>
        <input id="logo" name="logo" value={formData.logo} onChange={handleChange}  />

        <div className="button-container">
          <button type="submit" className='UpdateEvent'>Update Event</button>
        </div>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
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
              <button onClick={handleOk} className="save-btn">Save</button>
              <button onClick={handleCancel} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditEvent;
