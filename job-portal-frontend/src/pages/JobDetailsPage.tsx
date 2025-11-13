import { useEffect, useState } from "react";
import axios from "axios";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Assuming backend returns application info in getApplicationsByJob for employers,
        // here we’ll show dummy applied jobs from job list for simplicity
        setApplications(res.data.slice(0, 3)); // Example: first 3 jobs as placeholder
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <ul className="space-y-3">
          {applications.map((app, idx) => (
            <li key={idx} className="border p-4 rounded-md">
              <p className="font-semibold">{app.title}</p>
              <p className="text-gray-600">Location: {app.location}</p>
              <p className="text-sm text-gray-500">Status: Pending</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
