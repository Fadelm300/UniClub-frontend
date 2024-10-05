import React, { useState } from 'react';
import EventService from '../../../services/EventService';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../ErrorModal/ErrorModal';
import './AddEvent.css';
import axios from 'axios';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false); 
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await EventService.addEvent(formData);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        image: ''
      });
      setTimeout(() => navigate('/'), 0);
    } catch (err) {
      setError(err.message);
      setShowErrorModal(true); 
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    const files = event.target.files[0];
    if (!files) return;

    setError('');

    const base64 = await convertBase64(files);
    setLoading(true);

    axios
      .post(`${BASE_URL}/uploadImg`, { image: base64 })
      .then((res) => {
        setUrl(res.data.url);
        setFormData({ ...formData, image: res.data.url });
        setError('');
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 413) {
          setError('The image is too large. Please upload a smaller file.');
        }
        setShowErrorModal(true); 
      });
  };

  return (
    <div className="add-event-container">
      <h2>Add Event</h2>
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
        <input type="file" id="image" name="image" onChange={uploadImage} />
        <button type="submit">Add Event</button>
      </form>

      {/* Error Modal */}
      <ErrorModal
        show={showErrorModal}
        message={error}
        onClose={() => setShowErrorModal(false)}
      />
    </div>
  );
};

export default AddEvent;
