import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const ClientCard = ({ imageUrl, companyName, companyLink }) => {
  return (
    <div className="max-w-xs bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="p-5 flex flex-col items-center">
        {/* Company Logo */}
        <div className="mb-4 w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={companyName} 
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.parentNode.classList.remove('border-dashed');
                e.target.parentNode.classList.add('border-transparent');
              }}
            />
          ) : (
            <div className="text-gray-400 text-4xl font-bold">
              {companyName.charAt(0)}
            </div>
          )}
        </div>
        
        {/* Company Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
          {companyName}
        </h3>
        
        {/* Visit Link */}
        <a 
          href={companyLink} 
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          <span>Visit Website</span>
          <FaExternalLinkAlt className="ml-2 text-sm" />
        </a>
      </div>
    </div>
  );
};

export default ClientCard;