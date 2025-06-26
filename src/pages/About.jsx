
// import React from "react";
// import handshakeImage from '/images/handshake.jpeg'

// const About = () => {
//   return (
//     <div className="bg-white px-6 py-12 md:py-20 md:px-20">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//         {/* Left - Text Content */}
//         <div>
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//             About MentorConnect
//           </h2>
//           <p className="text-lg text-gray-700 mb-4">
//             MentorConnect is a platform dedicated to connecting students and young professionals with experienced mentors across various industries. Our mission is to democratize access to mentorship and career guidance.
//           </p>
//           <p className="text-lg text-gray-700">
//             Founded in 2023, we've already helped thousands of mentees find the right guidance to achieve their goals. Our mentors are carefully vetted professionals who are passionate about sharing their knowledge and experience.
//           </p>

//           {/* Stats */}
//           <div className="mt-10 grid grid-cols-3 gap-4 text-center">
//             <div>
//               <p className="text-3xl font-bold text-blue-600">500+</p>
//               <p className="text-sm text-gray-600 mt-1">Expert Mentors</p>
//             </div>
//             <div>
//               <p className="text-3xl font-bold text-blue-600">10,000+</p>
//               <p className="text-sm text-gray-600 mt-1">Satisfied Mentees</p>
//             </div>
//             <div>
//               <p className="text-3xl font-bold text-blue-600">25,000+</p>
//               <p className="text-sm text-gray-600 mt-1">Mentorship Sessions</p>
//             </div>
//           </div>
//         </div>

//         {/* Right - Image */}
//         <div className="rounded-2xl overflow-hidden shadow-lg">
//           <img
//             src={`${handshakeImage}` }// Replace with your correct image path
//             alt="Mentorship handshake"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;


import React from "react";
import handshakeImage from '/images/handshake.jpeg';

const About = () => {
  return (
    <div className="bg-white px-6 py-12 md:py-20 md:px-20">
      {/* Existing About Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
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
            src={`${handshakeImage}`}
            alt="Mentorship handshake"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Brand Declaration Section */}
      <div className="max-w-4xl mx-auto mt-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Official Brand Declaration</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600">VR Industries legal declaration for Mentors.ind.in</p>
        </div>
        
        {/* Document Container */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          {/* Document Header */}
          <div className="bg-blue-900 text-white py-6 px-8">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                {/* <h1 className="text-2xl md:text-3xl font-bold">VR INDUSTRIES</h1> */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg   ">
                  <img src="./images/companyLogo.jpg" alt="VR Industries" className="w-full h-full object-contain" />
                  
                  </div>
                <p className="text-sm opacity-80 mt-1">Registered Entity since 2018</p>
              </div>
              <div className="text-right">
                <p className="text-xs md:text-sm">Brand Declaration Letter</p>
                <p className="text-xs opacity-80 mt-1">Official Document</p>
              </div>
            </div>
          </div>
          
          {/* Document Content */}
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <p className="font-medium text-gray-700">Registered Office:</p>
              <p className="text-gray-600">
                Plot No. 46, Harfala Road, Opp. Petrol Pump,<br />
                Sikari, Ballabgarh, Haryana - 121004
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> vivekvats1986@gmail.com
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> 9717793236
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mb-6">
              <p className="mb-4">To Whom It May Concern,</p>
              
              <p className="mb-4">
                This is to officially declare that:
              </p>
              
              <p className="mb-4">
                <span className="font-bold">Mentors.ind.in</span> is a brand initiative wholly owned and operated by <span className="font-bold">VR Industries</span>, a registered entity engaged in diversified business activities. This initiative is focused on delivering mentorship, career guidance, and skill development support for students and young professionals across India.
              </p>
              
              <p className="mb-4">
                All operations including billing, taxation, financial transactions, and legal responsibilities related to Mentors.ind.in are managed under the name of VR Industries.
              </p>
              
              <p className="mb-4">
                For any official communication, invoicing, or partnership, the legal entity name to be considered is VR Industries.
              </p>
              
              <p className="mb-4">
                We appreciate your trust in our vision and look forward to building strong collaborations under this brand.
              </p>
            </div>
            
            <div className="mt-10">
              <p>Warm Regards,</p>
              
              <div className="mt-6 flex flex-wrap gap-8">
                <div>
                  <div className="border-b border-gray-300 pb-2 mb-2 w-48"></div>
                  <p className="font-bold">Vivek Sharma</p>
                  <p>Proprietor -- VR Industries</p>
                </div>
                
                <div className="mt-4 sm:mt-0">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> vivekvats1986@gmail.com<br />
                    <span className="font-medium">Phone:</span> 9717793236<br />
                    <span className="font-medium">Website:</span> www.mentors.ind.in
                  </p>
                </div>
              </div>
              
              {/* <div className="mt-8 flex justify-end">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              </div> */}
            </div>
          </div>
          
          {/* Document Footer */}
          <div className="bg-gray-50 py-4 px-8 border-t border-gray-200">
            <div className="flex flex-wrap justify-between items-center text-sm text-gray-500">
              <p>VR Industries - Official Document</p>
              <p>Document ID: VR-BRAND-2023-001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;







