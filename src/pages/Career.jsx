import React from 'react'
import { Link } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

import hero from '/images/homebanner.jpg'
const Career = () => {
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
          Empower Careers Through Mentorship
           </h2>
           <p className="text-lg md:text-xl text-black mb-10 max-w-3xl mx-auto">
             Join a purpose-driven network where mentorship transforms careers. Whether you're guiding others or growing yourself, MentorConnect offers meaningful opportunities to make an impact. Start your journey with us today.
           </p>
   
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
           
           </div>
           
         </div>
        
       </section>
   </>
  )
}

export default Career
