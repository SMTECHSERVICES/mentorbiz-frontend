import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher, FaCalendarAlt, FaMapMarkerAlt, FaRegClock, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import hero from '/images/homebanner.jpg';

const CurrentEvent = () => {
  const [currentEvents, setCurrentEvents] = useState([
    {
      id: 1,
      title: "Annual Tech Conference",
      description: "Join us for the biggest technology conference of the year featuring industry leaders and innovative workshops.",
      date: "2023-12-15",
      time: "9:00 AM - 5:00 PM",
      location: "Convention Center, New York",
      type: "conference",
      registerLink: "/register/tech-conference"
    }
  ]);

  const pastEvents = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      description: "Intensive 3-day bootcamp covering modern web development technologies.",
      date: "2023-11-10",
      type: "workshop"
    },
    {
      id: 2,
      title: "Digital Marketing Summit",
      description: "Learn the latest strategies in digital marketing from top experts.",
      date: "2023-10-22",
      type: "conference"
    },
    {
      id: 3,
      title: "UX Design Workshop",
      description: "Hands-on workshop focusing on user experience design principles.",
      date: "2023-09-15",
      type: "workshop"
    },
    {
      id: 4,
      title: "Data Science Conference",
      description: "Exploring the future of data science and machine learning.",
      date: "2023-08-30",
      type: "conference"
    },
    {
      id: 5,
      title: "Cloud Computing Seminar",
      description: "Deep dive into cloud infrastructure and deployment strategies.",
      date: "2023-07-18",
      type: "seminar"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
    

      {/* Current Events Section */}
      <section className="py-16 mt-11 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Current Events</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
        </div>

        {currentEvents.length > 0 ? (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {currentEvents.map(event => (
              <div 
                key={event.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transform transition-all hover:shadow-xl"
              >
                <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {event.type === "workshop" ? (
                      <div className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                        <FaChalkboardTeacher className="mr-2" />
                        Workshop
                      </div>
                    ) : (
                      <div className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        <FaUserGraduate className="mr-2" />
                        Conference
                      </div>
                    )}
                    <div className="ml-4 flex items-center text-gray-500">
                      <FaCalendarAlt className="mr-2" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-5">{event.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <FaRegClock className="mr-3 text-indigo-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-3 text-indigo-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={event.registerLink}
                    className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Register Now
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-5xl text-gray-300 mb-4">📅</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No Current Events Available
            </h3>
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
              <SwiperSlide key={event.id}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full border border-gray-200 transform transition-all hover:shadow-xl">
                  <div className={`p-2 ${event.type === "workshop" ? 'bg-indigo-600' : event.type === "conference" ? 'bg-purple-600' : 'bg-teal-600'}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {event.type === "workshop" ? (
                        <div className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                          <FaChalkboardTeacher className="mr-2" />
                          Workshop
                        </div>
                      ) : event.type === "conference" ? (
                        <div className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          <FaUserGraduate className="mr-2" />
                          Conference
                        </div>
                      ) : (
                        <div className="flex items-center bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                          <FaChalkboardTeacher className="mr-2" />
                          Seminar
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-5">{event.description}</p>
                    
                    <div className="flex items-center text-gray-500 border-t border-gray-100 pt-4">
                      <FaCalendarAlt className="mr-2" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default CurrentEvent;