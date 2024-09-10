import { useState } from 'react';
import './PostForm.css';
import { useParams, Link } from "react-router-dom";
import { deriveChannelPath } from "../../utils/helpers/urlHelpers";

const PostForm = ({handleAddPost}) => {
  const { uni, college, major, course, event } = useParams();
  const path = deriveChannelPath({ uni, college, major, course, event });
console.log(path)
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
        <dev className="Postmain">
      <form onSubmit={handleSubmit} className='postform'>
            <dev className="postContener">


            <label htmlFor="">text</label>
            <input name='text' type="text"  className='addpost' onChange={handleChange}/>


            </dev>
        

        
        <button type="submitPost">SUBMIT</button>
      </form>
      </dev>
    </main>
  );
};

export default PostForm;