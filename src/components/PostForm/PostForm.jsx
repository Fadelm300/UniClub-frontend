import Iframe from 'react-iframe';
import { useState, useMemo, useEffect } from "react";
import { motion } from 'framer-motion';
import "./PostForm.css";
import { useParams } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
import axios from "axios";
import ErrorModal from "../Events/ErrorModal/ErrorModal";
import postService from "../../services/postService";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const BAD_WORDS_API_URL = "https://api.apilayer.com/bad_words";
const API_KEY = import.meta.env.VITE_img_BAD_WORDS_API_key;

const PostForm = ({ handleAddPost }) => {
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    text: "",
    link: "",
    title: "",
    description: "",
    type: "",
    flag: false,
  });
  const [file, setFile] = useState(null);
  const [openPreview, setOpenPreview] = useState(true);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, type: file.type, title: file.name });
    setFile(file);
  };

  const fileDocument = useMemo(() => {
    return file ? window.URL.createObjectURL(file) : "";
  }, [file]);

  const checkForBadWords = async (text) => {
    try {
      const response = await axios.post(
        BAD_WORDS_API_URL,
        { content: text },
        {
          headers: {
            apikey: API_KEY,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error checking for bad words:", err);
      return null;
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    const badWordsResult = await checkForBadWords(formData.text);
    if (badWordsResult?.bad_words_total > 0) {
      setError(
        `Your post contains inappropriate language: "${badWordsResult.censored_content}"`
      );
      setShowErrorModal(true);
      setLoading(false);
      return;
    }
    
    if (file){
    
    const response = await postService.upload()
    const formDataLink = { ...formData, link: response.publicUrl };
    const { url: uploadUrl } = response;
    

    const r2 = await fetch(uploadUrl, { 
      method: 'PUT',
      body: file,
     });
     if(formData.type.includes('image')){
      const TorF= await postService.checkImg(response.publicUrl);
      if (TorF){
        formDataLink.flag=true;
        setLoading(false);
        setError("Your post has been flagged for inappropriate content and is under review.");
        setShowErrorModal(true);
        handleAddPost(formDataLink, path);
        return;
      }
    }
      handleAddPost(formDataLink, path);
      setError(null);
      setLoading(false);

    }else{
      handleAddPost(formData, path);
      setError(null);
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="Postmain">
        <motion.form
          onSubmit={handleSubmit}
          className="postform"
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="postContener">
            <label>Add text for post</label>
            <input
              name="text"
              type="text"
              className="addpost"
              onChange={handleChange}
              required
              placeholder="What's on your mind?"
            />

            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
            />

            {file && (
              <button
                type="button"
                onClick={() => setOpenPreview(!openPreview)}
                className="preview-button"
              >
                {openPreview ? "Hide" : "Show"} Preview
              </button>
            )}

            {file && openPreview && (
              <div className="file-preview">
                <div className="file-preview-info">
                  <label htmlFor="">Title</label>
                  <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="File Title"
                  />
                  <label htmlFor="">description</label>
                  <input
                    id="description"
                    name="description"
                    onChange={handleChange}
                    placeholder="File Description"
                  />
                </div>
                {file.type === "application/pdf" ? (
                  <iframe
                    src={fileDocument}
                    width="100%"
                    height="100%"
                    className="file-preview-iframe"
                  />
                ) : (
                  <img
                    src={fileDocument}
                    alt="File to upload"
                    className="file-preview-image"
                  />
                )}
              </div>
            )}

            {loading && (
              <div className="loading-container">
                <video
                  className="loading-animation"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="../../../public/img/loading2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          <motion.button
            type="submit"
            className="submitpost"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
           <img
              src="https://img.icons8.com/?size=70&id=24717&format=png&color=000000"
              alt="submit"
              className="submit-icon"
            />

          </motion.button>
        </motion.form>

        <ErrorModal
          show={showErrorModal}
          message={error}
          onClose={() => setShowErrorModal(false)}
        />
      </div>
    </main>
  );
};

export default PostForm;
