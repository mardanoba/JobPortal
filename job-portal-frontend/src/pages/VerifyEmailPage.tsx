// src/pages/VerifyEmailPage.tsx
import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmailCode } from "../api/auth";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as any)?.email || "";
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  async function onSubmit(e: any) {
    e.preventDefault();
    setMsg("");
    if (!code) return setMsg("Please enter the verification code");

    try {
      const res = await verifyEmailCode({ email, code });
      setMsg(res.data.message || "Email verified successfully!");
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000); // redirect to login
    } catch (err: any) {
      setMsg(err?.response?.data?.error || "Verification failed");
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
            links: { enable: true, color: "#ffffff", distance: 120, opacity: 0.3, width: 1 },
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
          Verify Email
        </h2>
        <p className="mb-4 text-sm text-gray-700">
          Enter the 6-digit code sent to <b>{email}</b>
        </p>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Verification code"
          className="w-full mb-4 p-3 rounded-lg border border-white/30 bg-white/50 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          required
        />

        <button
          type="submit"
          className={`w-full py-3 mb-4 text-white font-bold rounded-xl shadow-lg ${
            success ? "bg-green-500" : "bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 hover:shadow-2xl"
          } transform hover:scale-105 transition-all duration-300`}
        >
          Verify
        </button>

        {msg && (
          <p className={`text-sm font-semibold ${success ? "text-green-800" : "text-red-700"}`}>
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}
