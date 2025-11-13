// src/middleware/roleMiddleware.ts
import { Request, Response, NextFunction } from "express";

export function requireRole(role: "job_seeker" | "employer") {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user; // will be set by JWT auth middleware
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    if (user.role !== role) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}
