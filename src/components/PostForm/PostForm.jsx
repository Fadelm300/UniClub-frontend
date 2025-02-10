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
















import Iframe from 'react-iframe'
import { useState } from "react";
import { useMemo } from "react";



import "./PostForm.css";
import { useParams } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
import axios from "axios";
import ErrorModal from "../Events/ErrorModal/ErrorModal";
import postService from "../../services/postService"




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
    link: "",
  });
  const [file, setFile] = useState(null);
  const [openPreview, setOpenPreview] = useState(true);
  

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    console.log('r1');
    setFormData({ ...formData, [name]: value });
  };

  

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
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
    
    const response = await postService.upload(path)
    const formDataLink = { ...formData, link: response.publicUrl };
    const { url: uploadUrl } = response;
    

    const r2 = await fetch(uploadUrl, { 
      method: 'PUT',
      body: file,
     });

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
            {(file&&openPreview)  && (
              <div className="file-preview">
                    {file.type === "application/pdf" ? (
                      <iframe
                        src={fileDocument}
                        width="100%"
                        height="100%"
                        className="file-preview-iframe"
                        display="initial"
                        position="relative"
                      />
                    ):(
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
