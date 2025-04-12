import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventService from "../../../services/EventService";
import ErrorModal from "../ErrorModal/ErrorModal";
import "./AddEvent.css";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
    const now = new Date();
  
    if (selectedDateTime < now) {
      setError('The event date and time cannot be in the past.');
      setShowErrorModal(true);
      return;
    }
  
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
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to add event.');
      setShowErrorModal(true);
    }
  };
  
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError("");
    const base64 = await convertBase64(file);
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/uploadImg`, { image: base64 });
      setUrl(res.data.url);
      setFormData({ ...formData, image: res.data.url });
    } catch (err) {
      if (err.response?.status === 413) {
        setError("The image is too large. Please upload a smaller file.");
      } else {
        setError("Image upload failed. Please try again.");
      }
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="add-event-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="title">Create New Event</h2>
      <motion.form
        onSubmit={handleSubmit}
        className="event-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
          required
          whileFocus={{ scale: 1.02 }}
        />
        <motion.textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Event Description"
          rows={4}
          required
          whileFocus={{ scale: 1.02 }}
        />
        <div className="datetime-group">
          <motion.input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.02 }}
          />
        </div>
        <motion.input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Event Location"
          required
          whileFocus={{ scale: 1.02 }}
        />
        <div className="file-upload">
          <label htmlFor="image" className="upload-label">
            {loading ? "Uploading..." : formData.image ? "✅ Image Uploaded" : "Upload Image"}
          </label>
          <input type="file" id="image" name="image" onChange={uploadImage} />
        </div>
        <motion.button
          type="submit"
          className="submit-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Publish Event
        </motion.button>
      </motion.form>

      <ErrorModal
        show={showErrorModal}
        message={error}
        onClose={() => setShowErrorModal(false)}
      />
    </motion.div>
  );
};

export default AddEvent;
