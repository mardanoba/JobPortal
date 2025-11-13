import { verifyJwt } from "../utils/jwt.js";
export function authenticate(req, res, next) {
    const header = req.headers.authorization;
    if (!header)
        return res.status(401).json({ error: "No authorization header" });
    const parts = header.split(" ");
    if (parts.length !== 2)
        return res.status(401).json({ error: "Invalid auth header" });
    const token = parts[1];
    try {
        const payload = verifyJwt(token);
        req.user = payload;
        return next();
    }
    catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}
export function authorize(roles) {
    return (req, res, next) => {
        if (!req.user)
            return res.status(401).json({ error: "Not authenticated" });
        if (!roles.includes(req.user.role))
            return res.status(403).json({ error: "Forbidden" });
        next();
    };
}
//# sourceMappingURL=auth.js.map