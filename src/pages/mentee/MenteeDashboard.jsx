import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../../constants/api';
import { 
  FaUserGraduate, 
  FaBriefcase, 
  FaEnvelope, 
  FaPhone, 
  FaFilePdf,
  FaTags,
  FaUserTie,
  FaChalkboardTeacher,
  FaSpinner
} from 'react-icons/fa';

const MenteeDashboard = () => {
  const [menteeData, setMenteeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${server}/mentee/getDashboardData`, { 
          withCredentials: true 
        });
        setMenteeData(response?.data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load dashboard data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!menteeData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p>No data available</p>
      </div>
    );
  }

  const { mentee } = menteeData;
  const hasMentors = mentee.yourMentors && mentee.yourMentors.length > 0;

  return (
    <div className="min-h-screen mt-20 bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {mentee.fullName}!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Your mentorship journey starts here
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                    <FaUserTie className="text-3xl text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-white">{mentee.fullName}</h2>
                    <p className="text-blue-100">{mentee.role}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FaUserGraduate className="mr-2 text-blue-500" />
                  Personal Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaBriefcase className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Current Position</p>
                      <p className="text-gray-900">{mentee.currentJob}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaEnvelope className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900">{mentee.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaPhone className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-gray-900">{mentee.phoneNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaTags className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Areas of Interest</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {mentee.areaOfMentorshipInterest.map((interest, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaFilePdf className="mt-1 mr-3 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Resume</p>
                      <a 
                        href={mentee.resume} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center"
                      >
                        View Resume
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mentors Section */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="border-b border-gray-200 bg-white px-6 py-5">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <FaChalkboardTeacher className="mr-2 text-indigo-600" />
                  Your Mentors
                </h3>
              </div>
              
              <div className="p-6">
                {hasMentors ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mentee.yourMentors.map((mentor) => (
                      <div 
                        key={mentor._id} 
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
                            <FaUserTie className="text-xl text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <h4 className="font-bold text-gray-900">{mentor.fullName}</h4>
                            <p className="text-sm text-gray-600">{mentor.currentJob}</p>
                            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                              {mentor.description}
                            </p>
                            
                            <div className="mt-3 flex flex-wrap gap-2">
                              {mentor.areaofMentorship.map((area, index) => (
                                <span 
                                  key={index}
                                  className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                                >
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mx-auto">
                      <FaUserTie className="text-2xl text-gray-500" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      No mentors assigned yet
                    </h3>
                    <p className="mt-1 text-gray-500">
                      Your mentors will appear here once they're assigned to you
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeDashboard;