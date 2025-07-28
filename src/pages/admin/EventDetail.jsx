import React, { useState, useEffect } from 'react';
import { server } from '../../constants/api';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaRegClock, FaUserFriends, FaFilePdf } from 'react-icons/fa';
import { toast } from 'react-hot-toast'; // ✅ import toast


const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${server}/admin/event/${id}`, { withCredentials: true });
                setEvent(response.data.event);
            } catch (error) {
                toast.error('Failed to load event details');
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const togglePublishStatus = async () => {
        if (!event) return;
        
        try {
            setIsUpdating(true);
            const newStatus = !event.isPublish;
            await axios.patch(
                `${server}/admin/event/${id}`,
                { isPublish: newStatus },
                { withCredentials: true }
            );
            
            setEvent({ ...event, isPublish: newStatus });
            toast.success(`Event ${newStatus ? 'published' : 'unpublished'} successfully!`);
        } catch (error) {
            toast.error('Failed to update event status');
            console.error('Error updating event:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h2>
                    <p className="text-gray-600">The event you're looking for doesn't exist or has been removed.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-20 bg-gray-50">
           
            
            {/* Event Header */}
            <div className="relative bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2 text-indigo-300" />
                                    <span>{formatDate(event.seminarDate)}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="mr-2 text-indigo-300" />
                                    <span>{event.where}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaRegClock className="mr-2 text-indigo-300" />
                                    <span>{event.timing}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaUserFriends className="mr-2 text-indigo-300" />
                                    <span>{event.registredStudent?.length || 0} Registered</span>
                                </div>
                            </div>
                        </div>
                        
                        <button
                            onClick={togglePublishStatus}
                            disabled={isUpdating}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                                event.isPublish 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : 'bg-green-600 hover:bg-green-700'
                            } ${isUpdating ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isUpdating ? 'Processing...' : event.isPublish ? 'Unpublish Event' : 'Publish Event'}
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Event Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                            {event.thumbnailurl ? (
                                <img 
                                    src={event.thumbnailurl} 
                                    alt={event.title}
                                    className="w-full h-64 object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.parentElement.innerHTML = '<div class="bg-gradient-to-r from-indigo-500 to-purple-600 w-full h-64 flex items-center justify-center text-white text-xl font-bold">Event Image</div>';
                                    }}
                                />
                            ) : (
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-full h-64 flex items-center justify-center text-white text-xl font-bold">
                                    Event Image
                                </div>
                            )}
                            
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Description</h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Registration Stats */}
                    <div>
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Registration Details</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                    <span className="text-gray-600">Total Registrations:</span>
                                    <span className="font-semibold">{event.registredStudent?.length || 0}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                    <span className="text-gray-600">Event Status:</span>
                                    <span className={`font-semibold ${event.isPublish ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {event.isPublish ? 'Published' : 'Unpublished'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                    <span className="text-gray-600">Created At:</span>
                                    <span className="font-semibold">{formatDate(event.createdAt)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Last Updated:</span>
                                    <span className="font-semibold">{formatDate(event.updatedAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Registered Students Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800">Registered Students</h2>
                        <p className="text-gray-600 mt-2">
                            {event.registredStudent?.length > 0 
                                ? `${event.registredStudent.length} students registered for this event` 
                                : 'No students have registered yet'}
                        </p>
                    </div>
                    
                    {event.registredStudent?.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Education
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Current Job
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Interests
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Resume
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {event.registredStudent.map((student, index) => (
                                        <tr key={student._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{student.fullName}</div>
                                                <div className="text-sm text-gray-500">{student.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.education?.join(', ') || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.currentJob || 'Not specified'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.phoneNumber || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {student.areaOfMentorshipInterest?.join(', ') || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {student.resume ? (
                                                    <a 
                                                        href={student.resume} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-indigo-600 hover:text-indigo-900 flex items-center"
                                                    >
                                                        <FaFilePdf className="mr-1" /> View
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400">None</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetail;