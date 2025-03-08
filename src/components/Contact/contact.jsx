import React from 'react';
import { motion } from 'framer-motion';
import './contact.css';

const ContactUs = () => {
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
          whileFocus={{ scale: 1.02, borderColor: '#2563eb' }}
        />

        <label htmlFor="email">Email:</label>
        <motion.input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="Your Email"
          whileFocus={{ scale: 1.02, borderColor: '#2563eb' }}
        />

        <label htmlFor="message">Message:</label>
        <motion.textarea 
          id="message" 
          name="message" 
          placeholder="Your Message"
          whileFocus={{ scale: 1.02, borderColor: '#2563eb' }}
        ></motion.textarea>

        <motion.button 
          type="submit"
          whileHover={{ scale: 1.05, backgroundColor: '#2563eb' }}
          whileTap={{ scale: 0.95 }}
        >
          Send
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default ContactUs;