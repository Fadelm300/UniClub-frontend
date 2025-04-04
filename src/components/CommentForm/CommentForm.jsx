
import { useState, useEffect } from 'react';
import './CommentForm.css'
import commentService from '../../services/commentService';
import postService from '../../services/postService';
const CommentForm = ({user,handleAddComment}) => {
  const [formData, setFormData] = useState({ 
    text: '',
    type: '',
    title: '',
    link: "",
    description: "",
  });
  const [file, setFile] = useState(null);


  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, type: file.type, title : file.name });
    setFile(file);
    
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (file){
      const response = await postService.upload('/path')
      const formDataLink = { ...formData, link: response.publicUrl };
      const { url: uploadUrl } = response;
      
  
      const r2 = await fetch(uploadUrl, { 
        method: 'PUT',
        body: file,
        });
        console.log(formDataLink);
        handleAddComment(formDataLink);

      }else{
        handleAddComment(formData);
      }
    setFormData({ text: '', type: '', title: '' });

  };

  return (
    <form onSubmit={handleSubmit} className='m22'>
      <label htmlFor="text-input">add reply:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
        className='replaycom'
      />
      <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
      />
      
      <button type="submit" className='comsubmit'><img  src="https://img.icons8.com/?size=50&id=24717&format=png&color=000000" alt="submitlogo" /></button>
    </form>
  );
};

export default CommentForm;