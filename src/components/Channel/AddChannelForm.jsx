import { useState } from "react";
import { motion } from "framer-motion";
import channelService from "../../services/channelService";
import postService from "../../services/postService";
import "./AddChannelForm.css";

const AddChannelForm = ({ onChannelAdded, closeModal, path }) => {
  const [formData, setFormData] = useState({ name: "", titel: "", description: "", picture: "" });
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
      if (file) {
        const response = await postService.upload('');
        const formDataLink = { ...formData, picture: response.publicUrl };
        const { url: uploadUrl } = response;
        await fetch(uploadUrl, { method: 'PUT', body: file });
        const newChannel = await channelService.create(formDataLink, path || "");
        setMessage(`Channel '${newChannel.name}' created successfully!`);
        onChannelAdded?.();
  
        setTimeout(() => {
          closeModal?.();
          setMessage("");
        }, 2000);
  
        setFormData({ name: "", titel: "", description: "", picture: "" });
      } else {
        const newChannel = await channelService.create(formData, path || "");
        setMessage(`Channel '${newChannel.name}' created successfully!`);
        onChannelAdded?.();
        setTimeout(() => {
          closeModal?.();
          setMessage("");
        }, 2000);
  
        setFormData({ name: "", titel: "", description: "", picture: "" });
      }
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to create channel.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  return (
    <motion.div
      className="add-channel-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Add New Channel</h2>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <label>Channel Title:</label>
          <motion.input
            type="text"
            name="titel"
            value={formData.titel}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <div>
          <label>Channel Name:</label>
          <motion.input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <div>
          <label>Description:</label>
          <motion.textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <div>
          <label>Channel Picture:</label>
          <motion.input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            whileHover={{ scale: 1.01 }}
          />
        </div>
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? "Creating..." : "Create Channel"}
        </motion.button>
      </motion.form>
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
};

export default AddChannelForm;
