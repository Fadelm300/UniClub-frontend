import { useParams ,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import './FileDetails.css';
// Services
import FileService from "../../services/FileService";
import commentService from "../../services/commentService";

// Router
import { Link } from 'react-router-dom';


// Components

//func 
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";

const FileDetails = ({user}) => {
  const { fileid } = useParams();
  const [file, setFile] = useState(null);
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });
  const navigate = useNavigate();


  useEffect(()=>{
    async function getFile(){
      const fileData = await FileService.show(path , fileid)
      setFile(fileData)
    }
    getFile()
  },[fileid])

  const handleDeleteFile = async (fileId) => {
    await FileService.delete(fileId , path);
    navigate(path);    
  };

  if(!file){
    return <main><h3>404...</h3></main>
  }
  return (
<div className="topCard2">
              <p className="">{file.user.username}</p>
              <h1 className="">{file.title}</h1>
              <a className="" href={file.link}>{file.link}</a>
              <p className="">{file.description}</p>
              <p className="">
              </p>
              {user?.id == file.user._id&&(
              <button onClick={()=>handleDeleteFile(file._id)}>delete</button>
            )}
            </div>
  );
};

export default FileDetails;