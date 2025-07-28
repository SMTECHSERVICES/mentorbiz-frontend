import React, { useEffect, useState } from 'react';
import { data, Link, Navigate, useNavigate } from "react-router-dom";
import { useServices } from "../context/ServiceContext";
import {
  FaChalkboardTeacher, FaCalendarAlt, FaMapMarkerAlt, 
  FaRegClock, FaChevronLeft, FaChevronRight,
  FaUserFriends,FaArrowRight, FaSpinner 
} from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import { server } from '../constants/api';
import toast from 'react-hot-toast';



const CurrentEvent = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
const [registerLoadingId, setRegisterLoadingId] = useState(null);
  const [totalEvents, setTotalEvents] = useState(0);
  const limit = 2; // Events per page
  const navigate = useNavigate();

const { authToken } = useServices();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const [currentRes, pastRes] = await Promise.all([
          axios.get(`${server}/mentee/current-events?page=${currentPage}&limit=${limit}`),
          axios.get(`${server}/mentee/past-events`)
        ]);

        setCurrentEvents(currentRes.data.events);
        setTotalPages(currentRes.data.totalPage);      // match your backend key
        setTotalEvents(currentRes.data.totalNumberOfEvents); // match your backend key
        setPastEvents(pastRes.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage]);

const handleEventRegister = async (id) => {
  if (!authToken) return;

  try {
    setRegisterLoadingId(id); // Set loading for the clicked event
    const response = await axios.post(`${server}/mentee/event-register/${id}`, {}, { withCredentials: true });
    toast.success(response?.data?.message);
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Registration failed');
  } finally {
    setRegisterLoadingId(null); // Reset loading state
  }
};

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render pagination buttons with ellipsis
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`w-10 h-10 rounded-full ${1 === currentPage ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis-start" className="px-2">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 rounded-full ${i === currentPage ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis-end" className="px-2">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`w-10 h-10 rounded-full ${totalPages === currentPage ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Current Events Section */}
      <section className="py-16 mt-11 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Current Events</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">
            Showing {currentEvents.length} of {totalEvents} events
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : currentEvents.length > 0 ? (
          <>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {currentEvents.map(event => (
                <div key={event._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transform transition-all hover:shadow-xl">
                  {event.thumbnailurl ? (
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        src={event.thumbnailurl}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.parentElement.innerHTML = '<div class="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 w-full h-full"></div>';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                  )}

                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <div className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                        <FaChalkboardTeacher className="mr-2" />
                        Workshop
                      </div>
                      <div className="flex items-center text-gray-500">
                        <FaCalendarAlt className="mr-2" />
                        <span>{formatDate(event.seminarDate)}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-5 line-clamp-3">{event.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-gray-600">
                        <FaRegClock className="mr-3 text-indigo-600" />
                        <span>{event.timing || '9:00 AM - 5:00 PM'}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaMapMarkerAlt className="mr-3 text-indigo-600" />
                        <span>{event.where || 'Online / Venue'}</span>
                      </div>
                      <div className="flex items-center text-gray-600 md:col-span-2">
                        <FaUserFriends className="mr-3 text-indigo-600" />
                        <span>{event.registredStudent?.length || 0} Registered Students</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      {/* <Link
                        to={`/register/${event._id}`}
                        className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        Register Now
                        <FaArrowRight className="ml-2" />
                      </Link> */}
                    <button
  onClick={() => handleEventRegister(event._id)}
  disabled={registerLoadingId === event._id}
  className={`inline-flex items-center px-5 py-3 rounded-lg font-medium transition-opacity duration-300
    ${registerLoadingId === event._id
      ? 'bg-indigo-300 text-white cursor-not-allowed'
      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90'}`}
>
  {registerLoadingId === event._id ? (
    <>
      <FaSpinner className="animate-spin mr-2 h-5 w-5" />
      Registering...
    </>
  ) : (
    <>
      Register Now
      <FaArrowRight className="ml-2" />
    </>
  )}
</button>
                      {/* <Link
                        to={`/event-details/${event._id}`}
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        View Details
                      </Link> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-gray-600">
                Page {currentPage} of {totalPages} • {totalEvents} total events
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  }`}
                >
                  <FaChevronLeft className="mr-2" />
                  Previous
                </button>

                <div className="flex space-x-1">
                  {renderPagination()}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    currentPage === totalPages || totalPages === 0
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  }`}
                >
                  Next
                  <FaChevronRight className="ml-2" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-5xl text-gray-300 mb-4">📅</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Current Events Available</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              There are no upcoming events scheduled at this time. Please check back later or browse our past events.
            </p>
          </div>
        )}
      </section>

      {/* Past Events Section */}
      <section className="py-16 bg-gray-100 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Past Events</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Browse through our previous successful events</p>
          </div>

          {pastEvents.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              navigation
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {pastEvents.map(event => (
                <SwiperSlide key={event._id}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full border border-gray-200 transform transition-all hover:shadow-xl">
                    {event.thumbnailurl ? (
                      <div className="h-48 w-full overflow-hidden">
                        <img
                          src={event.thumbnailurl}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentElement.innerHTML = '<div class="p-2 bg-gray-300 w-full h-full"></div>';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="p-2 bg-gray-300"></div>
                    )}
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          <FaChalkboardTeacher className="mr-2" />
                          Past Event
                        </div>
                        <div className="flex items-center text-gray-500">
                          <FaCalendarAlt className="mr-2" />
                          <span>{formatDate(event.seminarDate)}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                      <p className="text-gray-600 mb-5 line-clamp-3">{event.description}</p>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <div className="flex items-center text-gray-500">
                          <FaUserFriends className="mr-2" />
                          <span>{event.registredStudent?.length || 0} Participants</span>
                        </div>
                        {/* <Link
                          to={`/event-details/${event._id}`}
                          className="text-indigo-600 hover:underline font-medium"
                        >
                          View Recap
                        </Link> */}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            !loading && (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <div className="text-5xl text-gray-300 mb-4">📜</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Past Events Available</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We don't have any past events to display at this time.
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default CurrentEvent;
