import { useState } from "react";
import axios from "axios";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Replace below URL with your backend endpoint
      await axios.post("http://localhost:5000/api/contact", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Error submitting form. Please try again later.");
    }
  };

  return (
    <section className="max-w-md mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Contact Us</h2>

      <div className="mb-6 text-center space-y-2 text-gray-700">
        <p>Email: <a href="mailto:support@mentorconnectbiz.com" className="text-blue-600 underline">support@mentorconnectbiz.com</a></p>
        <p>Phone: <a href="tel:+911234567890" className="text-blue-600 underline">+91 12345 67890</a></p>
      </div>

      {submitted ? (
        <p className="text-green-600 font-semibold text-center">
          Thank you! We'll get back to you soon.
        </p>
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
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      )}
    </section>
  );
}
