// src/routes/protectedRoutes.ts
import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
const router = Router();
router.get("/test", authenticate, (req, res) => {
    res.json({ message: `Hello ${req.user?.name || req.user?.email}`, user: req.user });
});
// If you want an admin-only route:
router.get("/admin-only", authenticate, authorize(["admin"]), (req, res) => {
    res.json({ message: "Admin access granted" });
});
export default router;
//# sourceMappingURL=protectedRoutes.js.map