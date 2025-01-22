// import { useState } from "react";
// import "./PostForm.css";
// import { useParams } from "react-router-dom";
// import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
// import axios from "axios";
// import ErrorModal from "../Events/ErrorModal/ErrorModal";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// const PostForm = ({ handleAddPost }) => {
//   const { uni, college, major, course, event } = useParams();
//   const path = deriveChannelPath({ uni, college, major, course, event });
//   const [showErrorModal, setShowErrorModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     text: "",
//     image: "",
//   });
//   const [preview, setPreview] = useState(null);

//   const handleChange = (evt) => {
//     setFormData({ ...formData, [evt.target.name]: evt.target.value });
//   };

//   const handleSubmit = (evt) => {
//     evt.preventDefault();
//     handleAddPost(formData, path);
//   };

//   const convertBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);

//       fileReader.onload = () => {
//         resolve(fileReader.result);
//       };

//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   };

//   const uploadImage = async (event) => {
//     const files = event.target.files[0];
//     if (!files) return;

//     setError("");
//     setLoading(true);

//     try {
//       const base64 = await convertBase64(files);
//       setPreview(base64); // Set the image preview
//       const res = await axios.post(`${BASE_URL}/uploadImg`, { image: base64 });
//       setFormData({ ...formData, image: res.data.url });
//       setError("");
//     } catch (err) {
//       if (err.response && err.response.status === 413) {
//         setError("The image is too large. Please upload a smaller file.");
//       }
//       setShowErrorModal(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main>
//       <div className="Postmain">
//         <form onSubmit={handleSubmit} className="postform">
//           <div className="postContener">
//             <label htmlFor="">Add text for post</label>
//             <input
//               name="text"
//               type="text"
//               className="addpost"
//               onChange={handleChange}
//               required
//             />
//             <input
//               id="image"
//               name="image"
//               onChange={handleChange}
//               placeholder="URL"
//             />
//             <input
//               type="file"
//               id="image"
//               name="image"
//               accept="image/*"
//               onChange={uploadImage}
//             />

//             {preview && (
//               <img
//                 src={preview}
//                 alt="Image Preview"
//                 style={{ maxWidth: "50%", height: "auto" }}
//               />
//             )}
//             {loading && <p>Uploading image...</p>}
//             {error && <p style={{ color: "red" }}>{error}</p>}
//           </div>
//           <button type="submit" className="submitpost">
//             <img
//               src="https://img.icons8.com/?size=70&id=24717&format=png&color=000000"
//               alt="submit logo"
//             />
//           </button>
//         </form>
//         <ErrorModal
//           show={showErrorModal}
//           message={error}
//           onClose={() => setShowErrorModal(false)}
//         />
//       </div>
//     </main>
//   );
// };

// export default PostForm;


















import { useState } from "react";
import "./PostForm.css";
import { useParams } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
import axios from "axios";
import ErrorModal from "../Events/ErrorModal/ErrorModal";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const BAD_WORDS_API_URL = "https://api.apilayer.com/bad_words"; // Bad Words API endpoint
const API_KEY = "j6Nztvto2ujilpZ5GrcFV7RXIyUU4Ll5"; // Your API key

const PostForm = ({ handleAddPost }) => {
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    text: "",
    image: "",
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormData({ ...formData, [name]: value });
  };

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

    setError(null);
    setLoading(false);
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
      setPreview(base64); // Set the image preview
      const res = await axios.post(`${BASE_URL}/uploadImg`, { image: base64 });
      setFormData({ ...formData, image: res.data.url });
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 413) {
        setError("The image is too large. Please upload a smaller file.");
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
            <label htmlFor="">Add text for post</label>
            <input
              name="text"
              type="text"
              className="addpost"
              onChange={handleChange}
              required
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

            {preview && (
              <img
                src={preview}
                alt="Image Preview"
                style={{ maxWidth: "50%", height: "auto" }}
              />
            )}
            {loading && <p>Uploading image...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <button type="submit" className="submitpost" disabled={loading}>
            <img
              src="https://img.icons8.com/?size=70&id=24717&format=png&color=000000"
              alt="submit logo"
            />
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
