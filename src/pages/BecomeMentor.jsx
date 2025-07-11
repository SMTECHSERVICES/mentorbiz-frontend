

import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../constants/api';
// import axios from 'axios'; // axios import is commented out for self-contained execution in Canvas

const MentorRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    currentJob: '',
    phone: '',
    mentorshipInterests: [],
    resume: null,
    profilePicture: null, // New field for profile picture
    mentorDescription: '', // New field for mentor description
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const mentorshipOptions = [
    "Career Development",
    "Technical Skills",
    "Leadership Coaching",
    "Interview Preparation",
    "Resume Review",
    "Entrepreneurship",
    "Industry Networking",
    "Academic Guidance",
    "Project Management",
    "Personal Branding",
    "Career Transition",
    "Startup Advising"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleInterestChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption && !formData.mentorshipInterests.includes(selectedOption)) {
      setFormData({
        ...formData,
        mentorshipInterests: [...formData.mentorshipInterests, selectedOption]
      });
    }
    e.target.value = ""; // Reset select input after selection
  };

  const removeInterest = (interest) => {
    setFormData({
      ...formData,
      mentorshipInterests: formData.mentorshipInterests.filter(i => i !== interest)
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0] // Store the file object
    });
  };

  const validateForm = () => {
    setSubmitError(''); // Clear previous errors

    if (!formData.fullName) {
      setSubmitError('Full name is required');
      return false;
    }

    if (!formData.email) {
      setSubmitError('Email is required');
      return false;
    }

    if (!formData.password) {
      setSubmitError('Password is required');
      return false;
    }

    if (formData.password.length < 6) {
      setSubmitError('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setSubmitError('Passwords do not match');
      return false;
    }

    if (!formData.currentJob) {
      setSubmitError('Current Job is required');
      return false;
    }

    if (!formData.phone) {
        setSubmitError('Phone Number is required');
        return false;
    }

    if (formData.mentorshipInterests.length === 0) {
      setSubmitError('Please select at least one area of mentorship');
      return false;
    }

    if (!formData.resume) {
      setSubmitError('Resume upload is required');
      return false;
    }
    
    // New validation for profile picture
    if (!formData.profilePicture) {
      setSubmitError('Profile picture is required');
      return false;
    }

    // New validation for mentor description
    if (!formData.mentorDescription.trim()) {
        setSubmitError('Mentor description is required');
        return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitSuccess(false); // Reset success message

    if (!validateForm()) {
      setSubmitting(false);
      return;
    }

    try {
      // Create FormData to handle file uploads
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('currentJob', formData.currentJob);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('description', formData.mentorDescription);

      formData.mentorshipInterests.forEach(interest => {
        formDataToSend.append('mentorshipInterests[]', interest);
      });
      formDataToSend.append('resume', formData.resume);
      formDataToSend.append('profilePicture', formData.profilePicture); // Append new profile picture

      const respnse = await axios.post(`${server}/mentor/register`,formDataToSend,{withCredentials:true, headers: {
    'Content-Type': 'multipart/form-data',
  },});
      console.log(respnse)
      localStorage.setItem("role",respnse?.data?.mentor.role);
      localStorage.setItem('token',respnse?.data?.token)


      // Simulate API call
      // In a real application, replace this with your actual API endpoint
      // await axios.post('https://api.example.com/mentor/register', formDataToSend, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });

      
      
      // Simulate network delay
     

      setSubmitSuccess(true);
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        currentJob: '',
        phone: '',
        mentorshipInterests: [],
        resume: null,
        profilePicture: null,
        mentorDescription: '',
      });

    } catch (error) {
      console.error('Registration error:', error);
      // setSubmitError(error.response?.data?.message || 'Failed to submit registration. Please try again later.'); // For real API error
      setSubmitError('Failed to submit registration. Please check console for mock error details.'); // For mock error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 mt-5 py-8 px-4 font-inter text-gray-800">
      <div className="max-w-3xl mx-auto">
        {/* <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">Mentor Registration</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our platform as a mentor and share your expertise to guide the next generation of professionals.
          </p>
        </div> */}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700  py-6 px-8">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Share Your Expertise</h1>
                <p className="text-indigo-100 mt-1">Complete the form below to become a mentor</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Registration successful! Our team will review your application shortly.
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {submitError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="currentJob">
                    Current Job <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="currentJob"
                    name="currentJob"
                    value={formData.currentJob}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters</p>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                    >
                      {showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* New: Mentor Description */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="mentorDescription">
                Mentor Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="mentorDescription"
                name="mentorDescription"
                value={formData.mentorDescription}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Briefly describe your mentoring style, experience, and what you can offer."
              ></textarea>
            </div>

            {/* Mentorship Interests */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Area of Mentorship <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  onChange={handleInterestChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                >
                  <option value="">Select your mentorship areas...</option>
                  {mentorshipOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              {/* Selected interests tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.mentorshipInterests.map((interest, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                  >
                    <span className="mr-1">{interest}</span>
                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Upload - Required */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Resume Upload <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <label className="flex flex-col items-center px-4 py-2 bg-white text-indigo-600 rounded-lg border border-indigo-300 cursor-pointer hover:bg-indigo-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="mt-2 text-sm">Choose File</span>
                  <input
                    type="file"
                    name="resume" // Changed name to 'resume'
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                  />
                </label>
                <span className="ml-4 text-gray-600">
                  {formData.resume ? formData.resume.name : "No file chosen"}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">PDF or DOCX files only (Max 5MB)</p>
            </div>

            {/* New: Profile Picture Upload - Required */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">
                Profile Picture <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <label className="flex flex-col items-center px-4 py-2 bg-white text-indigo-600 rounded-lg border border-indigo-300 cursor-pointer hover:bg-indigo-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="mt-2 text-sm">Choose Image</span>
                  <input
                    type="file"
                    name="profilePicture" // Changed name to 'profilePicture'
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*" // Accept image files
                    required
                  />
                </label>
                <span className="ml-4 text-gray-600">
                  {formData.profilePicture ? formData.profilePicture.name : "No file chosen"}
                </span>
                {formData.profilePicture && (
                  <img
                    src={URL.createObjectURL(formData.profilePicture)}
                    alt="Profile Preview"
                    className="ml-4 w-16 h-16 object-cover rounded-full shadow-md"
                  />
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">JPG, PNG, or GIF (Max 2MB)</p>
            </div>


            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-6">
              <div className="text-gray-600 text-sm mb-4 sm:mb-0">
                <p>Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Sign in</a></p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                  onClick={() => {
                    // Reset form and messages on cancel
                    setFormData({
                      fullName: '', email: '', password: '', confirmPassword: '',
                      currentJob: '', phone: '', mentorshipInterests: [],
                      resume: null, profilePicture: null, mentorDescription: '',
                    });
                    setSubmitSuccess(false);
                    setSubmitError('');
                    setSubmitting(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${submitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {submitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : 'Register as Mentor'}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Your information will be reviewed by our team. We'll contact you once your mentor application is approved.</p>
        </div>
      </div>
    </div>
  );
};

export default MentorRegistration;

