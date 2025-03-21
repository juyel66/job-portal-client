import { useLoaderData } from "react-router-dom";

const JobDetails = () => {
  const job = useLoaderData();

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      {/* Company Logo & Job Title */}
      <div className="flex items-center space-x-4">
        <img
          src={job.company_logo}
          alt={job.company}
          className="w-24 h-24 rounded-full object-cover" // Image Size Increased
        />
        <div>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-gray-500">{job.company}</p>
        </div>
      </div>

      {/* Job Info */}
      <div className="mt-4 space-y-2 text-gray-700">
        <p><strong>📍 Location:</strong> {job.location}</p>
        <p><strong>🛠 Job Type:</strong> {job.jobType}</p>
        <p><strong>💰 Salary:</strong> {job.salaryRange.min} - {job.salaryRange.max} {job.salaryRange.currency}</p>
        <p><strong>📅 Deadline:</strong> {job.applicationDeadline}</p>
      </div>

      {/* Job Description */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Job Description</h2>
        <p className="text-gray-600">{job.description}</p>
      </div>

      {/* Requirements */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Requirements</h2>
        <ul className="list-disc ml-6 text-gray-600">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      {/* Responsibilities */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Responsibilities</h2>
        <ul className="list-disc ml-6 text-gray-600">
          {job.responsibilities.map((resp, index) => (
            <li key={index}>{resp}</li>
          ))}
        </ul>
      </div>

      {/* Apply Button */}
      <div className="mt-6 text-center">
        <a
          href={`mailto:${job.hr_email}`}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobDetails;
