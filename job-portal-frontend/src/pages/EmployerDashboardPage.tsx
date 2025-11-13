// src/pages/EmployerDashboard.tsx
import { Link } from "react-router-dom";

export default function EmployerDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>

      <div className="space-y-4">
        <Link
          to="/create-job"
          className="block p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          ➕ Create New Job
        </Link>

        <Link
          to="/manage-jobs"
          className="block p-4 bg-green-600 text-white rounded-xl hover:bg-green-700"
        >
          🧾 Manage My Jobs
        </Link>

        <Link
          to="/applications"
          className="block p-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
        >
          👥 View Applicants
        </Link>
      </div>
    </div>
  );
}
