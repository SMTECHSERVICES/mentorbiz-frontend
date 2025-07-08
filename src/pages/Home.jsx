

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
