import { useState } from 'react';
import './PostForm.css';
import { useParams } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const PostForm = ({ handleAddPost }) => {
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });
  
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [formData, setFormData] = useState({
    text: '',
    image: ''
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddPost(formData, path); 
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

    setError(""); 
    setLoading(true); 

    try {
      const base64 = await convertBase64(files); 
      const res = await axios.post(`${BASE_URL}/upload`, { image: base64 }); 
      setFormData({ ...formData, image: res.data.url }); 
      setError(""); // Clear any errors
    } catch (err) {
      if (err.response && err.response.status === 413) {
        setError("The image is too large. Please upload a smaller file."); 
      } else {
        setError("An error occurred during the upload. Please try again."); 
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <main>
      <div className="Postmain">
        <form onSubmit={handleSubmit} className='postform'>
          <div className="postContener">
            <label htmlFor="">Add text for post</label>
            <input 
              name='text' 
              type="text"  
              className='addpost' 
              onChange={handleChange} 
              required // Make text field required
            />
      <input
                id="image" 
                name="image" 
          onChange={handleChange}
          placeholder="URL"
          
        />

            <input 
              type="file" 
              id="image" 
              name="image" 
              accept="image/*" 
              onChange={uploadImage} 
            />
            
            {loading && <p>Uploading image...</p>} 
            {error && <p style={{ color: 'red' }}>{error}</p>} 
          </div>
          <button type="submit" className='submitpost'> 
            <img src="https://img.icons8.com/?size=70&id=24717&format=png&color=000000" alt="submit logo" />
          </button>
        </form>
      </div>
    </main>
  );
};

export default PostForm;
