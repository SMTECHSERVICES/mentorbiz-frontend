export default function Services() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Mentorship for:</h2>
      <ul className="list-disc list-inside space-y-4 text-lg">
        <li>
          <strong>Students:</strong> Career Guidance, Internship Help, Stream Selection
        </li>
        <li>
          <strong>Working Professionals:</strong> Skill Upgrade, Promotion Strategy, Domain Shift
        </li>
        <li>
          <strong>Job Seekers:</strong> Interview Prep, Resume Review, Job Hunting
        </li>
        <li>
          <strong>Entrepreneurs:</strong> Business Model Mentorship, Funding Advice, Market Strategy
        </li>
      </ul>
      <div className="mt-6 space-x-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Book a Free Session</button>
        <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">See Mentors by Category</button>
      </div>
    </div>
  );
}
