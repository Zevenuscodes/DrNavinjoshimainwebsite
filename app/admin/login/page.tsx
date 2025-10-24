"use client";

import { useState } from "react";
import Container from "@/components/Container";

export default function AdminLogin() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      });
      if (!res.ok) {
        const j = await res.json().catch(()=>({}));
        throw new Error(j.error || "Invalid credentials");
      }
      setOk(true);
      localStorage.setItem("__admin_session", token.trim());
      window.location.href = "/admin";
    } catch (e: any) {
      setError(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    localStorage.removeItem("__admin_session");
    setOk(false);
  }

  return (
    <section className="section">
      <Container>
        <div className="max-w-md mx-auto card p-6 space-y-4">
          <h1 className="text-xl font-semibold">Admin Login</h1>
          <form onSubmit={onSubmit} className="space-y-3">
            <input className="input" placeholder="Admin token" value={token} onChange={(e)=>setToken(e.target.value)} />
            <input className="input" type="password" placeholder="Password (if configured)" value={password} onChange={(e)=>setPassword(e.target.value)} />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button disabled={loading} className="btn-primary w-full">{loading ? "Signing in…" : "Sign In"}</button>
          </form>
          {ok && (
            <button onClick={logout} className="btn-ghost">Logout</button>
          )}
        </div>
      </Container>
    </section>
  );
}
