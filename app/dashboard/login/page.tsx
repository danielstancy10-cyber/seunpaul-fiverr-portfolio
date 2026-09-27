"use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (response.ok) window.location.href = "/dashboard";
    else setError("Incorrect password. Check ADMIN_PASSWORD in your environment variables.");
    setBusy(false);
  }

  return <main className="auth-page"><form className="auth-card" onSubmit={submit}><div className="brand-mark large">S</div><span className="eyebrow">Private portfolio dashboard</span><h1>Welcome back</h1><p>Manage your projects, animations, metrics and site settings without editing the source code.</p><label>Password<input autoFocus type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Admin password" /></label>{error && <div className="form-error">{error}</div>}<button className="btn btn-primary full" disabled={busy}>{busy ? "Signing in…" : "Open dashboard →"}</button><a className="back-link" href="/">← Back to portfolio</a></form></main>;
}
