// src/pages/ForgotPasswordPage.tsx
import { useState } from "react";
import { forgotPassword } from "../api/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e:any) {
    e.preventDefault();
    try {
      const res = await forgotPassword(email);
      setMsg(res.data.message);
    } catch (err:any) {
      setMsg(err?.response?.data?.error || "Error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-md p-6 border rounded">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 p-2 border" />
        <button className="w-full p-2 bg-blue-600 text-white rounded">Send Reset Link</button>
        {msg && <p className="mt-4">{msg}</p>}
      </form>
    </div>
  );
}
