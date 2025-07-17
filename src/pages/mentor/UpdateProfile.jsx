import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { server } from "../../constants/api";
import axios from "axios";

const UpdateProfile = () => {
  const { state: passedData } = useLocation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: passedData?.fullName || "",
    email: passedData?.email || "",
    phoneNumber: passedData?.phoneNumber || "",
    currentJob: passedData?.currentJob || "",
    description: passedData?.description || "",
    areaofMentorship: passedData?.areaofMentorship || [],
  });

  const [profilePic, setProfilePic] = useState(null);
  const [resume, setResume] = useState(null);
  const [previewPic, setPreviewPic] = useState(
    passedData?.profilePicture || "/default-avatar.png"
  );
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const mentorshipOptions = [
    "Supply Chain Management",
    "Career Development",
    "Technical Skills",
    "Leadership Coaching",
    "Interview Preparation",
    "Resume Review",
    "Entrepreneurship",
    "Industry Networking",
    "Academic Guidance",
    "Project Management",
    "Personal Branding",
    "Career Transition",
    "Startup Advising",
  ];

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) setResume(file);
  };

  const handleRemoveTag = (index) => {
    setProfile((prev) => ({
      ...prev,
      areaofMentorship: prev.areaofMentorship.filter((_, i) => i !== index),
    }));
  };

  const handleCheckboxChange = (option) => {
    setProfile((prev) => ({
      ...prev,
      areaofMentorship: prev.areaofMentorship.includes(option)
        ? prev.areaofMentorship.filter((item) => item !== option)
        : [...prev.areaofMentorship, option],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullName", profile.fullName);
      formData.append("email", profile.email);
      formData.append("phoneNumber", profile.phoneNumber);
      formData.append("currentJob", profile.currentJob);
      formData.append("description", profile.description);
      profile.areaofMentorship.forEach((tag) =>
        formData.append("mentorshipInterests[]", tag)
      );
      if (profilePic) formData.append("profilePicture", profilePic);
      if (resume) formData.append("resume", resume);

      await axios.put(`${server}/mentor/update-profile`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Profile updated successfully!");
      alert('Your profile updated successfully')
       navigate("/mentor/dashboard");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to update profile.");
      alert("Failed to update")
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Update Mentor Profile</h2>

          {message && (
            <div
              className={`mb-4 p-3 rounded text-sm font-medium ${
                message.includes("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            encType="multipart/form-data"
          >
            {/* Profile Image */}
            <div className="col-span-1 flex flex-col items-center">
              <img
                src={previewPic}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-indigo-500 mb-4"
              />

              <label className="block w-full">
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Profile Picture
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                />
              </label>
            </div>

            {/* Form Fields */}
            <div className="col-span-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Current Job</label>
                <input
                  type="text"
                  name="currentJob"
                  value={profile.currentJob}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Description */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">About You</label>
              <textarea
                name="description"
                value={profile.description}
                onChange={handleChange}
                rows="4"
                className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Areas of Mentorship */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Mentorship</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {mentorshipOptions.map((option, idx) => (
                  <label key={idx} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={profile.areaofMentorship.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>

              {profile.areaofMentorship.length > 0 && (
                <div className="flex flex-wrap mt-4 gap-2">
                  {profile.areaofMentorship.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(idx)}
                        className="ml-2 text-red-500 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Resume Upload */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Resume (PDF)
              </label>

              {passedData?.resume && (
                <p className="mb-2 text-sm text-blue-600">
                  Current Resume:{" "}
                  <a
                    href={passedData.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-800"
                  >
                    View Resume
                  </a>
                </p>
              )}

              <input
                type="file"
                accept=".pdf"
                onChange={handleResumeChange}
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 text-right pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded shadow"
              >
                {loading ? "Updating..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
