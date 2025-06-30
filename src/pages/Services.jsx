// export default function Services() {
//   return (
//     <section className="py-16 px-4 bg-gray-50">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
//           Our Mentorship Services
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Students */}
//           <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold text-blue-600 mb-2">For Students</h3>
//             <ul className="list-disc list-inside text-gray-700 space-y-1">
//               <li>Career Guidance</li>
//               <li>Internship Help</li>
//               <li>Stream Selection</li>
//             </ul>
//           </div>

//           {/* Working Professionals */}
//           <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold text-green-600 mb-2">For Working Professionals</h3>
//             <ul className="list-disc list-inside text-gray-700 space-y-1">
//               <li>Skill Upgrade</li>
//               <li>Promotion Strategy</li>
//               <li>Domain Shift</li>
//             </ul>
//           </div>

//           {/* Job Seekers */}
//           <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold text-purple-600 mb-2">For Job Seekers</h3>
//             <ul className="list-disc list-inside text-gray-700 space-y-1">
//               <li>Interview Preparation</li>
//               <li>Resume Review</li>
//               <li>Job Hunting Support</li>
//             </ul>
//           </div>

//           {/* Entrepreneurs */}
//           <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
//             <h3 className="text-xl font-semibold text-red-600 mb-2">For Entrepreneurs</h3>
//             <ul className="list-disc list-inside text-gray-700 space-y-1">
//               <li>Business Model Mentorship</li>
//               <li>Funding Advice</li>
//               <li>Market Strategy</li>
//             </ul>
//           </div>
//         </div>

//         {/* CTA Buttons */}
//         <div className="text-center mt-12 space-x-4">
//           <a href="/find-mentor">
//             <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//               Book a Free Session
//             </button>
//           </a>
//           <a href="/find-mentor">
//             <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900">
//               See Mentors by Category
//             </button>
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }


import React from 'react'
import ServiceCard from '../components/ServiceCard'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useServices } from '../context/ServiceContext'

const Services = () => {

  const { servicesData } = useServices();
  const navigate = useNavigate();
 

  // Function to handle the button click and send data to backend
  const handleServiceButtonClick = async (id) => {
    console.log(`Button clicked for service: ${id}`);
    navigate(`/services/detail/${id}`)
    
    // Simulate sending data to a backend
   
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-8 px-4 font-inter">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-800 mb-12 mt-8">
        Our Mentorship Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 hover:cursor-pointer">
        {servicesData.map((service) => (
          <ServiceCard
            key={service.id}
            imageUrl={service.imageUrl}
            title={service.title}
            description={service.description}
            buttonText="Explore"
            onButtonClick={()=>handleServiceButtonClick(service.id)} // Pass the handler to the ServiceCard
          />
        ))}
      </div>
    </div>
  )
}

export default Services

