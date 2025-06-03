import { useState } from "react";

const mockMentors = [
  {
    name: "Anita Verma",
    designation: "Senior Software Engineer",
    company: "Google",
    industry: "IT",
    experience: "5-10 yrs",
  },
  {
    name: "Rohan Mehta",
    designation: "HR Manager",
    company: "TCS",
    industry: "HR",
    experience: "10+ yrs",
  },
  {
    name: "Sneha Gupta",
    designation: "Marketing Head",
    company: "Amazon",
    industry: "Marketing",
    experience: "3-5 yrs",
  },
];

export default function FindMentor() {
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [company, setCompany] = useState("");

  const filteredMentors = mockMentors.filter((mentor) => {
    return (
      (!industry || mentor.industry === industry) &&
      (!experience || mentor.experience === experience) &&
      (!company || mentor.company.toLowerCase().includes(company.toLowerCase()))
    );
  });

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Find a Mentor</h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="border p-2 rounded w-full md:w-1/4"
          >
            <option value="">Filter by Industry</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>

          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="border p-2 rounded w-full md:w-1/4"
          >
            <option value="">Filter by Experience</option>
            <option value="3-5 yrs">3-5 yrs</option>
            <option value="5-10 yrs">5-10 yrs</option>
            <option value="10+ yrs">10+ yrs</option>
          </select>

          <input
            type="text"
            placeholder="Search by Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border p-2 rounded w-full md:w-1/4"
          />
        </div>

        {/* Mentor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor, index) => (
            <div key={index} className="bg-white p-6 shadow rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">{mentor.name}</h3>
              <p className="text-gray-600">{mentor.designation} at {mentor.company}</p>
              <p className="text-sm text-gray-500">{mentor.industry} · {mentor.experience}</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Book Session
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
