
import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../constants/api';
import { useServices } from '../context/ServiceContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaLightbulb, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaEye, 
  FaEyeSlash, 
  FaChevronDown,
  FaUpload,
  FaImage,
  FaTimes,
  FaSpinner
} from 'react-icons/fa';

const MentorRegistration = () => {
    const { login } = useServices();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const mentorshipOptions = [
        "Supply Chain Management",
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
        e.target.value = "";
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
            [name]: files[0]
        });
    };

    const validateForm = () => {
        setSubmitError('');

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

        if (!formData.mentorDescription.trim()) {
            setSubmitError('Mentor description is required');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitSuccess(false);

        if (!validateForm()) {
            setSubmitting(false);
            return;
        }

        try {
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
            
            if (formData.resume) {
                formDataToSend.append('resume', formData.resume);
            }
            
            if (formData.profilePicture) {
                formDataToSend.append('profilePicture', formData.profilePicture);
            }

            const response = await axios.post(`${server}/mentor/register`, formDataToSend, {
                withCredentials: true, 
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            login(response?.data?.token, response?.data?.mentor.role);
            navigate("/mentor/dashboard");

        } catch (error) {
            console.error('Registration error:', error);
            setSubmitError(error.response?.data?.message || 'Failed to submit registration. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 mt-10 py-8 px-4 font-inter text-gray-800">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8">
                        <div className="flex items-center">
                            <div className="bg-white p-2 rounded-lg mr-4">
                                <FaLightbulb className="h-10 w-10 text-indigo-700" />
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
                                <FaCheckCircle className="h-5 w-5 mr-2" />
                                Registration successful! Our team will review your application shortly.
                            </div>
                        )}

                        {submitError && (
                            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                                <FaExclamationCircle className="h-5 w-5 mr-2" />
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
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
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
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mentor Description */}
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
                                    <FaChevronDown className="h-4 w-4" />
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
                                            <FaTimes className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Resume Upload - Optional */}
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">
                                Resume Upload (optional)
                            </label>
                            <div className="flex items-center">
                                <label className="flex flex-col items-center px-4 py-2 bg-white text-indigo-600 rounded-lg border border-indigo-300 cursor-pointer hover:bg-indigo-50 transition-colors">
                                    <FaUpload className="h-6 w-6" />
                                    <span className="mt-2 text-sm">Choose File</span>
                                    <input
                                        type="file"
                                        name="resume"
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

                        {/* Profile Picture Upload - Optional */}
                        <div className="mb-8">
                            <label className="block text-gray-700 font-medium mb-2">
                                Profile Picture (optional)
                            </label>
                            <div className="flex items-center">
                                <label className="flex flex-col items-center px-4 py-2 bg-white text-indigo-600 rounded-lg border border-indigo-300 cursor-pointer hover:bg-indigo-50 transition-colors">
                                    <FaImage className="h-6 w-6" />
                                    <span className="mt-2 text-sm">Choose Image</span>
                                    <input
                                        type="file"
                                        name="profilePicture"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept="image/*"
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
                                            <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
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