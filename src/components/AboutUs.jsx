export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Our Mission is to Empower through Mentorship</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src="/vivek-sharma.jpg"
          alt="Vivek Sharma"
          className="w-48 h-48 rounded-full object-cover"
        />
        <div>
          <p className="mb-4 text-lg leading-relaxed">
            MentorConnectBiz.com is a startup founded by Vivek Sharma with a vision to bridge the gap between ambition and expertise. Whether you're a student, working professional, job seeker, or entrepreneur, we connect you with mentors from top MNCs across diverse fields to help you grow.
          </p>
          <p className="italic font-semibold">— Vivek Sharma, Founder</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-3">Our Vision Timeline</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>2023: Conceptualized the mentorship platform</li>
          <li>2024: Built first version and onboarded mentors</li>
          <li>2025: Expand services across industries & geographies</li>
        </ul>
      </div>
    </div>
  );
}
