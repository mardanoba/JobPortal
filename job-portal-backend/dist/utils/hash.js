// src/utils/hash.ts
import bcrypt from "bcrypt";
const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
export function hashPassword(plain) {
    return bcrypt.hash(plain, SALT_ROUNDS);
}
export function comparePassword(plain, hash) {
    return bcrypt.compare(plain, hash);
}
//# sourceMappingURL=hash.js.map