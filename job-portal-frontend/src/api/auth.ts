import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// ---------------- Auth API ----------------
export function register(data: any) {
  return api.post("/api/auth/register", data);
}

export const login = (payload: any) => api.post("/api/auth/login", payload);

export function verifyEmailCode(data: { email: string; code: string }) {
  return api.post("/api/auth/verify-email", data);
}

export const forgotPassword = (email: string) =>
  api.post("/api/auth/forgot-password", { email });

export const resetPassword = (token: string, newPassword: string) =>
  api.post("/api/auth/reset-password", { token, newPassword });

export const getProtectedTest = (token: string) =>
  api.get("/api/protected/test", {
    headers: { Authorization: `Bearer ${token}` },
  });
