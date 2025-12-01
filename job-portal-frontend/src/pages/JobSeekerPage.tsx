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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    try {
      setUser(JSON.parse(storedUser));
    } catch {
      navigate("/login");
    }
  }, [navigate]);

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
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black p-6 text-white">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-wide text-yellow-400 drop-shadow-lg mb-4 md:mb-0">
          Welcome, {user.name}
        </h1>

        <div className="flex gap-4">
          <button
            className="
              px-5 py-2 rounded-xl
              bg-yellow-500/20 border border-yellow-500/30
              text-yellow-300 font-medium
              hover:bg-yellow-500/30 hover:shadow-[0_0_15px_rgba(255,200,50,0.4)]
              transition
            "
            onClick={() => navigate("/job-seeker/applications")}
          >
            Your Applications
          </button>

          <button
            className="
              px-5 py-2 rounded-xl
              bg-yellow-500/20 border border-yellow-500/30
              text-yellow-300 font-medium
              hover:bg-yellow-500/30 hover:shadow-[0_0_15px_rgba(255,200,50,0.4)]
              transition
            "
            onClick={() => navigate("/job-seeker/profile")}
          >
            Profile
          </button>

          <button
            className="
              px-5 py-2 rounded-xl
              bg-red-600 text-white font-semibold
              hover:bg-red-700 transition
            "
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

      {/* Search Section */}
      <section
        className="
          p-8 max-w-4xl mx-auto
          bg-white/5 backdrop-blur-2xl rounded-3xl
          border border-yellow-600/20
          shadow-[0_0_40px_rgba(255,200,50,0.1)]
        "
      >
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 drop-shadow-lg">
          Search Jobs
        </h2>

        <input
          type="text"
          placeholder="Search jobs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full p-4 rounded-lg mb-6
            bg-black/50 border border-yellow-500/20
            placeholder-gray-400 text-white
            focus:ring-2 focus:ring-yellow-500/50
            focus:outline-none transition
          "
        />

        {error && <p className="text-red-500 mb-3">{error}</p>}

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <p className="text-gray-300">No jobs found.</p>
        ) : (
          <ul className="space-y-6">
            {filteredJobs.map((job) => (
              <li
                key={job.id}
                className="
                  p-6 rounded-2xl 
                  bg-black/40 border border-yellow-500/20 
                  shadow-[0_0_20px_rgba(255,200,50,0.05)]
                  hover:bg-black/50
                  hover:shadow-[0_0_25px_rgba(255,200,50,0.15)]
                  transition
                "
              >
                <h3 className="text-2xl font-semibold text-yellow-300 drop-shadow">
                  {job.title}
                </h3>
                <p className="text-gray-300 mt-1">{job.company} – {job.location}</p>
                <p className="text-gray-400 mt-3 text-sm line-clamp-3">
                  {job.description}
                </p>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => navigate(`/job-seeker/apply/${job.id}`)}
                    className="
                      px-6 py-2 rounded-xl
                      bg-gradient-to-r from-yellow-500 to-yellow-600
                      text-black font-bold
                      hover:from-yellow-400 hover:to-yellow-500
                      hover:shadow-[0_0_20px_rgba(255,200,50,0.5)]
                      transform hover:scale-[1.03]
                      transition-all duration-300
                    "
                  >
                    Apply Now
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default JobSeekerPage;
