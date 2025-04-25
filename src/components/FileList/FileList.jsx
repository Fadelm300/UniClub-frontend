import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalDelet from './ModalDelet'; 
import './FileList.css';

const FileList = (props) => {
  const [showModalDelet, setShowModalDelet] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [filesinside, setFilesinside] = useState(props.files);
  console.log(props.user)
  const handleDeleteConfirmation = (fileId) => {
    setFileToDelete(fileId);
    setShowModalDelet(true);
  };

  const handleConfirmDelete = () => {
    props.handleDeleteFile(fileToDelete, props.path);
    setFilesinside((prevFiles) => prevFiles.filter(file => file._id !== fileToDelete));
    setShowModalDelet(false); 
  };
  

  const handleCancelDelete = () => {
    setShowModalDelet(false);
    setFileToDelete(null);
  };

  const filterFiles = (type) => {
    switch (type) {
      case "files":
        setFilesinside(props.files.filter(file => file.type?.includes("application")));
        break;
      case "media":
        setFilesinside(props.files.filter(file => file.type?.includes("image") || file.type?.includes("video")));
        break;
      case "links":
        setFilesinside(props.files.filter(file => file.type?.includes("link")));
        break;
      default:
        setFilesinside(props.files);
    }
  };
  

  if (!props.files || props.files.length === 0) return <main>No files yet</main>;

  return (
    <>
      <div className="filter-buttons">
          <button className="btn-filter" onClick={() => filterFiles("files")}>Files</button>
          <button className="btn-filter" onClick={() => filterFiles("media")}>Media</button>
          <button className="btn-filter" onClick={() => filterFiles("links")}>Links</button>
          <button className="btn-filter" onClick={() => filterFiles("all")}>All</button>
       </div>
      <div className="FileContanir">
      
        <div className="cardsWrapper">
        

          {filesinside.map((file, idx) => {
            return (
              <div key={idx} className="card2">
              <div className="topCard2">
                <div className='username'> 
                  <div className="fileimg">
                    <img src={file.user.image} alt="" />
                  </div>
                  <span className='usernametxt'>{file.user.username}</span>
                </div>
                {(props.user.admin|| props.user.id == file.user._id) && (
                <div className='deleteandEdit'>
                  <Link to={`${props.path}/editfile`}>
                    <button className="iconButton">
                      <img 
                        src="https://img.icons8.com/?size=40&id=XPJ22YD4LrLc&format=png&color=000000" 
                        alt="Edit file" 
                        className="buttonIcon" 
                      />
                    </button>
                  </Link>
                  <button
                    className="iconButton"
                    onClick={() => handleDeleteConfirmation(file._id)}
                  >
                    <img 
                      src="/trash.png" 
                      alt="Delete file" 
                      className="buttonIcon" 
                    />
                  </button>   
                </div>
                )}
              </div>
                

              <div className='fileTitle2'>                
                <span className='TitleforFile'>Title :</span>   
                <span className="fileTitle2">{file.title}</span>
              </div>

              <Link to={`${props.path}/file/${file._id}`}>
                <div className="dawnCard2">
                  <img src="/pdf.png" alt="pdf.png" className='PDFPng' />
                </div>
              </Link>
            </div>
            );
          })}
        </div>

        {showModalDelet && (
          <ModalDelet
            message="Do you really want to delete this file?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}

        <div className="radomFiles">
          <div className="randomcards"><h1>111</h1></div>
          <div className="randomcards"><h1>111</h1></div>
          <div className="randomcards"><h1>111</h1></div>
          <div className="randomcards"><h1>111</h1></div>
        </div>
      </div>
    </>
  );
};

export default FileList;
