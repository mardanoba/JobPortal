// src/pages/EditJobPage.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Failed to load job:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/jobs/update/${id}`,
        job,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Job updated successfully");
      navigate("/employer/dashboard");
    } catch (err) {
      console.error("Failed to update job:", err);
      alert("Failed to update job");
    }
  };

  const handleClose = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/jobs/close/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Job closed successfully");
      navigate("/employer/dashboard");
    } catch (err) {
      console.error("Failed to close job:", err);
      alert("Failed to close job");
    }
  };

  if (loading) return <p className="text-center mt-8">Loading job...</p>;
  if (!job) return <p className="text-center mt-8">Job not found</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>

      <label className="block mb-2 font-medium">Title</label>
      <input
        value={job.title || ""}
        onChange={(e) => setJob({ ...job, title: e.target.value })}
        className="border p-2 w-full mb-3 rounded"
      />

      <label className="block mb-2 font-medium">Description</label>
      <textarea
        value={job.description || ""}
        onChange={(e) => setJob({ ...job, description: e.target.value })}
        className="border p-2 w-full mb-3 rounded"
      />

      <label className="block mb-2 font-medium">Salary</label>
      <input
        type="number"
        value={job.salary || ""}
        onChange={(e) => setJob({ ...job, salary: e.target.value })}
        className="border p-2 w-full mb-3 rounded"
      />

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
        <button
          onClick={handleClose}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Close Job
        </button>
      </div>
    </div>
  );
}
