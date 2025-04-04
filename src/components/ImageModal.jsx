// components/ImageModal.js
import React from 'react';

const ImageModal = ({ imageUrl, onClose, questionDetails }) => {
  return (
    <div className="fixed inset-0 bg-gray-300/30 backdrop-blur-sm bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-amber-50 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header with title and close button */}
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl flex-1/2 text-center font-bold">
            {questionDetails.courseCode} - {questionDetails.courseTitle} ({questionDetails.year})
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Image content */}
        <div className="p-4">
          <img 
            src={imageUrl} 
            alt={`${questionDetails.courseCode} past question`}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>

        {/* Footer with close button
        <div className="p-4 border-t text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ImageModal;