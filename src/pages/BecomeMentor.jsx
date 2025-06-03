import { useState } from "react";

export default function BecomeMentor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    expertise: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later: send to backend API
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", linkedin: "", expertise: "" });
  };

  return (
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Become a Mentor
      </h2>

      <div className="mb-8 text-center">
        <p className="text-lg text-gray-600">
          Share your experience and earn while guiding the next generation.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center text-sm text-gray-500">
          <div>
            <p className="text-2xl font-bold text-green-600">+500</p>
            <p>Mentorship Sessions Completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">+120</p>
            <p>Active Mentors</p>
          </div>
        </div>
      </div>

      {submitted ? (
        <p className="text-green-700 font-semibold text-center">
          Thanks for joining! Our team will contact you shortly.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn Profile URL"
            value={formData.linkedin}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="expertise"
            placeholder="Briefly describe your mentoring expertise"
            value={formData.expertise}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
          >
            Submit Application
          </button>
        </form>
      )}
    </section>
  );
}
