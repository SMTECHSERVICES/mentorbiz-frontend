import React from 'react'
import { Link } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

import hero from '/images/homebanner.jpg'

const CurrentEvent = () => {
  return (
   <>
      <section
       
         className="bg-cover bg-center bg-no-repeat relative h-screen flex items-center"
         style={{ backgroundImage: `url(${hero})` }}
       >
         {/* Overlay */}
         <div className="absolute inset-0 bg-[white]/60 bg-opacity-90"></div>
   
         <div className="relative z-10 w-full text-center px-6">
           <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
         Current Events & Opportunities
           </h2>
           <p className="text-lg md:text-xl text-black mb-10 max-w-3xl mx-auto">
Stay updated with our latest seminars, workshops, mentorship sessions, and career-driven events—all designed to help you grow personally and professionally. Whether you're looking to upskill, connect with experts, or explore new career paths, this is the place to start. Don’t miss out—register now and take a step forward in your journey.
           </p>
{/*    
           <div className="flex justify-center gap-6 flex-wrap">
              <Link
               to="/internship"
               className="flex items-center gap-2 bg-[#465ADA] hover:bg-[#e62d5b] text-white font-semibold px-6 py-3 rounded-lg transition"
             >
               <FaUserGraduate className="text-xl" />
               Internships
             </Link>
               <Link
               to="/jobs"
               className="flex items-center gap-2 bg-[#465ADA] hover:bg-[#e62d5b] text-white font-semibold px-6 py-3 rounded-lg transition"
             >
               <FaUserGraduate className="text-xl" />
             Jobs
             </Link>
             <Link
               to="/live-project"
               className="flex items-center gap-2 bg-[#465ADA] hover:bg-[#e62d5b] text-white font-semibold px-6 py-3 rounded-lg transition"
             >
               <FaChalkboardTeacher className="text-xl" />
              Live Projects
             </Link>
           
           </div> */}
           
         </div>
        
       </section>
   </>
  )
}

export default CurrentEvent
