import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../constants/api";
import axios from "axios";
import {
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

const AdminMenteeDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [menteeData, setMenteeData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`${server}/admin/getMentee-detail/${id}`, {
          withCredentials: true,
        });
        setMenteeData(response.data);
      } catch (err) {
        console.error("Error fetching mentee detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!menteeData) {
    return (
      <div className="text-center text-red-500 font-semibold">
        Failed to load mentee data.
      </div>
    );
  }

  const { mentee, registeredEvents } = menteeData;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Mentee Profile</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">{mentee.fullName}</h3>
        
        <div className="space-y-3 text-gray-600">
          <div className="flex items-center"><FaEnvelope className="mr-2 text-indigo-600" /> {mentee.email}</div>
          <div className="flex items-center"><FaPhone className="mr-2 text-indigo-600" /> {mentee.phoneNumber}</div>
          <div className="flex items-center"><FaBriefcase className="mr-2 text-indigo-600" /> {mentee.currentJob}</div>
          <div className="flex items-center"><FaUserGraduate className="mr-2 text-indigo-600" /> {mentee.education.join(", ")}</div>
          <div className="flex items-center"><FaChalkboardTeacher className="mr-2 text-indigo-600" /> Interested In: {mentee.areaOfMentorshipInterest.join(", ")}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Assigned Mentors</h3>
        {mentee.yourMentors.length > 0 ? (
          <ul className="space-y-2 text-gray-600">
            {mentee.yourMentors.map((mentor) => (
              <li key={mentor._id}>
                <span className="font-medium">{mentor.fullName}</span> — {mentor.email} | {mentor.phoneNumber}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No mentors assigned yet.</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Registered Events</h3>
        {registeredEvents.length > 0 ? (
          <ul className="space-y-4 text-gray-600">
            {registeredEvents.map((event) => (
              <li key={event._id} className="border-b pb-2">
                <div className="flex items-center"><FaCalendarAlt className="mr-2 text-indigo-600" /> {new Date(event.seminarDate).toLocaleDateString()}</div>
                <div className="flex items-center"><FaMapMarkerAlt className="mr-2 text-indigo-600" /> {event.where}</div>
                <div className="font-medium">{event.title}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No events registered yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminMenteeDetail;
