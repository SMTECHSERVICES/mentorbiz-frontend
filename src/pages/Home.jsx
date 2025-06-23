// import { Link } from 'react-router-dom';

// export default function Home() {
//   return (
//     <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-4">
//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
//         {/* Left Content */}
//         <div className="md:w-1/2 text-center md:text-left">
//           <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
//             Right Mentor, Right Guidance, Right Time
//           </h1>
//           <p className="text-lg text-gray-700 mb-6">
//             Get mentored by industry professionals from top MNCs.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//             <Link to="/find-mentor">
//               <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//                 Explore Mentors
//               </button>
//             </Link>
//             <Link to="/become-mentor">
//               <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
//                 Become a Mentor
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Right Image/Visual */}
//         <div className="md:w-1/2 flex justify-center">
//           <img
//             src="/images/menuimg1.jpg"
//             alt="Mentorship Illustration"
//             className="w-80 md:w-96 rounded-2xl"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }
import { Link } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import About from "./About";
import hero from '/images/homebanner.jpg'
import WhyChooseUs from "../components/WhyChooseUs";
import Services from "./Services";

const Home = () => {
  return (
    <>
    <section
    
      className="bg-cover bg-center bg-no-repeat relative h-screen flex items-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[white]/60 bg-opacity-90"></div>

      <div className="relative z-10 w-full text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
          Unlock Your Potential with <br /> Expert Guidance
        </h1>
        <p className="text-lg md:text-xl text-black mb-10 max-w-3xl mx-auto">
          Connect with industry professionals who can help you navigate your career path,
          develop skills, and achieve your goals through personalized mentorship.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
            <Link
            to="/mentee-registraion"
            className="flex items-center gap-2 bg-[#FF3366] hover:bg-[#e62d5b] text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            <FaUserGraduate className="text-xl" />
            Mentee Registration
          </Link>
          <Link
            to="/mentor-registration"
            className="flex items-center gap-2 bg-[#465ADA] hover:bg-[#3651d1] text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            <FaChalkboardTeacher className="text-xl" />
            Mentor Registration
          </Link>
        
        </div>
        
      </div>
     
    </section>
    <WhyChooseUs />
    <About />
    <Services />
    </>
  );
};

export default Home;
