
import React from "react";
import handshakeImage from '/images/handshake.jpeg'

const About = () => {
  return (
    <div className="bg-white px-6 py-12 md:py-20 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left - Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About MentorConnect
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            MentorConnect is a platform dedicated to connecting students and young professionals with experienced mentors across various industries. Our mission is to democratize access to mentorship and career guidance.
          </p>
          <p className="text-lg text-gray-700">
            Founded in 2023, we've already helped thousands of mentees find the right guidance to achieve their goals. Our mentors are carefully vetted professionals who are passionate about sharing their knowledge and experience.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">500+</p>
              <p className="text-sm text-gray-600 mt-1">Expert Mentors</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">10,000+</p>
              <p className="text-sm text-gray-600 mt-1">Satisfied Mentees</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">25,000+</p>
              <p className="text-sm text-gray-600 mt-1">Mentorship Sessions</p>
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={`${handshakeImage}` }// Replace with your correct image path
            alt="Mentorship handshake"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
