// src/pages/RegisterPage.tsx
import { useState, useCallback } from "react";
import { register } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "job_seeker",
  });
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  async function onSubmit(e: any) {
    e.preventDefault();
    setMsg("");
    try {
      const res = await register(form);
      setMsg(res.data.message || "Registered successfully!");
      setSuccess(true);

      // Pass email to verification page
      navigate("/verify-email", { state: { email: form.email } });
      setForm({ name: "", email: "", password: "", role: "job_seeker" });
    } catch (err: any) {
      setMsg(
        err?.response?.data?.error || err?.message || "Something went wrong. Try again."
      );
      setSuccess(false);
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: "#ffffff" },
            links: {
              enable: true,
              color: "#ffffff",
              distance: 120,
              opacity: 0.3,
              width: 1,
            },
            move: { enable: true, speed: 0.6, direction: "none", outModes: "bounce" },
            number: { value: 60, density: { enable: true, area: 800 } },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      <form
        onSubmit={onSubmit}
        className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center transform transition duration-500 hover:scale-[1.02] hover:shadow-sky-300/60"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-blue-900 drop-shadow-md tracking-wide">
          Register
        </h2>

        {msg && (
          <p className={`mb-4 text-sm font-semibold ${success ? "text-green-800" : "text-red-700"}`}>
            {msg}
          </p>
        )}

        {!success && (
          <>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full mb-4 p-3 rounded-lg border border-white/30 bg-white/50 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              required
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              type="email"
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
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full mb-4 p-3 rounded-lg border border-white/30 bg-white/50 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            >
              <option value="job_seeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>

            <button
              type="submit"
              className="w-full py-3 mb-4 bg-gradient-to-r from-sky-400 to-sky-600 text-white font-bold rounded-xl shadow-lg hover:from-sky-500 hover:to-sky-700 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Register
            </button>
          </>
        )}

        {!success && (
          <div className="mt-4">
            <Link
              to="/login"
              className="text-white/90 hover:text-white underline font-medium transition"
            >
              Already have an account? Login
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}
