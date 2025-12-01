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
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black overflow-hidden text-white">
      {/* Gold particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: "#FFD633" },
            links: {
              enable: true,
              color: "#FFD633",
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

      {/* Form Container */}
      <form
        onSubmit={onSubmit}
        className="
          backdrop-blur-xl bg-white/5 border border-yellow-600/20
          shadow-[0_0_50px_rgba(255,200,50,0.1)]
          rounded-3xl p-10 w-full max-w-md text-center
          transform transition duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(255,200,50,0.3)]
        "
      >
        <h2 className="text-3xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg tracking-wide">
          Register
        </h2>

        {msg && (
          <p className={`mb-4 text-sm font-semibold ${success ? "text-green-400" : "text-red-500"}`}>
            {msg}
          </p>
        )}

        {!success && (
          <>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="
                w-full mb-4 p-3 rounded-lg border border-yellow-500/30
                bg-black/50 text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition
              "
              required
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              type="email"
              className="
                w-full mb-4 p-3 rounded-lg border border-yellow-500/30
                bg-black/50 text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition
              "
              required
            />
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Password"
              className="
                w-full mb-4 p-3 rounded-lg border border-yellow-500/30
                bg-black/50 text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition
              "
              required
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="
                w-full mb-4 p-3 rounded-lg border border-yellow-500/30
                bg-black/50 text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition
              "
            >
              <option value="job_seeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>

            <button
              type="submit"
              className="
                w-full py-3 mb-4 bg-gradient-to-r from-yellow-500 to-yellow-600
                text-black font-bold rounded-xl
                hover:from-yellow-400 hover:to-yellow-500
                hover:shadow-[0_0_25px_rgba(255,200,50,0.5)]
                transform hover:scale-[1.03] transition-all duration-300
              "
            >
              Register
            </button>
          </>
        )}

        {!success && (
          <div className="mt-4">
            <Link
              to="/login"
              className="text-yellow-300 hover:text-yellow-400 underline font-medium transition"
            >
              Already have an account? Login
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}
