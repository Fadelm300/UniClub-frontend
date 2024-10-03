import React, { useState } from 'react';
import EventService from '../../../services/EventService';
import './AddEvent.css'

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await EventService.addEvent(formData);
      alert('Event added successfully!');
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        logo: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-event-container">
      <h2>Add Event</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        <input name="logo" value={formData.logo} onChange={handleChange} placeholder="Logo URL" required />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
