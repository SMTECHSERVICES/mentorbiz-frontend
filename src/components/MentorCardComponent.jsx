import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaArrowRight, FaLightbulb } from 'react-icons/fa';

const MentorCardComponent = ({ id, fullName, description, areaofMentorship }) => {
  const navigate = useNavigate();
  
  // Truncate description to 15 words
  const truncatedDesc = description.split(' ').slice(0, 15).join(' ') + '...';
  
  // Take first 2-3 mentorship areas
  const displayedMentorshipAreas = areaofMentorship.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FaUserTie className="text-blue-600 text-xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{fullName}</h3>
        </div>
        
        <p className="text-gray-600 mb-4">{truncatedDesc}</p>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
            <FaLightbulb className="mr-2 text-yellow-500" />
            Mentorship Areas:
          </h4>
          <div className="flex flex-wrap gap-2">
            {displayedMentorshipAreas.map((area, index) => (
              <span 
                key={index} 
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => navigate(`/mentor/detail/${id}`)}
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300"
        >
          View Profile
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default MentorCardComponent;