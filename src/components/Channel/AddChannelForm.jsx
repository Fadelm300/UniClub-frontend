import { useState } from "react";
import channelService from "../../services/channelService";
import postService from "../../services/postService";

const AddChannelForm = ({ onChannelAdded, closeModal, path }) => {
  const [formData, setFormData] = useState({ name: "", description: ""  , picture: ""});
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setMessage(""); 
    try {
      if (file){
          
          const response = await postService.upload('')
          const formDataLink = { ...formData, picture: response.publicUrl };
          const { url: uploadUrl } = response;
          
      
          const r2 = await fetch(uploadUrl, { 
            method: 'PUT',
            body: file,
           });
           const newChannel = await channelService.create(formDataLink, path || ""); 
           setMessage(`Channel '${newChannel.name}' created successfully!`);
   
            if (onChannelAdded) onChannelAdded();           
            if (closeModal) closeModal();
            setFormData({ name: "", description: "" });
          }else{
            const newChannel = await channelService.create(formData, path || ""); 
            setMessage(`Channel '${newChannel.name}' created successfully!`);
   
            if (onChannelAdded) onChannelAdded();
            if (closeModal) closeModal();
            setFormData({ name: "", description: "" });
          }
      
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to create channel.");
    } finally {
      setLoading(false); 
    }
  };

  const handleFileChange = async (event) => {
    const filefile = event.target.files[0];
    setFile(filefile);
    console.log(file);
    
  };

  return (
    <div>
      <h2>Add New Channel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Channel Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e)}
            accept="image/*"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Channel"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddChannelForm;
