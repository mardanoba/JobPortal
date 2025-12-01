// src/pages/EmployerDashboardPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Fake API data placeholders
const fetchStats = async () => ({
  totalJobs: 12,
  activeJobs: 8,
  totalApplications: 45,
  pendingApplications: 7,
});

const fetchRecentJobs = async () => [
  { id: 1, title: "Frontend Developer", status: "Active", applicants: 5 },
  { id: 2, title: "Backend Developer", status: "Active", applicants: 3 },
  { id: 3, title: "UI/UX Designer", status: "Closed", applicants: 8 },
];

const fetchRecentActivity = async () => [
  { id: 1, text: "John applied for Frontend Developer" },
  { id: 2, text: "Sara applied for Backend Developer" },
  { id: 3, text: "Mark applied for UI/UX Designer" },
];

export default function EmployerDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const s = await fetchStats();
      const jobs = await fetchRecentJobs();
      const activity = await fetchRecentActivity();

      setStats(s);
      setRecentJobs(jobs);
      setRecentActivity(activity);
    })();
  }, []);

  const employerName = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).role === "employer"
      ? JSON.parse(localStorage.getItem("user")!).name || "Employer"
      : "Employer"
    : "Employer";

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Welcome, {employerName} 👋</h1>

      {/* --- Stats Row --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Link
          to="/employer/jobs"
          className="bg-white p-4 rounded shadow hover:shadow-md transition flex flex-col items-center"
        >
          <span className="text-xl font-bold">{stats.totalJobs}</span>
          <span className="text-gray-500">Total Jobs</span>
        </Link>

        <Link
          to="/employer/jobs"
          className="bg-white p-4 rounded shadow hover:shadow-md transition flex flex-col items-center"
        >
          <span className="text-xl font-bold">{stats.activeJobs}</span>
          <span className="text-gray-500">Active Jobs</span>
        </Link>

        <Link
          to="/employer/job/0/applications"
          className="bg-white p-4 rounded shadow hover:shadow-md transition flex flex-col items-center"
        >
          <span className="text-xl font-bold">{stats.totalApplications}</span>
          <span className="text-gray-500">Total Applications</span>
        </Link>

        <Link
          to="/employer/job/0/applications"
          className="bg-white p-4 rounded shadow hover:shadow-md transition flex flex-col items-center"
        >
          <span className="text-xl font-bold">{stats.pendingApplications}</span>
          <span className="text-gray-500">Pending Applications</span>
        </Link>
      </div>

      {/* --- Recent Jobs --- */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Recent Jobs</h2>
        {recentJobs.map((job) => (
          <div
            key={job.id}
            className="flex justify-between items-center p-2 border-b last:border-b-0"
          >
            <div>
              <p className="font-medium">{job.title}</p>
              <p className="text-gray-500 text-sm">
                Status: {job.status} | Applicants: {job.applicants}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/employer/edit-job/${job.id}`}
                className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 text-white"
              >
                Edit
              </Link>
              <Link
                to={`/employer/job/${job.id}/applications`}
                className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 text-white"
              >
                Applications
              </Link>
            </div>
          </div>
        ))}
        <div className="mt-2 text-right">
          <Link
            to="/employer/jobs"
            className="text-blue-600 hover:underline"
          >
            View All Jobs →
          </Link>
        </div>
      </div>

      {/* --- Recent Activity --- */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Recent Applications</h2>
        {recentActivity.map((act) => (
          <p key={act.id} className="text-gray-700 border-b last:border-b-0 p-2">
            {act.text}
          </p>
        ))}
        <div className="mt-2 text-right">
          <Link
            to="/employer/job/0/applications"
            className="text-blue-600 hover:underline"
          >
            View All Applications →
          </Link>
        </div>
      </div>

      {/* --- Quick Actions --- */}
      <div className="flex gap-4 mb-6">
        <Link
          to="/employer/create-job"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white"
        >
          Create Job
        </Link>
        <Link
          to="/employer/jobs"
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-800 text-white"
        >
          Manage Jobs
        </Link>
        <Link
          to="/employer/job/0/applications"
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 text-white"
        >
          Applications
        </Link>
      </div>

      {/* --- Employer Profile --- */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Profile</h2>
        <p>Name: {employerName}</p>
        <p>Email: {localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).email : "email@example.com"}</p>
        <p>Phone: {localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).phone || "N/A" : "N/A"}</p>
        <Link
          to="/employer/profile"
          className="text-blue-600 hover:underline mt-2 inline-block"
        >
          Edit Profile →
        </Link>
      </div>

      {/* --- Notifications --- */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>You have 2 new applications today</li>
          <li>Your job "Backend Developer" is expiring soon</li>
          <li>"Frontend Developer" has 3 new applicants</li>
        </ul>
      </div>
    </div>
  );
}
