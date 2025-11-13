import { Router } from "express";
import {
  createJobController,
  updateJobController,
  closeJobController,
  getJobsController,
  applyToJobController,
  getApplicationsController,
} from "../controllers/jobController.js";
import { authenticateJWT, requireRole } from "../middleware/authMiddleware.js";

const router = Router();

// Employer routes
router.post("/create", authenticateJWT, requireRole(["employer"]), createJobController);
router.put("/update/:id", authenticateJWT, requireRole(["employer"]), updateJobController);
router.put("/close/:id", authenticateJWT, requireRole(["employer"]), closeJobController);
router.get("/applications/:jobId", authenticateJWT, requireRole(["employer"]), getApplicationsController);

// Job Seeker routes
router.get("/", authenticateJWT, getJobsController); // list all open jobs
router.post("/apply/:jobId", authenticateJWT, requireRole(["job_seeker"]), applyToJobController);

export default router;
