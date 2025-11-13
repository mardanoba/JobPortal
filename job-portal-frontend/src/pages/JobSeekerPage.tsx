// src/pages/JobSeekerPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
}

const JobSeekerPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    try {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch jobs
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setJobs(res.data))
      .catch(() => setError("Failed to load jobs"))
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!user) return <div>Loading user info...</div>;
  if (loading) return <div>Loading jobs...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-blue-500 to-sky-400 p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 text-white">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Welcome, {user.name}</h1>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-white/30 rounded-xl font-medium hover:bg-white/50 transition"
            onClick={() => navigate("/job-seeker/applications")}
          >
            Your Applications
          </button>
          <button
            className="px-4 py-2 bg-white/30 rounded-xl font-medium hover:bg-white/50 transition"
            onClick={() => navigate("/job-seeker/profile")}
          >
            Profile
          </button>
          <button
            className="px-4 py-2 bg-red-500 rounded-xl font-medium hover:bg-red-600 transition"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Job Search */}
      <section className="mb-6 p-6 bg-white/90 rounded-2xl shadow-xl max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Search Jobs</h2>
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
        />
        {error && <p className="text-red-600 mb-2">{error}</p>}
        {filteredJobs.length === 0 ? (
          <p className="text-gray-600">No jobs found.</p>
        ) : (
          <ul className="space-y-3">
            {filteredJobs.map((job) => (
              <li
                key={job.id}
                className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {job.company} - {job.location}
                  </p>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Apply
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Your Applications */}
      <section className="p-6 bg-white/90 rounded-2xl shadow-xl max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Your Applications</h2>
        <p className="text-gray-600">Track the status of your job applications here. (Coming soon)</p>
      </section>
    </div>
  );
};

export default JobSeekerPage;
