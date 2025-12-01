import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// ---------------- Jobs ----------------

// Get all open jobs (job seeker)
export const getJobs = (token: string) =>
  api.get("/api/jobs", { headers: { Authorization: `Bearer ${token}` } });

// Apply to a job (job seeker)
export const applyToJob = (jobId: number, cv_url: string, token: string) =>
  api.post(
    `/api/jobs/apply/${jobId}`,
    { cv_url },
    { headers: { Authorization: `Bearer ${token}` } }
  );

// Create a job (employer)
export const createJob = (data: any, token: string) =>
  api.post("/api/jobs/create", data, { headers: { Authorization: `Bearer ${token}` } });

// Update a job (employer)
export const updateJob = (jobId: number, data: any, token: string) =>
  api.put(`/api/jobs/update/${jobId}`, data, { headers: { Authorization: `Bearer ${token}` } });

// Close a job (employer)
export const closeJob = (jobId: number, token: string) =>                        
  api.put(`/api/jobs/close/${jobId}`, {}, { headers: { Authorization: `Bearer ${token}` } });

// Get applications for a job (employer)
export const getApplications = (jobId: number, token: string) =>
  api.get(`/api/jobs/applications/${jobId}`, { headers: { Authorization: `Bearer ${token}` } });
