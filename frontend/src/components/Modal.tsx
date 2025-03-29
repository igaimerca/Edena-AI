import { XIcon } from 'lucide-react';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 
                 bg-black bg-opacity-70 backdrop-blur-sm"
    >
      <div className="absolute inset-0" onClick={onClose}></div>

      <div 
        className="relative bg-transparent rounded-lg shadow-xl p-6 w-full max-w-md 
           mx-auto z-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white text-gray-600 hover:text-gray-900 
           rounded-full w-8 h-8 flex items-center justify-center shadow-md 
           hover:shadow-lg transition-shadow"
        >
         <XIcon />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
