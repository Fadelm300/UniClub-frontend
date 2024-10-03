import React, { useState } from 'react';
import EventService from '../../../services/EventService';
import { useNavigate } from 'react-router-dom';
import Modal from '../ConfirmAddEvent/Modal'; 
import './AddEvent.css';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    logo: ''
  });
  const [error, setError] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const confirmMessage = `Confirm event creation:\n
      Title: ${formData.title}\n
      Description: ${formData.description}\n
      Date: ${formData.date}\n
      Time: ${formData.time}\n
      Location: ${formData.location}\n
      Logo URL: ${formData.logo}
    `;

    setModalMessage(confirmMessage);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    try {
      await EventService.addEvent(formData);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        logo: ''
      });
      setTimeout(() => navigate('/'), 0);
    } catch (err) {
      setError(err.message);
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="add-event-container">
      <h2>Add Event</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          placeholder="Logo URL"
          required
        />
        <button type="submit">Add Event</button>
      </form>

      {showModal && (
        <Modal
          message={modalMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default AddEvent;
