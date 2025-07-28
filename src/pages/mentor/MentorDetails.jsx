import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // ✅ import toast
import { server } from '../../constants/api';

import {
  FaArrowLeft,
  FaBriefcase,
  FaEnvelope,
  FaPhone,
  FaUserTie,
  FaLightbulb,
  FaFilePdf,
  FaSpinner,
  FaGraduationCap
} from 'react-icons/fa';

const MentorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false); // ✅ state for button disable

  useEffect(() => {
    const fetchMentorDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${server}/mentee/mentor-detail/${id}`, {
          withCredentials: true,
        });

        if (response.data?.mentor) {
          setMentor(response.data.mentor);
        } else {
          setError('Mentor not found');
        }
      } catch (err) {
        console.error('Failed to fetch mentor data:', err);
        setError(err.response?.data?.message || 'Failed to load mentor details');
      } finally {
        setLoading(false);
      }
    };

    fetchMentorDetails();
  }, [id]);

  const handleMentorRequest = async (mentorId) => {
    try {
      setIsRequesting(true);
      const response = await axios.post(`${server}/mentee/request-mentor/${mentorId}`, {}, {
        withCredentials: true,
      });

      toast.success(response.data.message || "Mentor request sent successfully!");
    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.message || 'Failed to send mentor request';
      toast.error(msg);
    } finally {
      setIsRequesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-20 p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-sm text-red-700">{error}</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Back to mentors
        </button>
      </div>
    );
  }

  if (!mentor) return null;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <FaArrowLeft className="mr-2" /> Back to mentors
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              {mentor.profilePicture ? (
                <img
                  src={mentor.profilePicture}
                  alt={mentor.fullName}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="bg-indigo-100 border-2 border-white rounded-full w-32 h-32 flex items-center justify-center shadow-md">
                  <span className="text-indigo-700 text-4xl font-bold">
                    {getInitials(mentor.fullName)}
                  </span>
                </div>
              )}
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white">{mentor.fullName}</h1>

              {mentor.education && (
                <div className="mt-2 flex items-center justify-center md:justify-start">
                  <FaGraduationCap className="text-blue-200 mr-2" />
                  <p className="text-blue-100 text-lg">{mentor.education}</p>
                </div>
              )}

              {mentor.currentJob && (
                <div className="mt-1 flex items-center justify-center md:justify-start">
                  <FaBriefcase className="text-blue-200 mr-2" />
                  <p className="text-blue-100 text-lg">{mentor.currentJob}</p>
                </div>
              )}

              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                {mentor.email && (
                  <a
                    href={`mailto:${mentor.email}`}
                    className="flex items-center bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded-full text-sm"
                  >
                    <FaEnvelope className="mr-1" /> Email
                  </a>
                )}
                {mentor.phoneNumber && (
                  <a
                    href={`tel:${mentor.phoneNumber}`}
                    className="flex items-center bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded-full text-sm"
                  >
                    <FaPhone className="mr-1" /> Call
                  </a>
                )}
                {mentor.resume && (
                  <a
                    href={mentor.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded-full text-sm"
                  >
                    <FaFilePdf className="mr-1" /> Resume
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaUserTie className="text-indigo-600 text-xl mr-2" />
              <h2 className="text-xl font-bold text-gray-800">About Mentor</h2>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {mentor.description || "No description provided"}
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaLightbulb className="text-yellow-500 text-xl mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Mentorship Areas</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {mentor.areaofMentorship?.length > 0 ? (
                mentor.areaofMentorship.map((area, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {area}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No mentorship areas specified</p>
              )}
            </div>
          </div>

          {mentor.experience && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <FaBriefcase className="text-green-500 text-xl mr-2" />
                <h2 className="text-xl font-bold text-gray-800">Professional Experience</h2>
              </div>
              <p className="text-gray-700 whitespace-pre-line">
                {mentor.experience}
              </p>
            </div>
          )}

          {/* Request Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              disabled={isRequesting}
              onClick={() => handleMentorRequest(mentor._id)}
              className={`w-full md:w-auto bg-indigo-600 text-white font-medium py-3 px-8 rounded-lg shadow-md transition duration-300 ${
                isRequesting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
              }`}
            >
              {isRequesting ? 'Requesting...' : 'Request Mentoring Session'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetails;
