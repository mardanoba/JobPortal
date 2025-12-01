// src/pages/ApplicationsPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface Application {
  id: number;
  job: {
    title: string;
    company?: string;
    location?: string;
  };
  status: string;
  applied_at: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/jobs/applications`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplications(res.data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black">
        <p className="text-yellow-300 text-lg font-medium drop-shadow">
          Loading applications...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black p-6 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-yellow-400 text-center drop-shadow-lg tracking-wide">
          My Applications
        </h1>

        {/* No Applications */}
        {applications.length === 0 ? (
          <div
            className="
              p-8 text-center rounded-3xl
              bg-white/5 backdrop-blur-2xl
              border border-yellow-600/20
              shadow-[0_0_40px_rgba(255,200,50,0.08)]
              text-gray-300
            "
          >
            You haven’t applied to any jobs yet.
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="
                  p-6 rounded-3xl
                  bg-black/40 backdrop-blur-xl
                  border border-yellow-600/20
                  shadow-[0_0_30px_rgba(255,200,50,0.1)]
                  hover:shadow-[0_0_40px_rgba(255,200,50,0.2)]
                  hover:bg-black/50
                  transition-all duration-300
                "
              >
                {/* Job Title */}
                <h2 className="text-2xl font-bold text-yellow-300 drop-shadow">
                  {app.job.title}
                </h2>

                {/* Company / Location */}
                <p className="text-gray-300 mt-1">
                  {app.job.company} — {app.job.location}
                </p>

                {/* Status */}
                <p className="mt-3 text-gray-200">
                  <span className="font-semibold text-yellow-400">Status:</span>{" "}
                  {app.status}
                </p>

                {/* Date */}
                <p className="text-xs text-gray-400 mt-2">
                  Applied on:{" "}
                  {new Date(app.applied_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
