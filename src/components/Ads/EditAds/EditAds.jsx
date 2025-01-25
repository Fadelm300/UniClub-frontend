import React, { useState, useEffect } from 'react';
import AdService from '../../../services/AdsService'; // Updated service import
import { useParams, useNavigate } from 'react-router-dom';
import './EditAds.css'; // Updated CSS file import

const EditAd = () => {
  const { adId } = useParams(); // Updated param
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [oldData, setOldData] = useState({});
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const ad = await AdService.getAdById(adId);
        setFormData(ad);
        setOldData(ad); // Store old data
        console.log('Fetched Ad:', ad);  // Log the fetched ad data for debugging
      } catch (err) {
        setError(err.message);
      }
    };
    if (adId) {
      fetchAd();
    }
  }, [adId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AdService.editAd(adId, formData);
      setShowModal(true); // Show modal on success
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOk = () => {
    setShowModal(false);
    navigate('/'); // Navigate back to home or ads list
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const hasChanged = (field) => oldData[field] !== formData[field];

  return (
    <div className="edit-ad-container">
      <h2>Edit Ad</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {/* Show loading message while data is being fetched */}
      {formData && formData.title && formData.description && formData.image ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />

          <div className="button-container">
            <button type="submit" className="update-ad">
              Update Ad
            </button>
          </div>
        </form>
      ) : (
        <p>Loading ad details...</p>
      )}

      {/* Modal after successful update */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Ad Updated Successfully!</h3>
            {hasChanged('title') && (
              <div>
                <p><strong>Old Title:</strong> {oldData.title}</p>
                <p><strong>New Title:</strong> {formData.title}</p>
              </div>
            )}
            {hasChanged('description') && (
              <div>
                <p><strong>Old Description:</strong> {oldData.description}</p>
                <p><strong>New Description:</strong> {formData.description}</p>
              </div>
            )}
            {hasChanged('image') && (
              <div>
                <p><strong>Old Image:</strong> {oldData.image}</p>
                <p><strong>New Image:</strong> {formData.image}</p>
              </div>
            )}
            <div className="modal-buttons">
              <button onClick={handleOk} className="save-btn">Save</button>
              <button onClick={handleCancel} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAd;
