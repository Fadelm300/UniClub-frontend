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
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFormData({
      ...formData,
      type: selectedFile.type,
      title: selectedFile.name
    });
  };

  const toggleInputType = () => {
    setShowLinkInput(!showLinkInput);
    setFormData({ ...formData, link: '' });
    setFile(null);
  };

  const openConfirmModal = (evt) => {
    evt.preventDefault();
    if (!formData.title.trim()) return;
    setShowModal(true);
  };

  const handleConfirmedSubmit = async () => {
    setShowModal(false);
    setIsLoading(true);

    try {
      if (file) {
        const response = await postService.upload('');
        const { url: uploadUrl, publicUrl } = response;

        await fetch(uploadUrl, {
          method: 'PUT',
          body: file
        });

        const fileData = { ...formData, link: publicUrl };
        await handleAddFile(fileData, path);
      } else {
        await handleAddFile(formData, path);
      }

      setFormData({ title: '', description: '', link: '' });
      setFile(null);
      setShowSuccess(true);
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setIsLoading(false);
    }
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
        <form className="channel-form" onSubmit={openConfirmModal}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={isLoading}
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={isLoading}
          />

          <button
            type="button"
            className="submit-button"
            onClick={toggleInputType}
            disabled={isLoading}
          >
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
                disabled={isLoading}
              />
            </>
          ) : (
            <>
              <label>Choose File</label>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </>
          )}

          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Submit File"}
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
              className="modal-content-file"
              initial={{ y: '-50%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-50%', opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <button className="modal-close-x" onClick={() => setShowModal(false)}>
                &times;
              </button>
              <h3>Are you sure you want to upload this file?</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button onClick={handleConfirmedSubmit} className="confirm-button">Confirm Upload</button>
                <button onClick={() => setShowModal(false)} className="cancel-button">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content-file"
              initial={{ y: '-50%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-50%', opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <button className="modal-close-x" onClick={() => setShowSuccess(false)}>
                &times;
              </button>
              <h3>File Uploaded Successfully!</h3>
              <button onClick={() => setShowSuccess(false)} className="cancel-button">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default FileForm;
