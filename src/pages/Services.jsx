

import React from 'react'
import ServiceCard from '../components/ServiceCard'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useServices } from '../context/ServiceContext'
import { useEffect } from 'react'
import seedCoursesToBackend from '../constants/seed'

const Services = () => {

  const { servicesData } = useServices();
  //console.log(servicesData);
  const navigate = useNavigate();

// useEffect(() => {
//   const putData = async () => {
//     await seedCoursesToBackend(servicesData);
//   };

//   putData(); // ← This is the missing function call
// }, []);
 

  // Function to handle the button click and send data to backend
  const handleServiceButtonClick = async (id) => {
    console.log(`Button clicked for service: ${id}`);
    navigate(`/services/detail/${id}`)
    
    // Simulate sending data to a backend
   
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-6 from-gray-50 to-blue-100 py-8 px-4 font-inter">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-800 mb-12 mt-8">
        Our Mentorship Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 hover:cursor-pointer">
        {servicesData.map((service) => (
          <ServiceCard
            key={service._id}
            imageUrl={service.thumbnail}
            title={service.title}
            description={service.description}
            buttonText="Explore"
            onButtonClick={()=>handleServiceButtonClick(service._id)} // Pass the handler to the ServiceCard
          />
        ))}
      </div>
    </div>
  )
}

export default Services

