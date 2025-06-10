export default function About() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Our Mission is to Empower through Mentorship
        </h2>

        <p className="text-lg text-gray-700 text-center mb-10">
          <strong>Mentors India</strong> is a startup founded by <strong>Vivek Sharma</strong> 
          with a vision to bridge the gap between ambition and expertise.
          Whether you're a student, working professional, job seeker, or entrepreneur,
          we connect you with mentors from top MNCs across diverse fields to help you grow.
        </p>

        {/* Founder Image and Note (optional) */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
          <img
            src="/images/vivek-sharma.png"
            alt="Founder Vivek Sharma"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
          <div>
            <p className="text-gray-800 font-medium">Vivek Sharma</p>
            <p className="text-sm text-gray-600">Founder, Mentor India</p>
            <p className="mt-2 text-gray-600">
              “I believe the right mentor can change the direction of your career or business. 
              Through Mentors India, our goal is to ensure no ambition goes unsupported.”
            </p>
          </div>
        </div>

        {/* Timeline Vision */}
        <div className="bg-blue-50 p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Our Vision Timeline</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>🎯 2023 – Conceptualized with the need for structured mentorship in India.</li>
            <li>🚀 2024 – Launched MVP with 100+ mentors onboarded.</li>
            <li>🌐 2025 – Expanding mentorship categories and tech platform globally.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
