// src/components/WhyChooseUs.jsx
import {
  FaHandshake,
  FaChartLine,
  FaNetworkWired,
  FaUserClock,
} from "react-icons/fa";

const features = [
  {
    Icon: FaHandshake,
    title: "Personalized Matching",
    text: "Our algorithm matches you with mentors based on your goals, interests, and personality.",
  },
  {
    Icon: FaChartLine,
    title: "Career Growth",
    text: "Gain insights and advice to accelerate your career progression and skill development.",
  },
  {
    Icon: FaNetworkWired,
    title: "Networking",
    text: "Expand your professional network through connections with mentors and peers.",
  },
  {
    Icon: FaUserClock,
    title: "Flexible Scheduling",
    text: "Schedule sessions at your convenience with mentors from around the world.",
  },
];

const WhyChooseUs = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      {/* heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
        Why Choose MentorConnect?
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mt-4 mb-16">
        We provide a comprehensive platform that bridges the gap between aspiring
        professionals and experienced mentors.
      </p>

      {/* feature cards */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ Icon, title, text }) => (
          <div
            key={title}
            className="bg-white rounded-3xl p-10 text-center shadow-md hover:shadow-xl transition"
          >
            <Icon className="text-4xl text-[#465ADA] mb-6 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
