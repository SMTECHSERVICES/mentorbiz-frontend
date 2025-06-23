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

const Services = () => {
  const navigate = useNavigate();
  const [servicesData, setServicesData] = useState([
    {
      id: 1,
      imageUrl: '/images/Career Development.jpg',
      title: 'Career Development',
      description: 'Get personalized advice on career paths, industry trends, and professional development from experienced mentors.',
      buttonText: 'Explore',
    },
    {
      id: 2,
      imageUrl: '/images/Technical Skills.png',
      title: 'Technical Skills',
      description: 'Enhance your coding, software engineering, and other technical abilities with guidance from industry experts.',
      buttonText: 'Explore',
    },
    {
      id: 3,
      imageUrl: '/images/Leadership Coaching.png',
      title: 'Leadership Coaching',
      description: 'Develop strong leadership qualities, management techniques, and team-building strategies for effective leadership.',
      buttonText: 'Explore',
    },
    {
      id: 4,
      imageUrl: '/images/Interview Preparation.png',
      title: 'Interview Preparation',
      description: 'Master interview techniques, mock interviews, and resume optimization to land your dream job.',
      buttonText: 'Explore',
    },
    {
      id: 5,
      imageUrl: '/images/Resume Review.png',
      title: 'Resume Review',
      description: 'Receive expert feedback on your resume and cover letter to make them stand out to recruiters.',
      buttonText: 'Explore',
    },
    {
      id: 6,
      imageUrl: '/images/Entrepreneurship.jpg',
      title: 'Entrepreneurship',
      description: 'Get insights and guidance on starting, funding, and scaling your own business from successful entrepreneurs.',
      buttonText: 'Explore',
    },
    {
      id: 7,
      imageUrl: '/images/Industry Networking.jpg',
      title: 'Industry Networking',
      description: 'Learn effective networking strategies and connect with professionals in your target industry.',
      buttonText: 'Explore',
    },
    {
      id: 8,
      imageUrl: '/images/Academic Guidance.jpg',
      title: 'Academic Guidance',
      description: 'Receive support for academic choices, study strategies, and navigating educational paths for success.',
      buttonText: 'Explore',
    },
    {
      id: 9,
      imageUrl: '/images/Project Management.jpg',
      title: 'Project Management',
      description: 'Master the principles of project planning, execution, and closure with guidance from certified project managers.',
      buttonText: 'Explore',
    },
    {
      id: 10,
      imageUrl: '/images/Personal Branding.png',
      title: 'Personal Branding',
      description: 'Build a strong personal brand that highlights your unique skills and value in the professional world.',
      buttonText: 'Explore',
    },
    {
      id: 11,
      imageUrl: '/images/Career Transition.jpg',
      title: 'Career Transition',
      description: 'Navigate career changes smoothly with advice on identifying new opportunities and adapting to new roles.',
      buttonText: 'Explore',
    },
    {
      id: 12,
      imageUrl: '/images/Startup Advising.png',
      title: 'Startup Advising',
      description: 'Receive strategic guidance for your startup, from business model development to fundraising and growth.',
      buttonText: 'Explore',
    },
  ]);

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
            buttonText={service.buttonText}
            onButtonClick={()=>handleServiceButtonClick(service.id)} // Pass the handler to the ServiceCard
          />
        ))}
      </div>
    </div>
  )
}

export default Services

