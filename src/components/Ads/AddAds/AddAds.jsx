import React, { useState } from 'react';
import AdsServicee from '../../../services/AdsService'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../ErrorModal/ErrorModal'; // Use your error modal component
import axios from 'axios';
import './AddAds.css'; // Add your styling here

const AddAds = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
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
      await AdsServicee.addAd(formData); // Call AdsServicee to handle ad creation
      setFormData({
        title: '',
        description: '',
        image: '',
      });
      navigate('/'); // Navigate to desired page after submission
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

    try {
      const res = await axios.post(`${BASE_URL}/uploadImg`, { image: base64 });
      setUrl(res.data.url);
      setFormData({ ...formData, image: res.data.url });
    } catch (err) {
      if (err.response && err.response.status === 413) {
        setError('The image is too large. Please upload a smaller file.');
      } else {
        setError('Failed to upload image. Please try again.');
      }
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-ad-container">
      <h2>Add New Ad</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ad Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Ad Description"
          required
        ></textarea>
        <input type="file" id="image" name="image" onChange={uploadImage} />
        {loading && <p>Uploading image...</p>}
        {url && <img src={url} alt="Preview" className="image-preview" />}
        <button type="submit" disabled={loading}>
          Add Ad
        </button>
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

export default AddAds;
