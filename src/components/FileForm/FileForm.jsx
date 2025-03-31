import { useState } from 'react';
import './FileForm.css';
import { useParams, Link } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
import postService from '../../services/postService';

const FileForm = ({handleAddFile}) => {
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });
  const [formData, setFormData] = useState({
    title :'',
    description:'', 
    link: '',
   
  });
  const [file, setFile] = useState(null);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleFileChange = async (event) => {
    const filefile = event.target.files[0];
    setFile(filefile);
    setFormData({ ...formData, type: file.type, title : file.name });
  };

  const handleSubmit =  async(evt) => {
    evt.preventDefault();
    if (file){
        
      const response = await postService.upload()
      const formDataLink = { ...formData, link: response.publicUrl };
      const { url: uploadUrl } = response;

      const r2 = await fetch(uploadUrl, { 
        method: 'PUT',
        body: file,
      });

      handleAddFile(formDataLink, path);
    }else{
      handleAddFile(formData, path);
    }
  };

  const [showLinkInput, setShowLinkInput] = useState(true);

  const toggleInputType = () => {
    setShowLinkInput(!showLinkInput);
    setFormData({ ...formData, link: '', file: null }); // Reset the other field when toggling
  };

  return (
    <main>
      <div className="Filemain">
        <form onSubmit={handleSubmit} className='Fileform'>
          <div className="FileContener">
            <label htmlFor="title">Title</label>
            <input name='title' type="text" className='addFile' onChange={handleChange} value={formData.title} />

            <label htmlFor="description">Description</label>
            <input name='description' type="text" className='addFile' onChange={handleChange} value={formData.description} />

            <button type="button" onClick={toggleInputType} className="toggleButton">
              {showLinkInput ? "Switch to File" : "Switch to Link"}
            </button>

            {showLinkInput ? (
              <>
                <label htmlFor="link">Link</label>
                <input name='link' type="text" className='addFile' onChange={handleChange} />
              </>
            ) : (
              <>
                <label htmlFor="file">File</label>
                <input type="file" id="file" name="file" onChange={handleFileChange} />
              </>
            )}
          </div>

          <button type="submit" className="submitFileButton">
            <img src="https://img.icons8.com/?size=50&id=24717&format=png&color=000000" alt="submit logo" />
          </button>
        </form>
      </div>
    </main>
  );
};

export default FileForm;