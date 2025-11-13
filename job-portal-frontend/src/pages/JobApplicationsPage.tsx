// src/pages/JobApplicationsPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Applicant {
  id: number;
  name: string;
  email: string;
  cv_url?: string;
  applied_at: string;
}

export default function JobApplicationsPage() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/jobs/applications/${jobId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setApplicants(res.data);
      } catch (err) {
        console.error("Failed to fetch applicants:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [jobId]);

  if (loading) return <p className="text-center mt-8">Loading applicants...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Applicants for Job #{jobId}</h1>
      {applicants.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applicants.map((a) => (
            <div
              key={a.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h2 className="font-semibold">{a.name}</h2>
              <p className="text-sm text-gray-600">{a.email}</p>
              {a.cv_url && (
                <a
                  href={a.cv_url}
                  target="_blank"
                  className="text-blue-600 underline text-sm mt-2 inline-block"
                >
                  View CV
                </a>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Applied: {new Date(a.applied_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
