import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../constants/api';
import { useServices } from '../context/ServiceContext';
import {
  FaUser,
  FaCheckCircle,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash,
  FaChevronDown,
  FaUpload,
  FaTimes,
  FaSpinner
} from 'react-icons/fa';

const MenteeRegistrationPage = () => {
  const navigate = useNavigate();
  const { login } = useServices();
  const [formData, setFormData] = useState({
    fullName: '',
    education: '',
    currentJob: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    description: '',
    mentorshipInterests: [],
    resume: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const mentorshipOptions = [
    "Career Guidance",
    "Technical Skills",
    "Interview Preparation",
    "Resume Building",
    "Leadership Development",
    "Networking Strategies",
    "Personal Branding",
    "Project Management",
    "Entrepreneurship",
    "Industry Insights",
    "Academic Research",
    "Job Search Strategies",
    "Other"
  ];

  const [customInterest, setCustomInterest] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInterestChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === 'Other') {
      setShowCustomInput(true);
    } else if (selectedOption && !formData.mentorshipInterests.includes(selectedOption)) {
      setFormData({
        ...formData,
        mentorshipInterests: [...formData.mentorshipInterests, selectedOption]
      });
    }
    e.target.value = '';
  };

  const removeInterest = (interest) => {
    setFormData({
      ...formData,
      mentorshipInterests: formData.mentorshipInterests.filter(i => i !== interest)
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const validateForm = () => {
    if (!formData.fullName) return setSubmitError('Full name is required'), false;
    if (!formData.email) return setSubmitError('Email is required'), false;
    if (!formData.password) return setSubmitError('Password is required'), false;
    if (formData.password.length < 6) return setSubmitError('Password must be at least 6 characters'), false;
    if (formData.password !== formData.confirmPassword) return setSubmitError('Passwords do not match'), false;
    if (!formData.description) return setSubmitError('Description is required'), false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    if (!validateForm()) {
      setSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'mentorshipInterests') {
          value.forEach(interest => formDataToSend.append('mentorshipInterests', interest));
        } else if (key === 'resume' && value) {
          formDataToSend.append('resume', value);
        } else {
          formDataToSend.append(key, value);
        }
      });

      const response = await axios.post(`${server}/mentee/register`, formDataToSend, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      login(response?.data?.token, response.data.mentee.role);
      navigate('/mentee/dashboard');
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        education: '',
        currentJob: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        description: '',
        mentorshipInterests: [],
        resume: null
      });
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitError(error.response?.data?.msg || 'Failed to submit registration. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen mt-5 bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto mt-5">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-lg mr-4">
                <FaUser className="h-10 w-10 text-indigo-700" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Student Registration</h1>
                <p className="text-blue-100 mt-1">Complete the form below to join our mentorship program</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
                <FaCheckCircle className="h-5 w-5 mr-2" />
                Registration successful! Our team will contact you shortly.
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                <FaExclamationCircle className="h-5 w-5 mr-2" />
                {submitError}
              </div>
            )}

            {/* Top Form Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Full Name *</label>
                <input type="text" placeholder='Enter your full Name' name="fullName" value={formData.fullName} onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />

                <label className="block mt-6 mb-2 font-medium text-gray-700">Education *</label>
                <input type="text" placeholder='eg.BCA,MCA,Btech' name="education" value={formData.education} onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />

                <label className="block mt-6 mb-2 font-medium text-gray-700">Current Job</label>
                <input type="text" placeholder='eg:software engineer' name="currentJob" value={formData.currentJob} onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">Email *</label>
                <input type="email" placeholder='rk@gmail.com' name="email" value={formData.email} onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />

                <label className="block mt-6 mb-2 font-medium text-gray-700">Phone *</label>
                <input type="tel" placeholder='10 digit phone number' name="phone" value={formData.phone} onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block mb-2 font-medium text-gray-700">About You *</label>
              <textarea name="description" rows="4" value={formData.description} onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg" required
                placeholder="Tell us about your background, goals, and what you hope to gain from mentorship" />
            </div>

            {/* Password Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Password *</label>
                <div className="relative">
                  <input placeholder='enter password' type={showPassword ? "text" : "password"} name="password" value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-gray-600">{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">Confirm Password *</label>
                <div className="relative">
                  <input  placeholder='confirm Password' type={showConfirmPassword ? "text" : "password"} name="confirmPassword"
                    value={formData.confirmPassword} onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10" required />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-2 text-gray-600">{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</button>
                </div>
              </div>
            </div>

            {/* Mentorship Interests */}
            <div className="mt-6">
              <label className="block mb-2 font-medium text-gray-700">Area of Mentorship Interest *</label>
              <div className="relative">
                <select onChange={handleInterestChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white">
                  <option value="">Select your interests...</option>
                  {mentorshipOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-3 text-gray-600 pointer-events-none">
                  <FaChevronDown />
                </div>
              </div>

              {showCustomInput && (
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Enter your interest"
                    value={customInterest}
                    onChange={(e) => setCustomInterest(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customInterest && !formData.mentorshipInterests.includes(customInterest)) {
                        setFormData({
                          ...formData,
                          mentorshipInterests: [...formData.mentorshipInterests, customInterest]
                        });
                      }
                      setCustomInterest('');
                      setShowCustomInput(false);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                  >
                    Add
                  </button>
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                {formData.mentorshipInterests.map((interest, index) => (
                  <div key={index} className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                    <span className="mr-1">{interest}</span>
                    <button type="button" onClick={() => removeInterest(interest)} className="text-indigo-600">
                      <FaTimes className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Upload */}
            <div className="mt-6">
              <label className="block mb-2 font-medium text-gray-700">Resume (optional)</label>
              <div className="flex items-center">
                <label className="flex flex-col items-center px-4 py-2 bg-white text-indigo-600 rounded-lg border border-indigo-300 cursor-pointer hover:bg-indigo-50">
                  <FaUpload className="h-6 w-6" />
                  <span className="text-sm">Choose File</span>
                  <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                </label>
                <span className="ml-4 text-gray-600">
                  {formData.resume ? formData.resume.name : "No file chosen"}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">PDF or DOCX files only (Max 5MB)</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-6 mt-8">
              <p className="text-gray-600 text-sm mb-4 sm:mb-0">
                Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Sign in</a>
              </p>
              <div className="flex gap-4">
                <button type="button" onClick={() => navigate('/')}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 ${submitting && 'opacity-75 cursor-not-allowed'}`}>
                  {submitting ? (
                    <span className="flex items-center">
                      <FaSpinner className="animate-spin mr-2 h-4 w-4" />
                      Submitting...
                    </span>
                  ) : 'Register Now'}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Your information is secure and will only be used for mentorship matching purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default MenteeRegistrationPage;
