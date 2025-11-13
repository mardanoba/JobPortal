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
        const res = await axios.get("http://localhost:5000/api/jobs/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(res.data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading applications...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      {applications.length === 0 ? (
        <p>You haven’t applied to any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{app.job.title}</h2>
              <p className="text-sm text-gray-600">
                {app.job.company} — {app.job.location}
              </p>
              <p className="mt-2">
                <strong>Status:</strong> {app.status}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Applied on: {new Date(app.applied_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
