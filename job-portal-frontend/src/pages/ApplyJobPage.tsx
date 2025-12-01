// src/pages/ApplyJobPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ApplyJobPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [cv, setCv] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setJob(res.data))
      .catch(() => setMessage("Failed to load job details"))
      .finally(() => setLoading(false));
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cv) {
      setMessage("Please upload your CV before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", cv);
    formData.append("coverLetter", coverLetter);
    formData.append("jobId", jobId || "");

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/applications`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Application submitted successfully!");
      setTimeout(() => navigate("/job-seeker"), 2000);
    } catch {
      setMessage("Failed to submit your application. Please try again.");
    }
  };

  if (loading) return <div>Loading job details...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-blue-500 to-sky-400 p-6 flex items-center justify-center">
      <div className="bg-white/95 p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Apply for {job?.title || "Job"}
        </h1>
        <p className="text-gray-600 mb-6">
          {job?.company} - {job?.location}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700 mb-2">Upload CV</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCv(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Cover Letter (optional)
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg h-32 resize-none"
              placeholder="Write your cover letter here..."
            />
          </div>

          {message && <p className="text-center text-blue-600 font-medium">{message}</p>}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobPage;
