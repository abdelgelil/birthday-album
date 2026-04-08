import React from 'react';

const Modal = ({ isOpen, image, title, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Corrected the closing tag from </div> to </button> */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        
        <img src={image} alt={title} className="modal-image" />
        
        <div className="modal-caption">
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Modal;