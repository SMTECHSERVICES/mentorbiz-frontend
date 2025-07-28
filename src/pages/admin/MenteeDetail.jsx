import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../constants/api';
import { 
  FaSearch, 
  FaFilter, 
  FaUserGraduate, 
  FaBriefcase, 
  FaPhone, 
  FaEnvelope, 
  FaFilePdf,
  FaDownload
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MenteeDetail = () => {
  const [mentees, setMentees] = useState([]);
  const [filteredMentees, setFilteredMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInterest, setFilterInterest] = useState('all');
  
  // Unique areas of interest for filter dropdown
  const areasOfInterest = [...new Set(
    mentees.flatMap(mentee => mentee.areaOfMentorshipInterest)
  )];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/admin/getAllMentees`, {
          withCredentials: true
        });
        setMentees(response.data.allMentess);
        setFilteredMentees(response.data.allMentess);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch mentee data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter mentees based on search term and selected interest
    let result = mentees;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(mentee => 
        mentee.fullName.toLowerCase().includes(term) ||
        mentee.emailId.toLowerCase().includes(term) ||
        mentee.phoneNumber.includes(term) ||
        mentee.education.some(edu => edu.toLowerCase().includes(term)) ||
        mentee.currentJob.toLowerCase().includes(term)
      );
    }
    
    if (filterInterest !== 'all') {
      result = result.filter(mentee => 
        mentee.areaOfMentorshipInterest.includes(filterInterest)
      );
    }
    
    setFilteredMentees(result);
  }, [searchTerm, filterInterest, mentees]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto mt-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mt-15 text-center text-gray-800 mb-2">Mentee Directory</h1>
      
      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search mentees..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Interest Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              value={filterInterest}
              onChange={(e) => setFilterInterest(e.target.value)}
            >
              <option value="all">All Interests</option>
              {areasOfInterest.map((interest, index) => (
                <option key={index} value={interest}>{interest}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Mentee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentees.length > 0 ? (
          filteredMentees.map((mentee) => (
            <div 
              key={mentee._id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-800">{mentee.fullName}</h2>
                    <p className="text-sm text-gray-500">
                      Joined: {new Date(mentee.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaUserGraduate className="text-blue-500 mr-2" />
                    <span className="text-gray-700">
                      {mentee.education.join(', ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <FaBriefcase className="text-blue-500 mr-2" />
                    <span className="text-gray-700">
                      {mentee.currentJob}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <FaPhone className="text-blue-500 mr-2" />
                    <span className="text-gray-700">
                      {mentee.phoneNumber}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-500 mr-2" />
                    <span className="text-gray-700 break-all">
                      {mentee.emailId}
                    </span>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {mentee.areaOfMentorshipInterest.map((interest, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <a 
                    href={mentee.resume} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaFilePdf className="mr-2" />
                    View Resume
                    <FaDownload className="ml-2 text-sm" />
                  </a>
                </div>
                 <div className="mt-6">
                  
                 <Link className='text-blue-500' to={`/admin/mentee-detail/${mentee._id}`}>View Detail</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium text-gray-500">
              No mentees found matching your criteria
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenteeDetail;