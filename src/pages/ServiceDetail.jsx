import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useServices } from '../context/ServiceContext'
import { FaStar, FaChevronLeft, FaChevronRight, FaComment, FaArrowRight } from 'react-icons/fa'

const ServiceDetail = () => {
  const { servicesData } = useServices();
  const { id } = useParams();
  const serviceId = id;
  const navigate = useNavigate()

  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedMentors, setExpandedMentors] = useState({});

  const toggleDescription = (id) => {
   navigate(`/mentor/detail/${id}`)
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const service = servicesData.find(s => s._id === id);
      if (service) {
        setServiceDetails(service);
      } else {
        setError('Service not found.');
      }
    } catch (err) {
      console.error("Failed to fetch service data:", err);
      setError('Failed to load service details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [id, servicesData]);

  if (servicesData.length === 0) {
    return <div>Loading services...</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 font-inter text-gray-800">
        <div className="flex items-center text-xl font-medium text-blue-700">
          <svg className="animate-spin h-6 w-6 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading Service Details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 font-inter text-red-700 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <button 
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!serviceDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 font-inter text-gray-800 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
          <p>The service you are looking for does not exist.</p>
          <button 
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            onClick={() => window.history.back()}
          >
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  const explorePoints = serviceDetails.ExplorePoints 
    ? serviceDetails.ExplorePoints.split(',').map(point => point.trim())
    : [];

  const availableMentors = serviceDetails.availableMentors || [];

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-gray-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8 font-inter text-gray-800">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Image */}
        <div className="relative">
          <div className="h-48 sm:h-64 w-full bg-gray-200 rounded-t-xl overflow-hidden">
            <img
              src={serviceDetails.thumbnail}
              alt={serviceDetails.title}
              className="w-full h-full object-cover"
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = `https://placehold.co/800x450/CCCCCC/000000?text=${encodeURIComponent(serviceDetails.title)}`; 
              }}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{serviceDetails.title}</h1>
            <p className="text-white/90 max-w-2xl">{serviceDetails.description}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="sticky bottom-4 z-10 sm:static mb-8 sm:mb-10">
            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg sm:text-base">
              Enroll Now
            </button>
          </div>

          {/* Explore Points */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-800">What You'll Explore</h2>
              <div className="ml-4 flex-1 h-px bg-blue-200"></div>
            </div>
            {explorePoints.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {explorePoints.map((point, index) => (
                  <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex-shrink-0 mt-1 mr-3 text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">No exploration points defined for this service.</p>
            )}
          </section>

          {/* Mentors Section */}
     <section className="mb-16">
  <div className="flex items-center mb-6">
    <h2 className="text-2xl font-bold text-blue-800">Mentors Available</h2>
    <div className="ml-4 flex-1 h-px bg-blue-200"></div>
  </div>

  {availableMentors.length > 0 ? (
    <div className="relative group">
      {/* Navigation Arrows */}
   {availableMentors.length >2 ? (  
     <>
   <button 
        className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
        onClick={() => document.getElementById('mentor-slider').scrollBy({ left: -300, behavior: 'smooth' })}
      >
        <FaChevronLeft className="h-5 w-5 text-blue-600" />
      </button>
      
      <button 
        className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
        onClick={() => document.getElementById('mentor-slider').scrollBy({ left: 300, behavior: 'smooth' })}
      >
        <FaChevronRight className="h-5 w-5 text-blue-600" />
      </button>
   </>
  ) : null}

      {/* Gradient Fades */}
      {/* <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-blue-100 to-transparent z-[1] pointer-events-none hidden md:block"></div>
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-blue-100 to-transparent z-[1] pointer-events-none hidden md:block"></div> */}

      {/* Slider Container */}
    <div 
  id="mentor-slider"
  className="flex overflow-x-auto snap-x snap-mandatory pb-8 scroll-smooth gap-6 px-1 scrollbar-hide"
>
        {availableMentors.map((mentor) => (
          <div 
            key={mentor._id}
            className="snap-start flex-shrink-0 w-[calc(100%-2rem)] sm:w-72 bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="p-5 pb-12">
              <div className="flex items-center mb-4">
                <img
                  src={mentor.profilePicture}
                  alt={mentor.fullName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${mentor.fullName}&background=random`;
                  }}
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {mentor.fullName}
                  </h3>
                  <div className="flex items-center mt-1">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-xs font-medium text-gray-600">4.8 (32 reviews)</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {mentor.bio || "Experienced mentor with proven track record in guiding students..."}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {(mentor.areaofMentorship || []).slice(0, 3).map((expertise, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                  >
                    {expertise}
                  </span>
                ))}
              </div>
              
              <div className="absolute bottom-5 left-5 right-5">
                <button
                  onClick={() => navigate(`/mentor/detail/${mentor._id}`)}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition text-sm"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll Indicator (Mobile) */}
      <div className="flex justify-center space-x-2 mt-4 md:hidden">
        {availableMentors.map((_, idx) => (
          <div 
            key={idx} 
            className="w-2 h-2 rounded-full bg-gray-300"
            onClick={() => {
              const slider = document.getElementById('mentor-slider');
              slider.scrollTo({ left: idx * (window.innerWidth * 0.8), behavior: 'smooth' });
            }}
          ></div>
        ))}
      </div>
    </div>
  ) : (
    <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-100">
      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <FaComment className="h-8 w-8 text-blue-600" />
      </div>
      <p className="text-gray-700 mb-3">No specific mentors listed for this service yet.</p>
      <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto">
        Request a Mentor
        <FaArrowRight className="ml-1 mt-0.5" />
      </button>
    </div>
  )}
</section>

          {/* Enroll CTA */}
          <div className="mt-12 text-center">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg">
              Enroll in {serviceDetails.title}
            </button>
            <p className="text-gray-600 mt-4 text-sm">Start your learning journey today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
