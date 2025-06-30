// import React,{useState,useEffect} from 'react'
// import { useParams, } from 'react-router-dom'
// import { useServices } from '../context/ServiceContext'

// const ServiceDetail = () => {
//    const { servicesData } = useServices();
//   // Use useParams to get the id from the URL
//   // If react-router-dom is not set up, 'id' will be undefined,
//   // so we'll use a fallback for this standalone Canvas environment.
//   const { id } = useParams(); // This line is now active
//   const serviceId = parseInt(id) || 1; // Parse ID to integer, default to 1 for demo if no param

//   const [serviceDetails, setServiceDetails] = useState(null);
//   const [availableMentors, setAvailableMentors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchServiceData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Simulate API call delay
//         await new Promise(resolve => setTimeout(resolve, 500));

//         // In a real application, you would make a fetch call to your backend:
//         // const response = await fetch(`/api/services/${serviceId}`);
//         // if (!response.ok) {
//         //   throw new Error('Network response was not ok');
//         // }
//         // const data = await response.json();
//         // const service = data.service; // Assuming your API returns { service: ..., mentors: [...] }

//         // For this demo, find service by ID from local dummy data
//         const service = allServicesData.find(s => s.id === serviceId);

//         if (service) {
//           setServiceDetails(service);
//           // Filter mentors for this specific service ID from local dummy data
//           const mentorsForService = allMentorsData.filter(mentor => mentor.serviceId === serviceId);
//           setAvailableMentors(mentorsForService);
//         } else {
//           setError('Service not found.');
//         }
//       } catch (err) {
//         console.error("Failed to fetch service data:", err);
//         setError('Failed to load service details. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServiceData();
//   }, [serviceId]); // Re-run effect if serviceId changes

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 font-inter text-gray-800">
//         <div className="flex items-center text-xl font-medium text-blue-700">
//           <svg className="animate-spin h-6 w-6 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           Loading Service Details...
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 font-inter text-red-700 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-md text-center">
//           <h2 className="text-2xl font-bold mb-4">Error</h2>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!serviceDetails) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 font-inter text-gray-800 p-4">
//         <div className="bg-white p-6 rounded-lg shadow-md text-center">
//           <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
//           <p>The service you are looking for does not exist.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8 font-inter text-gray-800">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">

//         {/* Service Header */}
//         <div className="text-center mb-8">
//           <img
//             src={serviceDetails.imageUrl}
//             alt={serviceDetails.title}
//             className="w-full max-h-80 object-cover rounded-lg shadow-md mb-6"
//             onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/800x450/CCCCCC/000000?text=Image+Error`; }}
//           />
//           <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 leading-tight mb-4">
//             {serviceDetails.title}
//           </h1>
//           <p className="text-lg sm:text-xl text-gray-600 mb-6">
//             {serviceDetails.description}
//           </p>
//         </div>

//         {/* Detailed Description */}
//         <section className="mb-10">
//           <h2 className="text-3xl font-bold text-blue-800 mb-4">In-Depth Overview</h2>
//           <p className="text-gray-700 leading-relaxed text-md sm:text-lg">
//             {serviceDetails.longDescription || serviceDetails.description}
//             {/* Fallback to short description if longDescription is not provided */}
//           </p>
//           {/* Add more detailed content here if available, e.g., features, process */}
//         </section>

//         {/* Mentors Available Section */}
//         <section>
//           <h2 className="text-3xl font-bold text-blue-800 mb-6">Mentors Available for This Service</h2>
//           {availableMentors.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {availableMentors.map(mentor => (
//                 <div key={mentor.id} className="bg-blue-50 rounded-lg shadow-sm p-4 flex items-center space-x-4">
//                   <img
//                     src={mentor.avatar}
//                     alt={mentor.name}
//                     className="w-16 h-16 rounded-full object-cover border-2 border-blue-300"
//                     onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/CCCCCC/000000?text=P`; }}
//                   />
//                   <div>
//                     <h3 className="font-semibold text-blue-700 text-lg">{mentor.name}</h3>
//                     <p className="text-gray-600 text-sm">{mentor.title}</p>
//                     <p className="text-gray-500 text-xs italic">Expertise: {mentor.expertise}</p>
//                     <button className="mt-2 text-blue-600 hover:underline text-sm">View Profile</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-600 text-lg text-center">No specific mentors listed for this service yet. Check back soon!</p>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ServiceDetail



import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useServices } from '../context/ServiceContext'

const ServiceDetail = () => {
  const { servicesData } = useServices();
  const { id } = useParams();
  const serviceId = parseInt(id) || 1;

  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy mentor data (replace with your actual mentor data source)
  const allMentorsData = [
    { id: 1, name: "Sarah Johnson", title: "Career Advisor", expertise: "Tech Industry", serviceId: 1, avatar: "/images/mentor1.jpg" },
    { id: 2, name: "Michael Chen", title: "Senior Developer", expertise: "Software Engineering", serviceId: 1, avatar: "/images/mentor2.jpg" },
    { id: 3, name: "Priya Sharma", title: "HR Director", expertise: "Talent Acquisition", serviceId: 1, avatar: "/images/mentor3.jpg" },
    { id: 4, name: "David Wilson", title: "Project Manager", expertise: "Agile Methodologies", serviceId: 9, avatar: "/images/mentor4.jpg" },
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    try {
      // Find service by ID from context data
      const service = servicesData.find(s => s.id === serviceId);
      
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
  }, [serviceId, servicesData]);

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

  // Split ExplorePoints into an array
  const explorePoints = serviceDetails.ExplorePoints 
    ? serviceDetails.ExplorePoints.split(',').map(point => point.trim())
    : [];

  // Filter mentors for this service
  const availableMentors = allMentorsData.filter(mentor => mentor.serviceId === serviceId);

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-gray-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8 font-inter text-gray-800">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Service Header with Image */}
        <div className="relative">
          <div className="h-48 sm:h-64 w-full bg-gray-200 rounded-t-xl overflow-hidden">
            <img
              src={serviceDetails.imageUrl}
              alt={serviceDetails.title}
              className="w-full h-full object-cover"
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = `https://placehold.co/800x450/CCCCCC/000000?text=${encodeURIComponent(serviceDetails.title)}`; 
              }}
            />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {serviceDetails.title}
            </h1>
            <p className="text-white/90 max-w-2xl">
              {serviceDetails.description}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          {/* Enroll Now Button - Fixed position on mobile, normal on desktop */}
          <div className="sticky bottom-4 z-10 sm:static mb-8 sm:mb-10">
            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg sm:text-base">
              Enroll Now
            </button>
          </div>

          {/* Explore Points Section */}
          <section className="mb-10">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-800">What You'll Explore</h2>
              <div className="ml-4 flex-1 h-px bg-blue-200"></div>
            </div>
            
            {explorePoints.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {explorePoints.map((point, index) => (
                  <div 
                    key={index} 
                    className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-100"
                  >
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

          {/* Mentors Available Section */}
          <section>
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-800">Mentors Available</h2>
              <div className="ml-4 flex-1 h-px bg-blue-200"></div>
            </div>
            
            {availableMentors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableMentors.map(mentor => (
                  <div 
                    key={mentor.id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-4">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{mentor.name}</h3>
                          <p className="text-blue-600 text-sm">{mentor.title}</p>
                          <p className="text-gray-500 text-xs mt-1">Expertise: {mentor.expertise}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium w-full text-center">
                        View Profile &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-4">No specific mentors listed for this service yet.</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Request a Mentor &rarr;
                </button>
              </div>
            )}
          </section>
          
          {/* Additional Enroll Button at the bottom */}
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