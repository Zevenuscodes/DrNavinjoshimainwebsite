"use client";

import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time?: string;
  mode: string;
  status: string;
  code?: string;
  amount?: number;
  paymentId?: string;
  orderId?: string;
  createdAt: string;
}

interface IntakeRec {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  mode?: string;
  date?: string;
  time?: string;
  notes?: string;
  reports?: string[];
  createdAt?: string;
}

export default function AdminPage() {
  const [tokenInput, setTokenInput] = useState("");
  const [authed, setAuthed] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [intakes, setIntakes] = useState<IntakeRec[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sess = typeof window !== 'undefined' ? localStorage.getItem("__admin_session") : null;
    if (sess && !tokenInput) setTokenInput(sess);
  }, []);

  async function verifyWithServer(tok: string): Promise<boolean> {
    try {
      // Try cookie-based verification first
      const cookieCheck = await fetch("/api/admin/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
      if (cookieCheck.ok) return true;
      // Fallback to token verification
      const res = await fetch("/api/admin/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: tok }) });
      return res.ok;
    } catch { return false; }
  }

  async function fetchIntakes(tok: string) {
    const res = await fetch("/api/intake", { headers: { Authorization: `Bearer ${tok}` } });
    if (!res.ok) throw new Error("Failed to fetch intakes");
    const data = await res.json();
    setIntakes(data.items || []);
  }

  async function loadBookings(tok: string) {
    const res = await fetch("/api/bookings", { headers: { Authorization: `Bearer ${tok}` } });
    if (!res.ok) return;
    const data = await res.json();
    setBookings(data.bookings || []);
  }

  async function login() {
    setLoading(true);
    setError("");
    const tok = tokenInput.trim();
    const ok = await verifyWithServer(tok);
    if (!ok) {
      setLoading(false);
      setError("Invalid admin token");
      return;
    }
    localStorage.setItem("__admin_session", tok);
    setAuthed(true);
    await Promise.all([fetchIntakes(tok), loadBookings(tok)]);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      if (!authed) {
        const tok = (tokenInput || "").trim();
        const ok = await verifyWithServer(tok);
        if (ok && tok) {
          setAuthed(true);
          await Promise.all([fetchIntakes(tok), loadBookings(tok)]);
        }
      }
    })();
  }, [tokenInput, authed]);

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    localStorage.removeItem("__admin_session");
    setAuthed(false);
    setIntakes([]);
    setBookings([]);
  }

  if (!authed) {
    return (
      <div className="section">
        <div className="max-w-md mx-auto card p-6 space-y-4">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <input
            className="input"
            placeholder="Paste admin token"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="btn-primary w-full" onClick={login} disabled={loading}>{loading ? 'Verifying…' : 'Enter'}</button>
        </div>
      </div>
    );
  }

  return (
    <section className="section space-y-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <button className="btn-ghost" onClick={logout}>Logout</button>
        </div>

        {/* Patient Intakes Table */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Patient Intakes (Appointments)</h2>
          <div className="overflow-auto bg-white border rounded-xl shadow">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">Phone</th>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Time</th>
                  <th className="text-left px-4 py-3">Mode</th>
                  <th className="text-left px-4 py-3">Reports</th>
                  <th className="text-left px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {intakes.map((it, i) => (
                  <tr key={it.id || i} className="border-t">
                    <td className="px-4 py-3 whitespace-nowrap">{it.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{it.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{it.phone || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{it.date || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{it.time || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{it.mode || '-'}</td>
                    <td className="px-4 py-3">
                      {it.reports && it.reports.length ? (
                        <div className="flex flex-wrap gap-2">
                          {it.reports.map((r, idx) => (
                            <a key={idx} href={r} target="_blank" rel="noopener noreferrer" className="text-herbal-700 underline">Report {idx+1}</a>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">–</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{it.createdAt ? new Date(it.createdAt).toLocaleString() : '-'}</td>
                  </tr>
                ))}
                {intakes.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-600" colSpan={8}>No intakes yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bookings (legacy) */}
        <div className="space-y-3 mt-10">
          <h2 className="text-lg font-semibold">Bookings (legacy)</h2>
          <div className="grid gap-4">
            {bookings.map((b) => (
              <div key={b._id} className="card p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">{b.name} • {b.email} • {b.phone}</div>
                  <div className="text-sm text-gray-600">{b.date} {b.time} • {b.mode} • Code: {b.code || "-"}</div>
                </div>
                <div className="text-sm">
                  <span className={`px-2 py-1 rounded ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{b.status}</span>
                </div>
              </div>
            ))}
            {bookings.length === 0 && <p className="text-gray-600">No bookings available (using Payment Link flow).</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
