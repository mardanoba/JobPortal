// src/pages/ResetPasswordPage.tsx
import { useState } from "react";
import { resetPassword } from "../api/auth";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPasswordPage() {
  const q = useQuery();
  const token = q.get("token") || "";
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e:any) {
    e.preventDefault();
    try {
      const res = await resetPassword(token, password);
      setMsg(res.data.message);
    } catch (err:any) {
      setMsg(err?.response?.data?.error || "Error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-md p-6 border rounded">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="New password" className="w-full mb-2 p-2 border" />
        <button className="w-full p-2 bg-blue-600 text-white rounded">Reset Password</button>
        {msg && <p className="mt-4">{msg}</p>}
      </form>
    </div>
  );
}
