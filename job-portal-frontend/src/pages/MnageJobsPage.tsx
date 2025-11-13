// src/pages/ManageJobsPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  const handleClose = async (id: number) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:5000/api/jobs/close/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs yet.</p>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li key={job.id} className="border p-3 rounded-lg flex justify-between">
              <div>
                <p className="font-semibold">{job.title}</p>
                <p className="text-gray-600">{job.location}</p>
              </div>
              <button
                onClick={() => handleClose(job.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-md"
              >
                Close
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
