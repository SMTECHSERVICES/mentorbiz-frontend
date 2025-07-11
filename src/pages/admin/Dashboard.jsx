import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../../constants/api';
import ExportDashboardExcel from '../../components/ExportDashboardExcel;';
import { 
  FaUsers, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaChartBar, 
  FaEnvelope, 
  FaPhone, 
  FaBriefcase,
  FaFilePdf,
  FaDownload
} from 'react-icons/fa';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/admin/dashboardData`, {
          withCredentials: true
        });
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
        console.error('Dashboard error:', error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  const { 
    totalNumberofMentees, 
    totalNumberofmentors, 
    mentorInterests, 
    interestMentorMap,
    mentors,
    mentees
  } = dashboardData;

  // Prepare data for the interest distribution chart
  const interestData = Object.entries(interestMentorMap).map(([interest, mentors]) => ({
    interest,
    count: mentors.length
  }));

  // Get top 3 interests by mentor count
  const topInterests = [...interestData]
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mt-20 text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Manage mentors and mentees</p>
          </div>
          <ExportDashboardExcel />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Mentors Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <FaChalkboardTeacher className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-600">Total Mentors</h3>
                <p className="text-3xl font-bold text-gray-800">{totalNumberofmentors}</p>
              </div>
            </div>
          </div>

          {/* Mentees Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <FaUserGraduate className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-600">Total Mentees</h3>
                <p className="text-3xl font-bold text-gray-800">{totalNumberofMentees}</p>
              </div>
            </div>
          </div>

          {/* Interests Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <FaChartBar className="text-purple-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-600">Mentorship Interests</h3>
                <p className="text-3xl font-bold text-gray-800">{mentorInterests.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Top Interests */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaChartBar className="mr-2 text-purple-500" />
                Top Mentorship Interests
              </h2>
              
              <div className="space-y-4">
                {topInterests.map((item, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">{item.interest}</span>
                      <span className="font-bold text-gray-800">{item.count} mentors</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${(item.count / Math.max(...topInterests.map(i => i.count)) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-700 mb-2">All Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {mentorInterests.map((interest, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity */}
          <div className="lg:col-span-2">
            {/* Recent Mentors */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaChalkboardTeacher className="mr-2 text-blue-500" />
                Recent Mentors
              </h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mentor
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expertise
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resume
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mentors.slice(0, 3).map(mentor => (
                      <tr key={mentor._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {mentor.profilePicture ? (
                                <img 
                                  className="h-10 w-10 rounded-full" 
                                  src={mentor.profilePicture} 
                                  alt={mentor.fullName} 
                                />
                              ) : (
                                <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {mentor.fullName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {mentor.currentJob}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {mentor.areaofMentorship.map((interest, idx) => (
                              <span 
                                key={idx} 
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <FaEnvelope className="mr-1 text-gray-400" />
                              <span className="truncate max-w-xs">{mentor.email}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <FaPhone className="mr-1 text-gray-400" />
                              {mentor.phoneNumber}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a 
                            href={mentor.resume} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-900"
                          >
                            <FaFilePdf className="mr-1" />
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Mentees */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaUserGraduate className="mr-2 text-green-500" />
                Recent Mentees
              </h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mentee
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Interests
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Education
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resume
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mentees.slice(0, 3).map(mentee => (
                      <tr key={mentee._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {mentee.fullName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {mentee.currentJob}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {mentee.areaOfMentorshipInterest.map((interest, idx) => (
                              <span 
                                key={idx} 
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {mentee.education.join(', ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a 
                            href={mentee.resume} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-900"
                          >
                            <FaFilePdf className="mr-1" />
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;