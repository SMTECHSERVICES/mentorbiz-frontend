

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../constants/api';
import {
  FaUser, FaBriefcase, FaGraduationCap, FaEnvelope, FaPhone,
  FaFilePdf, FaUsers, FaStar, FaCalendarAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MentorDashboard = () => {
  const [mentorData, setMentorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/mentor/dashboardData`, {
          withCredentials: true
        });
        setMentorData(response.data.mentor);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditProfile = () => {
    navigate('/mentor/profile', { state: mentorData });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
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

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header with Edit Profile Button */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Mentor Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {mentorData.fullName}</p>
          </div>
          <button
            onClick={handleEditProfile}
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition duration-300"
          >
            Edit Profile
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaUsers className="text-blue-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Interested Mentees</p>
              <p className="text-2xl font-bold">{mentorData.interestedMentees.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FaStar className="text-green-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Mentorship Areas</p>
              <p className="text-2xl font-bold">{mentorData.areaofMentorship.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FaCalendarAlt className="text-purple-600 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500">Member Since</p>
              <p className="text-2xl font-bold">
                {new Date(mentorData.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mentor Profile Card */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center">
                <div className="flex justify-center">
                  <img
                    src={mentorData.profilePicture}
                    alt={mentorData.fullName}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
                <h1 className="mt-4 text-2xl font-bold text-white">{mentorData.fullName}</h1>
                <p className="mt-1 text-blue-100">{mentorData.currentJob}</p>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold flex items-center text-gray-700">
                    <FaUser className="mr-2 text-blue-500" />
                    About Me
                  </h2>
                  <p className="mt-2 text-gray-600">{mentorData.description}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold flex items-center text-gray-700">
                    <FaBriefcase className="mr-2 text-blue-500" />
                    Mentorship Areas
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mentorData.areaofMentorship.map((area, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold flex items-center text-gray-700">
                    <FaEnvelope className="mr-2 text-blue-500" />
                    Contact Information
                  </h2>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <FaEnvelope className="mr-2 text-gray-500" />
                      <span>{mentorData.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaPhone className="mr-2 text-gray-500" />
                      <span>{mentorData.phoneNumber}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <a
                    href={mentorData.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                  >
                    <FaFilePdf className="mr-2" />
                    View Resume
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mentees Section */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaUsers className="mr-2 text-indigo-600" />
                Interested Mentees
              </h2>

              {mentorData.interestedMentees.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUsers className="text-gray-400 text-2xl" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-700">No mentees yet</h3>
                  <p className="text-gray-500 mt-2">
                    Mentees interested in your expertise will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mentorData.interestedMentees.map(mentee => (
                    <div
                      key={mentee._id}
                      className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-start">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-4 flex-1">
                          <h3 className="font-bold text-lg text-gray-800">{mentee.fullName}</h3>
                          <p className="text-gray-600 flex items-center mt-1">
                            <FaBriefcase className="mr-2 text-sm" />
                            {mentee.currentJob}
                          </p>
                          <p className="text-gray-600 flex items-center mt-1">
                            <FaEnvelope className="mr-2 text-sm" />
                            {mentee.email}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium text-gray-700 flex items-center">
                          <FaGraduationCap className="mr-2 text-indigo-500" />
                          Education
                        </h4>
                        <ul className="mt-2 space-y-1">
                          {mentee.education.map((edu, idx) => (
                            <li key={idx} className="text-gray-600 text-sm">• {edu}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium text-gray-700">Mentorship Interests</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {mentee.areaOfMentorshipInterest.map((interest, idx) => (
                            <span
                              key={idx}
                              className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <a
                          href={mentee.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          <FaFilePdf className="mr-1" />
                          View Resume
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
