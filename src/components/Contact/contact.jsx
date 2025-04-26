import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import contactService from '../../services/contactService';
import authService from '../../services/authService';
import './contact.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  useEffect(() => {
    const fetchUserAndMessages = async () => {
      try {
        const userData = await authService.getUser();
        setUser(userData);

        if (userData.admin) {
          setIsAdmin(true);
          const token = localStorage.getItem('token');
          const allMessages = await contactService.getAllMessages(token);
          setMessages(allMessages);
        }
      } catch (error) {
        console.error('Error fetching user or messages:', error);
      }
    };

    fetchUserAndMessages();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactService.sendContactMessage(formData);
      setStateMessage({ type: 'success', text: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStateMessage({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (msg) => {
    setMessageToDelete(msg);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await contactService.deleteMessage(messageToDelete._id, token);
      setMessages((prev) => prev.filter((m) => m._id !== messageToDelete._id));
      setShowDeleteModal(false);
      setMessageToDelete(null);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setMessageToDelete(null);
  };

  if (isAdmin) {
    return (
      <div className="contact-container">
        <h1>All Contact Messages</h1>
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          <div className="messages-list">
            {messages.map((msg) => (
              <div key={msg._id} className="message-card">
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> <a href={`mailto:${msg.email}`} className="email-link">{msg.email}</a></p>
                <p><strong>Message:</strong> {msg.message}</p>
                <p className="message-date">
                  {new Date(msg.createdAt).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
                <motion.button
                  className="delete-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openDeleteModal(msg)}
                >
                  Delete
                </motion.button>
              </div>
            ))}
          </div>
        )}

     
     {showDeleteModal && (
        <div className="delete-modal-contact-overlay">
          <motion.div 
            className="delete-modal-contact" 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this message?</p>
            <div className="modal-buttons-contact">
              <button className="confirm-btn-contact" onClick={confirmDelete}>Yes, Delete</button>
              <button className="cancel-btn-contact" onClick={cancelDelete}>Cancel</button>
            </div>
          </motion.div>
        </div>
      )}
      </div>
    );
  }

  return (
    <motion.div
      className="contact-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out to us!</p>
      <motion.form
        className="contact-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <label htmlFor="name">Name:</label>
        <motion.input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          whileFocus={{ scale: 1.02, borderColor: '#2563eb' }}
        />

        <label htmlFor="email">Email:</label>
        <motion.input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          whileFocus={{ scale: 1.02, borderColor: '#2563eb' }}
        />

        <label htmlFor="message">Message:</label>
        <motion.textarea
          id="message"
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          whileFocus={{ scale: 1.02, borderColor: '#2563eb' }}
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, backgroundColor: '#2563eb' }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </motion.button>
      </motion.form>

      {stateMessage && (
        <div className={`message ${stateMessage.type}`}>{stateMessage.text}</div>
      )}
    </motion.div>
  );
};

export default ContactUs;
