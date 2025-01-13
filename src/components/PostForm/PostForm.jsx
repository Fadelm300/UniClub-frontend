import { useState } from "react";
import "./PostForm.css";
import { useParams } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
import axios from "axios";
import ErrorModal from "../Events/ErrorModal/ErrorModal";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const PostForm = ({ handleAddPost }) => {
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    text: "",
    image: "",
    file: "",
  });
  const [preview, setPreview] = useState(null);

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

  const uploadFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError("");
    setLoading(true);

    try {
      const base64 = await convertBase64(file);
      setPreview(file.type.startsWith("image/") ? base64 : file); // Show preview for images or set file object for non-images
      const res = await axios.post(`${BASE_URL}/uploadFile`, {
        file: base64,
        fileName: file.name,
      });
      if (file.type.startsWith("image/")) {
        setFormData({ ...formData, image: res.data.url });
      } else {
        setFormData({ ...formData, file: res.data.url });
      }
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 413) {
        setError("The file is too large. Please upload a smaller file.");
      }
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="Postmain">
        <form onSubmit={handleSubmit} className="postform">
          <div className="postContener">
            <label htmlFor="text">Add text for post</label>
            <input
              name="text"
              type="text"
              className="addpost"
              onChange={handleChange}
              required
            />
            <input
              type="file"
              id="file"
              name="file"
              onChange={uploadFile}
              accept="image/*,application/pdf"
            />

            {preview && (
              <div className="file-preview" style={{ textAlign: "center", margin: "20px 0" }}>
                {typeof preview === "string" ? (
                  // Show preview for images
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      maxWidth: "50%",
                      height: "auto",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  // Show preview for non-images (e.g., PDFs)
                  <a
                    href={formData.file.replace("/upload/", "/upload/f_auto,q_auto/")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={formData.file.replace("/upload/", "/upload/f_auto,q_auto,w_200/")}
                      alt="File Preview"
                      style={{
                        width: "150px",
                        height: "200px",
                        objectFit: "cover",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    />
                    <p style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
                      Click to view the full file
                    </p>
                  </a>
                )}
              </div>
            )}
            {loading && <p>Uploading file...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <button type="submit" className="submitpost">
            Submit Post
          </button>
        </form>
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
