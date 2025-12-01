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
  // new helpers
  getJobsByEmployer,
  getRecentJobsByEmployer,
  getRecentApplicationsByEmployer,
  getJobsCountByEmployer,
  getActiveJobsCountByEmployer,
  getApplicationsCountByEmployer,
  getPendingApplicationsCountByEmployer,
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

/* =========================
   Employer-specific controllers
   ========================= */

/**
 * GET /api/jobs/employer
 * Get all jobs posted by the authenticated employer
 */
export async function getEmployerJobsController(req: Request, res: Response) {
  const employer_id = (req as any).user.id;
  try {
    const jobs = await getJobsByEmployer(employer_id);
    res.json(jobs);
  } catch (err) {
    console.error("getEmployerJobsController error:", err);
    res.status(500).json({ error: "Failed to fetch employer jobs" });
  }
}

/**
 * GET /api/jobs/employer/stats
 * Returns counts used by the employer dashboard
 */
export async function getEmployerStatsController(req: Request, res: Response) {
  const employer_id = (req as any).user.id;
  try {
    const [totalJobs, activeJobs, totalApplications, pendingApplications] = await Promise.all([
      getJobsCountByEmployer(employer_id),
      getActiveJobsCountByEmployer(employer_id),
      getApplicationsCountByEmployer(employer_id),
      getPendingApplicationsCountByEmployer(employer_id),
    ]);

    res.json({
      totalJobs: Number(totalJobs) || 0,
      activeJobs: Number(activeJobs) || 0,
      totalApplications: Number(totalApplications) || 0,
      pendingApplications: Number(pendingApplications) || 0,
    });
  } catch (err) {
    console.error("getEmployerStatsController error:", err);
    res.status(500).json({ error: "Failed to fetch employer stats" });
  }
}

/**
 * GET /api/jobs/employer/recent?limit=3
 */
export async function getRecentJobsByEmployerController(req: Request, res: Response) {
  const employer_id = (req as any).user.id;
  const limit = Number(req.query.limit) || 3;
  try {
    const jobs = await getRecentJobsByEmployer(employer_id, limit);
    res.json(jobs);
  } catch (err) {
    console.error("getRecentJobsByEmployerController error:", err);
    res.status(500).json({ error: "Failed to fetch recent jobs" });
  }
}

/**
 * GET /api/jobs/employer/applications/recent?limit=5
 */
export async function getRecentApplicationsByEmployerController(req: Request, res: Response) {
  const employer_id = (req as any).user.id;
  const limit = Number(req.query.limit) || 5;
  try {
    const apps = await getRecentApplicationsByEmployer(employer_id, limit);
    res.json(apps);
  } catch (err) {
    console.error("getRecentApplicationsByEmployerController error:", err);
    res.status(500).json({ error: "Failed to fetch recent applications" });
  }
}
