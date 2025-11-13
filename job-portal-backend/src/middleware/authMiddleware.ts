import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.js";

export interface AuthRequest extends Request {
  user?: { id: number; email: string; role: string; name?: string };
}

// JWT authentication
export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "No authorization header" });
  const parts = header.split(" ");
  if (parts.length !== 2) return res.status(401).json({ error: "Invalid auth header" });
  const token = parts[1];
  try {
    const payload = verifyJwt(token);
    req.user = payload as any;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Role-based access
export function requireRole(roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "Not authenticated" });
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}

// --- Legacy exports for backward compatibility ---
export const authenticate = authenticateJWT;
export const authorize = requireRole;
