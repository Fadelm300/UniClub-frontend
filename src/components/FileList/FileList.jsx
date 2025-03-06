import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalDelet from './ModalDelet'; 
import './FileList.css';

const FileList = (props) => {
  const [showModalDelet, setShowModalDelet] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  const handleDeleteConfirmation = (fileId) => {
    setFileToDelete(fileId);
    setShowModalDelet(true);
  };

  const handleConfirmDelete = () => {
    props.handleDeleteFile(fileToDelete, props.path);
    setShowModalDelet(false); 
    window.location.reload();
  };

  const handleCancelDelete = () => {
    setShowModalDelet(false);
    setFileToDelete(null);
  };

  if (!props.files || props.files.length === 0) return <main>No files yet</main>;

  return (
    <>
      <div className="FileContanir">
        <div className="cardsWrapper">
          {props.files.map((file, idx) => {
            return (
              <div key={idx} className="card2">
              
                  <div className="topCard2">

                        <div className='username'> 
                        <div className="fileimg"><img src={file.user.image} alt="" /></div>
                            <text className='usernametxt'>{file.user.username}</text>
                            </div>
                           
                        <div className='deleteandEdit'>

                              

                          <Link to={`${props.path}/newfile`}>
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
                        
                  </div>
                  <div className='fileTitle2'>                
                           <text className='TitleforFile'>Title :</text>   <text className="fileTitle2">{file.title}</text>
                        </div>
                

        <Link to={`${props.path}/file/${file._id}`}>
                   <div className="dawnCard2">
                    {/* <h6 className="fileTitle2">{file.title}</h6> */}
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
