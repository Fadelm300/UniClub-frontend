import { useState } from 'react';
import './FileForm.css';
import { useParams } from 'react-router-dom';
import { deriveChannelPath } from '../../utils/helpers/urlHelpers';
import postService from '../../services/postService';
import { motion, AnimatePresence } from 'framer-motion';

const FileForm = ({ handleAddFile }) => {
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
  });

  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(true);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFormData({ ...formData, type: selectedFile.type, title: selectedFile.name });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!formData.title.trim()) return;

    try {
      if (file) {
        const response = await postService.upload('');
        const { url: uploadUrl, publicUrl } = response;

        await fetch(uploadUrl, {
          method: 'PUT',
          body: file
        });

        const fileData = { ...formData, link: publicUrl };
        handleAddFile(fileData, path);
      } else {
        handleAddFile(formData, path);
      }

      setFormData({ title: '', description: '', link: '' });
      setFile(null);
      setShowModal(true);
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  const toggleInputType = () => {
    setShowLinkInput(!showLinkInput);
    setFormData({ ...formData, link: '' });
    setFile(null);
  };

  return (
    <main className="channel-main">
      <motion.div
        className="form-3d-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Upload New File</h2>
        <form className="channel-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <button type="button" className="submit-button" onClick={toggleInputType}>
            {showLinkInput ? "Switch to File" : "Switch to Link"}
          </button>

          {showLinkInput ? (
            <>
              <label>File Link</label>
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <label>Choose File</label>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
              />
            </>
          )}

          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit File
          </motion.button>
        </form>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ y: '-50%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-50%', opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3>File Uploaded Successfully!</h3>
              <button onClick={() => setShowModal(false)} className="close-modal">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default FileForm;
