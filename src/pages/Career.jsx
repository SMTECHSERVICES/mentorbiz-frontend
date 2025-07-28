import React from 'react';
import { Link } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

const Career = () => {
  return (
    <>
      <section className="bg-gradient-to-r from-blue-500 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-5xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Empower Careers Through Mentorship
          </h2>

          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Join a purpose-driven network where mentorship transforms careers.
            Whether you're guiding others or growing yourself, MentorConnect
            offers meaningful opportunities to make an impact.
            Start your journey with us today.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/internship"
              className="flex items-center gap-2 bg-[#465ADA] hover:bg-[#e62d5b] text-white font-semibold px-6 py-3 rounded-lg transition duration-300 shadow-md"
            >
              <FaUserGraduate className="text-xl" />
              Internships
            </Link>

            <Link
              to="/jobs"
              className="flex items-center gap-2 bg-[#465ADA] hover:bg-[#e62d5b] text-white font-semibold px-6 py-3 rounded-lg transition duration-300 shadow-md"
            >
              <FaUserGraduate className="text-xl" />
              Jobs
            </Link>

            <Link
              to="/live-project"
              className="flex items-center gap-2 bg-[#465ADA] hover:bg-[#e62d5b] text-white font-semibold px-6 py-3 rounded-lg transition duration-300 shadow-md"
            >
              <FaChalkboardTeacher className="text-xl" />
              Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Career;
