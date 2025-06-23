


// src/pages/MenteeRegistration.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MenteeRegistrationPage = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    education: '',
    twelfthPassing: '',
    graduation: '',
    postGraduation: '',
    currentJob: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
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
    "Job Search Strategies"
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
    e.target.value = "";
  };
  
  const removeInterest = (interest) => {
    setFormData({
      ...formData,
      mentorshipInterests: formData.mentorshipInterests.filter(i => i !== interest)
    });
  };
  
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };
  
  const validateForm = () => {
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
      // Create FormData to handle file upload
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('education', formData.education);
      formDataToSend.append('twelfthPassing', formData.twelfthPassing);
      formDataToSend.append('graduation', formData.graduation);
      formDataToSend.append('postGraduation', formData.postGraduation);
      formDataToSend.append('currentJob', formData.currentJob);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('password', formData.password);
      formData.mentorshipInterests.forEach(interest => {
        formDataToSend.append('mentorshipInterests[]', interest);
      });
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }
      
      // Replace with your actual API endpoint
      await axios.post('https://api.example.com/mentee/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSubmitSuccess(true);
      // Reset form after successful submission
      setFormData({
        fullName: '',
        education: '',
        twelfthPassing: '',
        graduation: '',
        postGraduation: '',
        currentJob: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        mentorshipInterests: [],
        resume: null
      });
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitError(error.response?.data?.message || 'Failed to submit registration. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto mt-5">
        {/* <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">Mentee Registration</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our mentorship program to accelerate your career growth. Register now to connect with experienced mentors in your field.
          </p>
        </div> */}
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Registration successful! Our team will contact you shortly.
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
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="education">
                    Education
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Bachelor's in Computer Science"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="twelfthPassing">
                    12th Year of Passing
                  </label>
                  <input
                    type="text"
                    id="twelfthPassing"
                    name="twelfthPassing"
                    value={formData.twelfthPassing}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 2018"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="graduation">
                    Graduation (Optional)
                  </label>
                  <input
                    type="text"
                    id="graduation"
                    name="graduation"
                    value={formData.graduation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Bachelor's Degree"
                  />
                </div>
              </div>
              
              {/* Right Column */}
              <div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="postGraduation">
                    Post Graduation (Optional)
                  </label>
                  <input
                    type="text"
                    id="postGraduation"
                    name="postGraduation"
                    value={formData.postGraduation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Master's Degree"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="currentJob">
                    Current Job (Optional)
                  </label>
                  <input
                    type="text"
                    id="currentJob"
                    name="currentJob"
                    value={formData.currentJob}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Software Engineer"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                    Email ID
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>
            
            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters</p>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Mentorship Interests */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Area of Mentorship Interest
              </label>
              <div className="relative">
                <select
                  onChange={handleInterestChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="">Select your interests...</option>
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
            
            {/* Resume Upload */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">
                Resume Upload (Optional)
              </label>
              <div className="flex items-center">
                <label className="flex flex-col items-center px-4 py-2 bg-white text-indigo-600 rounded-lg border border-indigo-300 cursor-pointer hover:bg-indigo-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="mt-2 text-sm">Choose File</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                </label>
                <span className="ml-4 text-gray-600">
                  {formData.resume ? formData.resume.name : "No file chosen"}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">PDF or DOCX files only (Max 5MB)</p>
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