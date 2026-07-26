import { useState } from "react";
import axios from "axios";
import { server } from "../constants/api";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post(`${server}/contact`, formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Error submitting form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mt-2.5 mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Contact Us</h2>

      <div className="mb-6 text-center space-y-2 text-gray-700">
        <p>Email: <a href="mailto:info@mentors.ind.in" className="text-blue-600 underline">info@mentors.ind.in</a></p>
        <p>Phone: <a href="tel:+918383952262" className="text-blue-600 underline">+91 8383952262</a></p>
      </div>

      {submitted ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-green-600 font-semibold">✅ Message sent! We'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
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
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border p-2 rounded"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </section>
  );
}
