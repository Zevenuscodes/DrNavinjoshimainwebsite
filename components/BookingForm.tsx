"use client";
import { useMemo, useState } from 'react';

export function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mode, setMode] = useState("Online");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const canPay = useMemo(() => {
    return !!name && !!email && !!phone && !!date && !!time;
  }, [name, email, phone, date, time]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canPay) return;
    setLoading(true);

    const form = e.currentTarget;
    const notes = (form.querySelector('textarea') as HTMLTextAreaElement)?.value || '';
    const files = (form.querySelector('input[type="file"]') as HTMLInputElement)?.files;

    try {
      const fd = new FormData();
      fd.set('name', name);
      fd.set('email', email);
      fd.set('phone', phone);
      fd.set('mode', mode);
      fd.set('date', date);
      fd.set('time', time);
      fd.set('notes', notes);
      if (files) Array.from(files).forEach(f => fd.append('reports', f));
      await fetch('/api/intake', { method: 'POST', body: fd });
    } catch (err) {
      console.error('Failed saving intake', err);
    }

    const paymentLink = "https://rzp.io/rzp/ZxTpXeJ1"; // Razorpay Payment Page
    window.location.href = paymentLink;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <input className="input" placeholder="Full Name*" required value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="input" placeholder="Email*" required value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="input" placeholder="Phone*" required value={phone} onChange={(e)=>setPhone(e.target.value)} />
        <select className="input" value={mode} onChange={(e)=>setMode(e.target.value)}>
          <option>Online</option>
          <option>In-Clinic</option>
        </select>
        <input className="input" type="date" required value={date} onChange={(e)=>setDate(e.target.value)} />
        <input className="input" type="time" required value={time} onChange={(e)=>setTime(e.target.value)} />
      </div>
      <textarea className="input h-28" placeholder="Health concern / notes (optional)" />
      <div>
        <label className="block text-sm text-gray-600 mb-1">Upload reports (PDF/JPG/PNG)</label>
        <input className="input" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" />
      </div>
      <button disabled={loading || !canPay} className="btn-primary w-full">{loading ? 'Saving…' : 'Pay Now'}</button>
    </form>
  );
}
