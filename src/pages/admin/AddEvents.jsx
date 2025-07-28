import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../../constants/api';
import { FaPlus, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // ✅ import toast

const AddEvents = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPublish: false,
    seminarDate: '',
    where: '',
    timing: ''
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { title, description, seminarDate, where } = formData;

    if (!title || !description || !seminarDate || !where) {
      setError('Please fill all required fields marked with *');
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        formDataToSend.append(key, val);
      });
      if (thumbnail) formDataToSend.append('thumbnail', thumbnail);

      const response = await axios.post(
        `${server}/admin/addNewEvent`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 201) {
        toast.success(response.data.message || "New event added succesfully");
        setSuccess('Event added successfully!');
        setFormData({
          title: '',
          description: '',
          isPublish: false,
          seminarDate: '',
          where: '',
          timing: ''
        });
        setThumbnail(null);
        // Optional: Redirect after 2 seconds
        setTimeout(() => navigate('/admin/events'), 2000);
      }
    } catch (err) {
      console.error('Error adding event:', err);
       const msg = error?.response?.data?.message || 'Failed to send mentor request';
      toast.error(msg);
      setError(err.response?.data?.message || 'Failed to add event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Back to Events
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Event</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Event Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter event title"
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter event description"
              disabled={loading}
            ></textarea>
          </div>

          {/* Seminar Date */}
          <div className="mb-4">
            <label htmlFor="seminarDate" className="block text-sm font-medium text-gray-700 mb-1">
              Seminar Date *
            </label>
            <input
              type="date"
              id="seminarDate"
              name="seminarDate"
              value={formData.seminarDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={loading}
            />
          </div>

          {/* Where */}
          <div className="mb-4">
            <label htmlFor="where" className="block text-sm font-medium text-gray-700 mb-1">
              Event Location *
            </label>
            <input
              type="text"
              id="where"
              name="where"
              value={formData.where}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., Zoom / Delhi Hall A"
              disabled={loading}
            />
          </div>

          {/* Timing */}
          <div className="mb-4">
            <label htmlFor="timing" className="block text-sm font-medium text-gray-700 mb-1">
              Event Timing
            </label>
            <input
              type="text"
              id="timing"
              name="timing"
              value={formData.timing}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., 9:00 AM - 5:00 PM"
              disabled={loading}
            />
          </div>

          {/* Thumbnail Upload */}
          <div className="mb-4">
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail Image
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              disabled={loading}
            />
            {thumbnail && (
              <div className="mt-2 text-xs text-gray-500">
                Selected: {thumbnail.name} ({Math.round(thumbnail.size / 1024)} KB)
              </div>
            )}
          </div>

          {/* Publish Checkbox */}
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="isPublish"
              name="isPublish"
              checked={formData.isPublish}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              disabled={loading}
            />
            <label htmlFor="isPublish" className="ml-2 block text-sm text-gray-700">
              Publish this event
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg flex items-center"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" /> Processing...
                </>
              ) : (
                <>
                  <FaPlus className="mr-2" /> Add Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvents;
