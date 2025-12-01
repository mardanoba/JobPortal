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
    setMsg("");

    try {
      const res = await login(form);

      // Save token + user
      if (res.data.token) localStorage.setItem("token", res.data.token);
      if (res.data.user)
        localStorage.setItem("user", JSON.stringify(res.data.user));

      setMsg("Login successful!");

      const role = res.data.user.role;

      // Redirect based on role ==========================
      if (role === "job_seeker") {
        nav("/job-seeker");
      } else if (role === "employer") {
        nav("/employer/dashboard"); // EMPLOYER HOME
      } else {
        nav("/");
      }
    } catch (err: any) {
      const serverError = err?.response?.data?.error;

      if (serverError === "Email not verified") {
        setMsg("Your email is not verified. Check your inbox.");
      } else if (serverError === "Invalid credentials") {
        setMsg("Incorrect email or password.");
      } else {
        setMsg(serverError || "Login failed");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black">
      <form
        onSubmit={onSubmit}
        className="
          backdrop-blur-2xl bg-white/5 border border-yellow-600/20 
          shadow-[0_0_50px_rgba(255,200,50,0.15)] 
          rounded-3xl p-10 w-full max-w-md text-center
        "
      >
        <h2 className="text-4xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg tracking-wide">
          Welcome Back
        </h2>

        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="
            w-full mb-4 p-3 rounded-lg 
            bg-black/40 border border-yellow-500/20 
            text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-yellow-500/50 
            transition
          "
          required
        />

        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          className="
            w-full mb-6 p-3 rounded-lg 
            bg-black/40 border border-yellow-500/20 
            text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-yellow-500/50 
            transition
          "
          required
        />

        <button
          type="submit"
          className="
            w-full py-3 mb-4 
            bg-gradient-to-r from-yellow-500 to-yellow-600 
            text-black font-extrabold rounded-xl shadow-lg
            hover:from-yellow-400 hover:to-yellow-500 
            hover:shadow-[0_0_20px_rgba(255,200,50,0.5)]
            transform hover:scale-[1.03]
            transition-all duration-300
          "
        >
          Sign In
        </button>

        {msg && (
          <p className="mt-3 text-yellow-300 font-medium drop-shadow">
            {msg}
          </p>
        )}

        <div className="mt-6">
          <Link
            to="/register"
            className="
              text-yellow-300 hover:text-yellow-400 
              underline font-medium transition
            "
          >
            Don’t have an account? Create one
          </Link>
        </div>
      </form>
    </div>
  );
}
