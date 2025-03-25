"use client";

import React, { useEffect } from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Add ESC key listener
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      // Restore scrolling when modal is closed
      document.body.style.overflow = 'unset';
      
      // Remove ESC key listener
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-lg max-w-lg w-full mx-auto shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default Modal; 