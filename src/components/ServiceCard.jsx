import React from 'react';

const ServiceCard = ({ imageUrl, title, description, buttonText='Explore',   onButtonClick }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl font-inter">
      {/* Image Section */}
      <div className="relative h-48 sm:h-56">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={imageUrl}
          alt={title}
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/CCCCCC/000000?text=Image+Error`; }}
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-blue-700 mb-3 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-700 text-base mb-6 leading-relaxed">
          {description}
        </p>

        {/* Button */}
      <button onClick={onButtonClick}>
          <a
          
          className="inline-block border-2 border-blue-600 text-blue-600 font-semibold py-2.5 px-6 rounded-lg
                     hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:cursor-pointer"
        >
          {buttonText}
        </a>
      </button>
      </div>
    </div>
  );
};

export default ServiceCard;