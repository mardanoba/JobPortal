import jwt, { SignOptions, Secret } from "jsonwebtoken";

const SECRET: Secret = (process.env.JWT_SECRET ?? "change_this_secret") as Secret;

// ✅ Cast to correct type for TypeScript, still works fine at runtime
const EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? "1h") as unknown as SignOptions["expiresIn"];

export function signJwt(payload: object): string {
  const options: SignOptions = { expiresIn: EXPIRES_IN };
  return jwt.sign(payload, SECRET, options);
}

export function verifyJwt<T = any>(token: string): T {
  return jwt.verify(token, SECRET) as T;
}
