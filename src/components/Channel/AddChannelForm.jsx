import { useState } from "react";
import channelService from "../../services/channelService";

const AddChannelForm = ({ onChannelAdded, closeModal }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newChannel = await channelService.create(formData);  // Assuming create method handles channel creation
      setMessage(`Channel '${newChannel.name}' created successfully!`);
      
      // Trigger the callback to refresh the channels list
      if (onChannelAdded) onChannelAdded();

      // Close the modal after successful channel creation
      if (closeModal) closeModal();

    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to create channel.");
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
        <button type="submit">Create Channel</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddChannelForm;
