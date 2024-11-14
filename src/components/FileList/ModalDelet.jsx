import './ModalDelet.css';

const ModalDelet = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>Are you sure?</h2>
        <p>{message}</p>
        <div className="modalActions">
          <button className="confirmButton" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="cancelButton" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelet;
