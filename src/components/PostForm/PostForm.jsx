import { useState } from 'react';
import './PostForm.css';
import { useParams, Link } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";

const PostForm = ({handleAddPost}) => {
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });
  const [formData, setFormData] = useState({
   
    text: ''
   
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddPost(formData,path);
  };

  return (
    <main>
        <div className="Postmain">
      <form onSubmit={handleSubmit} className='postform'>
            <div className="postContener">


            <label htmlFor="">Add text for post </label>
            <input name='text' type="text"  className='addpost' onChange={handleChange}/>


            </div>
        

        
        <button type="submitpost" className='submitpost'><img  src="https://img.icons8.com/?size=70&id=24717&format=png&color=000000" alt="submitlogo" /></button>
      </form>
      </div>
    </main>
  );
};

export default PostForm;