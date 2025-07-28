import React, { useState, useEffect } from 'react';
import { server } from '../../constants/api';
import axios from 'axios';
import MentorCardComponent from '../../components/MentorCardComponent'; // Your card component
import { FaUserFriends, FaSadTear } from 'react-icons/fa';

const YourMentor = () => {
  const [availableMentors, setAvailableMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${server}/mentee/availableMentors`, {
          withCredentials: true,
        });

        const mentors = response.data.availableMentors;

        if (mentors && mentors.length > 0) {
          setAvailableMentors(mentors);
        } else {
          setAvailableMentors([]);
        }

        setError(null);
      } catch (error) {
        console.error('Error fetching mentors:', error);
        setError('Failed to load mentors. Please try again later.');
        setAvailableMentors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded my-6">
        <div className="flex items-center">
          <FaSadTear className="text-red-500 mr-3 text-xl" />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (availableMentors.length === 0) {
    return (
      <div className="max-w-4xl mt-15 mx-auto py-12 px-4 text-center">
        <div className="bg-blue-50 rounded-xl p-8 shadow-inner">
          <FaUserFriends className="text-blue-400 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Mentors Available</h2>
          <p className="text-gray-600 mb-4">
            Mentors matching your interests are not available at the moment.
          </p>
          <p className="text-gray-600">
            Please check back later or try refining your mentorship interests.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mt-15 mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Available Mentors as per your prefrence</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect with experienced professionals who can guide you in your career journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableMentors.map((mentor) => (
          <MentorCardComponent
            key={mentor._id}
            id={mentor._id}
            fullName={mentor.fullName}
            description={mentor.description || 'Experienced mentor with valuable insights'}
            areaofMentorship={mentor.areaofMentorship || ['Career Guidance']}
          />
        ))}
      </div>
    </div>
  );
};

export default YourMentor;
