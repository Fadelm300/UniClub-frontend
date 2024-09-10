import { useState } from 'react';
import './ChannelForm.css';
import { useParams, Link } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";


const ChannelForm = ({handleAddchannel}) => {
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });
console.log(path)
  const [formData, setFormData] = useState({
   
    name: '',
    description:''
   
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddchannel(formData,path);
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

            </div>
        

        
        <button type="submitchannel">SUBMIT</button>
      </form>
      </div>
    </main>
  );
};

export default ChannelForm;