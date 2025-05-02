import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./FileDetails.css";

import FileService from "../../services/FileService";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";

const FileDetails = ({ user }) => {
  const { fileid, uni, college, major, course, event } = useParams();
  const [file, setFile] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const path = deriveChannelPath({ uni, college, major, course, event });
  const navigate = useNavigate();

  useEffect(() => {
    async function getFile() {
      try {
        const fileData = await FileService.show(path, fileid);
        setFile(fileData);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    }
    getFile();
  }, [fileid, path]);

  const handleDeleteFile = async () => {
    try {
      await FileService.delete(fileid, path);
      navigate(path);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleShare = () => {
    const fileLink = `${window.location.origin}${path}/file/${fileid}`;
    navigator.clipboard.writeText(fileLink)
      .then(() => {
        setShowPopUp(true);
        setTimeout(() => setShowPopUp(false), 3000);
      })
      .catch((error) => {
        console.error("Failed to copy the link:", error);
      });
  };

  // Handle file download
  const handleDownload = (url, filename) => {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename || "download";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(err => console.error("Download failed:", err));
  };

  if (!file) {
    return (
      <main className="file-container">
        <h3>404 - File Not Found</h3>
      </main>
    );
  }

  return (
    <motion.div
      className="file-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="file-title">{file.title}</h1>

      <Link to={file.user._id === user?.id ? `/profile/${file.user._id}` : `/userlist/${file.user._id}`}>
        <p className="uploader">Uploaded by: {file.user.username}</p>
      </Link>

      <div className="file-container-img">
        <motion.div
          className="file-viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {file.type.startsWith("image/") ? (
            <img
              src={file.link}
              alt="Uploaded file"
              className="file-img"
            />
          ) : (
            <iframe
              src={file.link}
              title="file"
              frameBorder="0"
              className="file-iframe"
            ></iframe>
          )}
        </motion.div>
      </div>
      {!file.type.startsWith("image/") && (
          <motion.button
            className="download-btn-file"
            onClick={() => handleDownload(file.link, file.title)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download
          </motion.button>
        )}

      <div className="description-box-file">
        <h2 className="description-title-file">Description</h2>
        <p className="description-file">{file.description}</p>
      </div>

      <div className="action-buttons-file">
        {user?.id === file.user._id.toString() && (
          <motion.button
            className="delete-btn-file"
            onClick={handleDeleteFile}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Delete File
          </motion.button>
        )}

        <motion.button
          className="share-btn-file"
          onClick={handleShare}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Share
        </motion.button>

        
      </div>

      {showPopUp && (
        <div className="file-share-popup">
          🔗 Link copied to clipboard!
        </div>
      )}
    </motion.div>
  );
};

export default FileDetails;
