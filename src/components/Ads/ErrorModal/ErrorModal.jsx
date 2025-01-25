// ErrorModal.jsx
import React from 'react';
import './ErrorModal.css';

const ErrorModal = ({ show, message, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorModal;



// Import the ErrorModal component  
//import ErrorModal from '../ErrorModal/ErrorModal';
//

//State to control modal
// const [showErrorModal, setShowErrorModal] = useState(false);

// Show modal on error
// setShowErrorModal(true); 


{/* Error Modal */}
{/* <ErrorModal */}
// show={showErrorModal}
// message={error}
// onClose={() => setShowErrorModal(false)}
// />