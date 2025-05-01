import { useState } from 'react';
import './ChannelForm.css';
import { useParams } from 'react-router-dom';
import { deriveChannelPath } from '../../utils/helpers/urlHelpers';
import postService from '../../services/postService';
import { motion, AnimatePresence } from 'framer-motion';

const ChannelForm = ({ handleAddchannel }) => {
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    picture: '',
    titel: ''
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.titel.trim()) newErrors.titel = 'Title is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!validate()) return;

    try {
      if (file) {
        const response = await postService.upload('');
        const { url: uploadUrl, publicUrl } = response;
        await fetch(uploadUrl, { method: 'PUT', body: file });
        handleAddchannel({ ...formData, picture: publicUrl }, path);
      } else {
        handleAddchannel(formData, path);
      }

      setShowModal(true);
      setFormData({ name: '', description: '', picture: '', titel: '' });
      setFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <main className="channel-main">
      <motion.div
        className="form-3d-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Create New Channel</h2>
        <form className="channel-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="titel"
            placeholder="Title"
            value={formData.titel}
            onChange={handleChange}
            className={errors.titel ? 'input-error' : ''}
          />
          {errors.titel && <span className="error-text">{errors.titel}</span>}

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'input-error' : ''}
          />
          {errors.description && <span className="error-text">{errors.description}</span>}

          {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}
 <motion.input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            whileHover={{ scale: 1.01 }}
          />
          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 Launch Channel
          </motion.button>
        </form>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 2.6 }}
            >
              <h3>✅ Channel Created Successfully!</h3>
              <button onClick={() => setShowModal(false)} className="close-modal">x</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ChannelForm;
