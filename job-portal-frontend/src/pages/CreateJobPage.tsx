// src/pages/CreateJobPage.tsx
import { useState } from "react";
import axios from "axios";

export default function CreateJobPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    location: "",
    salary: "",
    requirements: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5000/api/jobs/create", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Job created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create job");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={(form as any)[key]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="border p-2 w-full rounded-md"
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Create Job
        </button>
      </form>
    </div>
  );
}
