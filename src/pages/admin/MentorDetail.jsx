import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../constants/api';
import { 
  FaSearch, 
  FaFilter, 
  FaBriefcase, 
  FaPhone, 
  FaEnvelope, 
  FaFilePdf,
  FaDownload,
  FaStar,
  FaUser,
  FaGraduationCap
} from 'react-icons/fa';

const MentorDetail = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  
  // Get unique specialties for filter dropdown
  const specialties = [...new Set(
    mentors.flatMap(mentor => mentor.areaofMentorship)
  )];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/admin/getAllMentors`, {
          withCredentials: true
        });
        setMentors(response.data.allMentors);
        setFilteredMentors(response.data.allMentors);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch mentor data');
        setLoading(false);
        console.error('Error fetching mentors:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter mentors based on search term and selected specialty
    let result = mentors;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(mentor => 
        mentor.fullName.toLowerCase().includes(term) ||
        mentor.email.toLowerCase().includes(term) ||
        mentor.phoneNumber.includes(term) ||
        mentor.currentJob.toLowerCase().includes(term) ||
        mentor.description.toLowerCase().includes(term) ||
        mentor.areaofMentorship.some(spec => spec.toLowerCase().includes(term))
  )}
    
    if (filterSpecialty !== 'all') {
      result = result.filter(mentor => 
        mentor.areaofMentorship.includes(filterSpecialty)
      );
    }
    
    setFilteredMentors(result);
  }, [searchTerm, filterSpecialty, mentors]);

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
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl mt-15 font-bold text-gray-800 mb-2">Our Expert Mentors</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect with experienced professionals ready to guide you on your journey
        </p>
      </div>
      
      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search mentors by name, expertise, or company..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Specialty Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
            >
              <option value="all">All Specialties</option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Mentor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <div 
              key={mentor._id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Profile Header */}
              <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 h-32">
                <div className="absolute -bottom-12 left-6">
                  {mentor.profilePicture ? (
                    <img 
                      src={mentor.profilePicture} 
                      alt={mentor.fullName}
                      className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 flex items-center justify-center border-white">
                      <FaUser className="text-gray-400 text-3xl" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-16 px-6 pb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{mentor.fullName}</h2>
                    <div className="flex items-center text-gray-600 mt-1">
                      <FaBriefcase className="mr-2 text-sm" />
                      <span>{mentor.currentJob}</span>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="ml-1" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                  {mentor.description}
                </p>
                
                <div className="mb-5">
                  <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <FaGraduationCap className="mr-2 text-blue-500" />
                    Areas of Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.areaofMentorship.map((specialty, index) => (
                      <span 
                        key={index} 
                        className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaPhone className="mr-2 text-blue-500" />
                        <span>{mentor.phoneNumber}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaEnvelope className="mr-2 text-blue-500" />
                        <span className="break-all">{mentor.email}</span>
                      </div>
                    </div>
                    
                    <a 
                      href={mentor.resume} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 bg-white border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
                    >
                      <FaFilePdf className="mr-2" />
                      Resume
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium text-gray-500">
              No mentors found matching your criteria
            </h3>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => {
                setSearchTerm('');
                setFilterSpecialty('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorDetail;