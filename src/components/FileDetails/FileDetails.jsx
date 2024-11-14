import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './FileDetails.css';

import FileService from "../../services/FileService";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";

const FileDetails = ({ user }) => {
  const { fileid, uni, college, major, course, event } = useParams();
  const [file, setFile] = useState(null);
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

  if (!file) {
    return (
      <main>
        <h3>404 - File Not Found</h3>
      </main>
    );
  }

  return (
    <div className="topCard3">
      <p>Uploaded by: {file.user.username}</p>
      <h1>{file.title}</h1>
      <a href={file.link} target="_blank" rel="noopener noreferrer">
        View File
      </a>
      <p>{file.description}</p>

      {user?.id === file.user._id.toString() && (
        <button onClick={handleDeleteFile}>Delete</button>
      )}
    </div>
  );
};

export default FileDetails;