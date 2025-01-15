import { useState } from "react";
import channelService from "../../services/channelService";

const AddChannelForm = ({ onChannelAdded, closeModal, path }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });
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
      const newChannel = await channelService.create(formData, path || ""); 
      setMessage(`Channel '${newChannel.name}' created successfully!`);
   
      if (onChannelAdded) onChannelAdded();

      
      if (closeModal) closeModal();

      setFormData({ name: "", description: "" });
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to create channel.");
    } finally {
      setLoading(false); 
    }
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
