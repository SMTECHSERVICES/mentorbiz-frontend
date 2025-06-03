import { useState } from 'react';
import axios from 'axios';

export default function BecomeMentor() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedinProfile: '',
    experience: '',
    industry: '',
    bio: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/mentor-application', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', linkedinProfile: '', experience: '', industry: '', bio: '' });
    } catch {
      alert('Error submitting application');
    }
  };

  if (submitted) {
    return <p className="max-w-md mx-auto p-6 text-green-600 text-center">Thank you for applying as a mentor. We will contact you soon.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Become a Mentor</h2>
      <p className="mb-4 italic text-gray-600">
        Share your experience and earn while guiding the next generation.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="url"
          name="linkedinProfile"
          placeholder="LinkedIn Profile URL"
          value={formData.linkedinProfile}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="experience"
          placeholder="Years of Experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          min="0"
        />
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="3"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Apply</button>
      </form>
    </div>
  );
}
