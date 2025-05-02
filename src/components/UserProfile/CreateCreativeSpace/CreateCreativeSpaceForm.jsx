import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import creativeSpaceServices from '../../../services/creativeSpaceServices';
import postService from '../../../services/postService';
import './CreateCreativeSpaceForm.css';

const CreateCreativeSpaceForm = ({ user }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    link: ''
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      console.error("User not found, cannot submit form!");
      setError('You must be logged in to create a space.');
      return;
    }

    try {
      let imageUrl = '';
      if (file) {
        const response = await postService.upload();
        const uploadUrl = response.url;
        imageUrl = response.publicUrl;

        await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
        });
      }

      const newCreativeSpace = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        userId: user.id,
        image: imageUrl,
        link: formData.link
      };

      await creativeSpaceServices.addCreativeSpace(newCreativeSpace);
      // console.log("Creative space added successfully");
      navigate('/');
    } catch (error) {
      console.error("Error adding creative space:", error);
      setError('An error occurred while creating the Creative Space.');
    }
  };

  return (
    <div className="create-space-container">
      <h2 className="create-space-title">Create Creative Space</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="create-space-form">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-input"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-input"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <input
            type="text"
            name="category"
            className="form-input"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">External Link (optional)</label>
          <input
            type="text"
            name="link"
            className="form-input"
            value={formData.link}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="submit-button"
        >
          {loading ? 'Submitting...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreateCreativeSpaceForm;
