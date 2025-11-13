// src/controllers/jobController.ts
import { Request, Response } from "express";
import {
  createJob,
  getJobById,
  updateJob,
  closeJob,
  getJobs,
  applyToJob,
  getApplicationsByJob,
} from "../db/repository.js";

// Create job (employer)
export async function createJobController(req: Request, res: Response) {
  const { title, description, category, type, location, salary, requirements } = req.body;
  const employer_id = (req as any).user.id;

  try {
    const job = await createJob({ employer_id, title, description, category, type, location, salary, requirements });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create job" });
  }
}

// Update job
export async function updateJobController(req: Request, res: Response) {
  const jobId = Number(req.params.id);
  const data = req.body;

  try {
    const updated = await updateJob(jobId, data);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update job" });
  }
}

// Close job
export async function closeJobController(req: Request, res: Response) {
  const jobId = Number(req.params.id);
  try {
    await closeJob(jobId);
    res.json({ message: "Job closed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to close job" });
  }
}

// List all open jobs
export async function getJobsController(req: Request, res: Response) {
  try {
    const jobs = await getJobs();
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get jobs" });
  }
}

// Apply to job (job seeker)
export async function applyToJobController(req: Request, res: Response) {
  const jobId = Number(req.params.jobId);
  const job_seeker_id = (req as any).user.id;
  const { cv_url } = req.body;

  try {
    const application = await applyToJob({ job_id: jobId, job_seeker_id, cv_url });
    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to apply" });
  }
}

// Get applications for a job (employer)
export async function getApplicationsController(req: Request, res: Response) {
  const jobId = Number(req.params.jobId);
  try {
    const applications = await getApplicationsByJob(jobId);
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get applications" });
  }
}
