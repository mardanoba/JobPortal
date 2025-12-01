import { useState } from "react";
import { createJob } from "../api/job";
import { useNavigate } from "react-router-dom";

export default function CreateJobPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    try {
      const res = await createJob(form);

      if (res.success) {
        setMsg("Job created successfully!");
        setTimeout(() => nav("/employer/dashboard"), 1200);
      } else {
        setMsg("Failed to create job.");
      }
    } catch (err: any) {
      setMsg(err.message || "Error creating job");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Post a New Job</h1>

      {msg && <p className="text-blue-600 mb-2">{msg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Job Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Job Description"
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Salary (optional)"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
        />

        <button className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}
