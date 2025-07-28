import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { server } from '../constants/api';

const RequestMentor = () => {
  const { state: mentor } = useLocation();
  const [result, setResult] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult('Sending...');

    try {
      // 1. Web3Forms data
      const web3FormData = new FormData();
      web3FormData.append('access_key', import.meta.env.VITE_WEB3_ACCESS_KEY);
      web3FormData.append('subject', 'New Mentor Request');
      web3FormData.append('Mentor Name', mentor.fullName);
      web3FormData.append('name', formData.name);
      web3FormData.append('email', formData.email);
      web3FormData.append('phone', formData.phone);
      web3FormData.append('message', formData.reason);

      // 2. Create both requests
      const web3FormRequest = fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData,
      });

      const backendRequest = axios.post(
        `${server}/mentee/request-mentor/${mentor._id}`,
        {},
        { withCredentials: true }
      );

      // 3. Execute both in parallel
      const [web3Res, backendRes] = await Promise.all([web3FormRequest, backendRequest]);

      const web3Data = await web3Res.json();
      if (!web3Data.success) {
        throw new Error('Web3Forms error: ' + web3Data.message);
      }

      setResult('Mentor request submitted successfully! our Team will contact you shortly');
      setFormData({
        name: '',
        email: '',
        phone: '',
        reason: '',
      });
    } catch (error) {
      console.error('Submission Error:', error);
      setResult('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="max-w-xl mt-15 mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Connect with {mentor?.fullName}
      </h2>
      <form onSubmit={onSubmit} className="space-y-6 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Why do you want to connect?</label>
          <textarea
            name="reason"
            required
            value={formData.reason}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Send Request
        </button>
      </form>

      {result && (
        <div className="mt-4 text-center text-sm text-blue-600">
          {result}
        </div>
      )}
    </div>
  );
};

export default RequestMentor;
