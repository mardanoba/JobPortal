// src/pages/ProtectedTestPage.tsx
import { useEffect, useState } from "react";
import { getProtectedTest } from "../api/auth";

export default function ProtectedTestPage() {
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) { setMsg("No token found. Please login."); return; }
      try {
        const res = await getProtectedTest(token);
        setMsg(JSON.stringify(res.data, null, 2));
      } catch (err:any) {
        setMsg(err?.response?.data?.error || "Error");
      }
    })();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-xl font-bold mb-4">Protected Test</h2>
      <pre className="bg-gray-100 p-4 rounded">{msg}</pre>
    </div>
  );
}
