// src/pages/LoginPage.tsx
import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(""); // clear previous messages
    try {
      const res = await login(form);

      // Store JWT token and user info in localStorage
      if (res.data.token) localStorage.setItem("token", res.data.token);
      if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));

      setMsg("Login successful!");

      // Redirect based on role
      if (res.data.user.role === "job_seeker") {
        nav("/job-seeker"); // ✅ Dashboard
      } else if (res.data.user.role === "employer") {
        nav("/employer/dashboard");
      } else {
        nav("/"); // fallback
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error;
      if (errorMessage === "Email not verified") {
        setMsg("Your email is not verified. Check your inbox.");
      } else {
        setMsg(errorMessage || "Login failed");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-blue-500 to-sky-400">
      <form
        onSubmit={onSubmit}
        className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-blue-900 drop-shadow-md">
          Login
        </h2>

        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg border border-white/30 bg-white/50 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          required
        />

        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          className="w-full mb-4 p-3 rounded-lg border border-white/30 bg-white/50 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          required
        />

        <button
          type="submit"
          className="w-full py-3 mb-4 bg-gradient-to-r from-sky-400 to-sky-600 text-white font-bold rounded-xl shadow-lg hover:from-sky-500 hover:to-sky-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          Login
        </button>

        {msg && <p className="mt-2 text-white/90">{msg}</p>}

        <div className="mt-4">
          <Link
            to="/register"
            className="text-white/90 hover:text-white underline font-medium transition"
          >
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
}
