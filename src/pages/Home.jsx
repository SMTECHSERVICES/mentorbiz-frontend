import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
            Right Mentor, Right Guidance, Right Time
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Get mentored by industry professionals from top MNCs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/find-mentor">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Explore Mentors
              </button>
            </Link>
            <Link to="/become-mentor">
              <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                Become a Mentor
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image/Visual */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/images/menuimg1.jpg"
            alt="Mentorship Illustration"
            className="w-80 md:w-96 rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
