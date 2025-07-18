import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useServices } from '../../context/ServiceContext';

const MentorDetails = () => {
  const { id } = useParams(); // this is the mentor ID from the URL
  const { servicesData } = useServices();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      // Loop through each service and check its availableMentors
      let foundMentor = null;
      for (const service of servicesData) {
        foundMentor = service.availableMentors?.find((m) => m._id === id);
        if (foundMentor) break;
      }

      if (foundMentor) {
        setMentor(foundMentor);
        
      } else {
        setError('Mentor not found.');
      }
    } catch (err) {
      console.error('Failed to fetch mentor data:', err);
      setError('Failed to load mentor details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [id, servicesData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!mentor) return null;
 

  return (
    <div className="p-4 max-w-3xl mt-20 mx-auto bg-white shadow rounded">
      <div className="flex items-center space-x-4">
        <img src={mentor.profilePicture} alt={mentor.fullName} className="w-20 h-20 rounded-full object-cover" />
        <div>
          <h1 className="text-2xl font-bold">{mentor.fullName}</h1>
          <p className="text-gray-600">{mentor.currentJob}</p>
          <p className="text-sm text-blue-500"><span className='text-sm text-gray-600'>Email: </span><a href={`mailto:${mentor.email}`}>{mentor.email}</a></p>
           <p className="text-sm text-blue-500"><span className='text-sm text-gray-600'>Phone: </span><a href={`tel:${mentor.phoneNumber}`}>{mentor.phoneNumber}</a></p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">About Mentor</h2>
        <p className="text-gray-700 whitespace-pre-line">{mentor.description}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Area of Mentorship</h2>
        <ul className="list-disc list-inside text-gray-700">
          {mentor.areaofMentorship?.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <a
          href={mentor.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          View Resume &rarr;
        </a>
      </div>
    </div>
  );
};

export default MentorDetails;
