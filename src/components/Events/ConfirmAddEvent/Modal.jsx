import React from 'react';
import './Modal.css';

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          {onConfirm && <button onClick={onConfirm}>Confirm</button>}
          {onCancel && <button onClick={onCancel}>Cancel</button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
