


// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield } from 'react-icons/fa';
import { useServices } from '../context/ServiceContext';
import { server } from '../constants/api';
const Login = () => {
  const {  login} = useServices(); // 🔐 get auth from context
  const navigate = useNavigate();
  const [userType, setUserType] = useState('mentee'); // 'mentee', 'mentor', or 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      
      if(userType==="admin"){
        try {
          const response = await axios.post(`${server}/admin/login`,{email,password},{withCredentials:true});
          // localStorage.setItem("role",response?.data?.admin?.role)
          // localStorage.setItem("token",response?.data?.token);
          login(response?.data?.token,response?.data?.admin?.role)
          alert(response?.data?.message);
          navigate('/admin/dashboard')

        } catch (error) {
          console.log(error);
          alert("something went wrong")
        }

      }else{
      const respnse = await axios.post(`${server}/${userType}/login`,{email,password},{withCredentials:true});
      login(respnse?.data?.token,respnse.data.role)
        // localStorage.setItem("role",respnse.data.role);
        // localStorage.setItem("token",respnse?.data?.token);
        navigate(`/${userType}/dashboard`)
      }

     
     

      // Handle success (store token, redirect, etc.)
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center mt-15 p-4">
      <div className="w-full max-w-md">
        {/* Title */}
        <div className="text-center mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to continue your mentorship journey</p>
        </div>

        {/* User Type Toggle */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="flex">
            {[
              { label: 'Mentee Login', value: 'mentee', icon: <FaUserGraduate className="h-5 w-5" /> },
              { label: 'Mentor Login', value: 'mentor', icon: <FaChalkboardTeacher className="h-5 w-5" /> },
              { label: 'Admin Login', value: 'admin', icon: <FaUserShield className="h-5 w-5" /> },
            ].map(({ label, value, icon }) => (
              <button
                key={value}
                onClick={() => setUserType(value)}
                className={`flex-1 py-3 px-2 text-center font-medium transition-colors text-sm sm:text-base ${
                  userType === value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {icon}
                  <span>{label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  `Sign in as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`
                )}
              </button>
            </form>
          </div>

          {/* Register links */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600">Don't have an account? Register as:</p>
              <div className="mt-4 flex justify-center space-x-4">
                <Link
                  to="/mentee-registraion"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaUserGraduate className="-ml-1 mr-2 h-5 w-5" />
                  Mentee
                </Link>
                <Link
                  to="/mentor-registration"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaChalkboardTeacher className="-ml-1 mr-2 h-5 w-5" />
                  Mentor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
