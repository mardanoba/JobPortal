// src/routes/jobRoutes.ts
import { Router } from "express";
import {
  createJobController,
  updateJobController,
  closeJobController,
  getJobsController,
  applyToJobController,
  getApplicationsController,
  // newly added controllers:
  getEmployerJobsController,
  getEmployerStatsController,
  getRecentJobsByEmployerController,
  getRecentApplicationsByEmployerController,
} from "../controllers/jobController.js";
import { authenticateJWT, requireRole } from "../middleware/authMiddleware.js";

const router = Router();

// Employer routes
router.post("/create", authenticateJWT, requireRole(["employer"]), createJobController);
router.put("/update/:id", authenticateJWT, requireRole(["employer"]), updateJobController);
router.put("/close/:id", authenticateJWT, requireRole(["employer"]), closeJobController);
router.get("/applications/:jobId", authenticateJWT, requireRole(["employer"]), getApplicationsController);

// Employer - extra endpoints for dashboard / management
router.get("/employer", authenticateJWT, requireRole(["employer"]), getEmployerJobsController);
router.get("/employer/stats", authenticateJWT, requireRole(["employer"]), getEmployerStatsController);
router.get("/employer/recent", authenticateJWT, requireRole(["employer"]), getRecentJobsByEmployerController);
router.get("/employer/applications/recent", authenticateJWT, requireRole(["employer"]), getRecentApplicationsByEmployerController);

// Job Seeker routes
router.get("/", authenticateJWT, getJobsController); // list all open jobs (requires auth as per your original code)
router.post("/apply/:jobId", authenticateJWT, requireRole(["job_seeker"]), applyToJobController);

export default router;
