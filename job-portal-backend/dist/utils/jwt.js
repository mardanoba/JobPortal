import jwt from "jsonwebtoken";
const SECRET = (process.env.JWT_SECRET ?? "change_this_secret");
// ✅ Cast to correct type for TypeScript, still works fine at runtime
const EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? "1h");
export function signJwt(payload) {
    const options = { expiresIn: EXPIRES_IN };
    return jwt.sign(payload, SECRET, options);
}
export function verifyJwt(token) {
    return jwt.verify(token, SECRET);
}
//# sourceMappingURL=jwt.js.map