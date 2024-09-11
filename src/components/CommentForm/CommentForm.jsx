// src/components/CommentForm/CommentForm.jsx

import { useState, useEffect } from 'react';
import './CommentForm.css'
import commentService from '../../services/commentService';

const CommentForm = ({handleAddComment}) => {
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // handleAddComment
    setFormData({ text: '' });
    handleAddComment(formData)
  };

  return (
    <form onSubmit={handleSubmit} className='m22'>
      <label htmlFor="text-input">add reply:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
        className='replaycom'
      />
      <button type="submit" className='comsubmit'><img  src="https://img.icons8.com/?size=50&id=24717&format=png&color=000000" alt="submitlogo" /></button>
    </form>
  );
};

export default CommentForm;