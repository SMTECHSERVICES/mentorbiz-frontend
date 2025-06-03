import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MentorList() {
  const [mentors, setMentors] = useState([]);
  const [filters, setFilters] = useState({ industry: '', minExperience: '', maxExperience: '', company: '' });

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const params = {};
        if (filters.industry) params.industry = filters.industry;
        if (filters.minExperience) params.minExperience = filters.minExperience;
        if (filters.maxExperience) params.maxExperience = filters.maxExperience;
        if (filters.company) params.company = filters.company;

        const res = await axios.get('http://localhost:5000/api/mentors', { params });
        setMentors(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMentors();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Find a Mentor</h2>

      <div className="flex space-x-4 mb-6">
        <select name="industry" value={filters.industry} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Industry</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
        </select>

        <input
          type="number"
          name="minExperience"
          placeholder="Min Experience (years)"
          value={filters.minExperience}
          onChange={handleChange}
          className="border p-2 rounded w-48"
        />
        <input
          type="number"
          name="maxExperience"
          placeholder="Max Experience (years)"
          value={filters.maxExperience}
          onChange={handleChange}
          className="border p-2 rounded w-48"
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={filters.company}
          onChange={handleChange}
          className="border p-2 rounded w-48"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mentors.map((mentor) => (
          <div key={mentor._id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{mentor.name}</h3>
            <p>{mentor.designation} at {mentor.company}</p>
            <p>Industry: {mentor.industry}</p>
            <p>Experience: {mentor.experience} years</p>
            <button className="mt-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Book Session</button>
          </div>
        ))}
      </div>
    </div>
  );
}
