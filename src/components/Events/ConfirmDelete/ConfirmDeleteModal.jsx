// ConfirmDeleteModal.js
import React from 'react';
import './ConfirmDeleteModal.css'; 

const ConfirmDeleteModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this event?</p>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>Yes, Delete</button>
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
