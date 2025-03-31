import { useState } from 'react';
import './ChannelForm.css';
import { useParams, Link } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";
import postService from "../../services/postService";

const ChannelForm = ({handleAddchannel}) => {
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });
  const [formData, setFormData] = useState({
   
    name: '',
    description:'',
    picture:''
   
  });
  const [file, setFile] = useState(null);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (file){
              
      const response = await postService.upload('')
      const formDataLink = { ...formData, picture: response.publicUrl };
      const { url: uploadUrl } = response;
      

      const r2 = await fetch(uploadUrl, { 
        method: 'PUT',
        body: file,
      });
      handleAddchannel(formDataLink,path);
    }else{
    handleAddchannel(formData,path);
    }
  };

  const handleFileChange = async (event) => {
    const filefile = event.target.files[0];
    setFile(filefile);
    console.log(file);
    
  };

  return (
    <main>
        <div className="channelmain">
      <form onSubmit={handleSubmit} className='ChannelForm'>
            <div className="channelContener">


            <label htmlFor="">name</label>
            <input name='name' type="text"  className='addchannel' onChange={handleChange}/>
            <label htmlFor="">description</label>
            <input name='description' type="text"  className='addchannel' onChange={handleChange}/>
            <input type="file" name="file" id="file" className="inputfile" onChange={handleFileChange} accept='image/*'/>
            </div>
        

        
        <button type="submitchannel"><img  src="https://img.icons8.com/?size=50&id=24717&format=png&color=000000" alt="submitlogo" /></button>
      </form>
      </div>
    </main>
  );
};

export default ChannelForm;