import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../constants/api';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${server}/admin/events`, {
        params: {
          page: currentPage,
          limit: 10,
          category: category
        },
        withCredentials: true
      });

      setEvents(response.data.events);
      setTotalPage(response.data.totalPage);
      setError(null);
    } catch (err) {
      setError("Failed to fetch events. Please try again.");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [currentPage, category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mt-17 mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl  font-bold text-gray-800">Event Management</h1>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-1 md:py-2 md:px-4 md:rounded-lg flex items-center"
          onClick={() => navigate('/admin/add-event')}
        >
          <FaPlus className="mr-2" /> Add New Event
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Status
        </label>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Events</option>
          <option value="true">Published</option>
          <option value="false">Unpublished</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading events...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Events Table */}
      {!loading && !error && (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.length > 0 ? (
                  events.map((event) => (
                    <tr key={event._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(event.seminarDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${event.isPublish 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'}`}
                        >
                          {event.isPublish ? 'Published' : 'Unpublished'}
                        </span>
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
  <button 
    className="text-indigo-600 hover:text-indigo-900"
    onClick={() => navigate(`/admin/event-detail/${event._id}`)}
  >
    View Details
  </button>
</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      No events found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Page <span className="font-medium">{currentPage}</span> of{' '}
              <span className="font-medium">{totalPage}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium 
                  ${currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                <FaArrowLeft className="mr-2" /> Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
                className={`flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium 
                  ${currentPage === totalPage 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Next <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Events;