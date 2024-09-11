import { useState } from 'react';
import './FileForm.css';
import { useParams, Link } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";

const FileForm = ({handleAddFile}) => {
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });
  const [formData, setFormData] = useState({
    title :'',
    description:'', 
    link: '',
   
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddFile(formData,path);
  };

  return (
    <main>
        <div className="Filemain">
      <form onSubmit={handleSubmit} className='Fileform'>
            <div className="FileContener">


            <label htmlFor="">title</label>
            <input name='title' type="text"  className='addFile' onChange={handleChange}/>
            <label htmlFor="">description</label>
            <input name='description' type="text"  className='addFile' onChange={handleChange}/>
            <label htmlFor="">link</label>
            <input name='link' type="text"  className='addFile' onChange={handleChange}/>


            </div>
        

        
        <button type="submitFile"><img  src="https://img.icons8.com/?size=50&id=24717&format=png&color=000000" alt="submitlogo" /></button>
      </form>
      </div>
    </main>
  );
};

export default FileForm;