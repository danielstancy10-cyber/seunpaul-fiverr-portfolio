"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Metric = { value: string; label: string };
type Project = { id: string; sortOrder: number; published: boolean; category: string; title: string; description: string; seoTitle: string | null; seoDescription: string | null; tags: string[]; metrics: Metric[]; visualType: string; animation: string; videoUrl: string | null; imageUrl: string | null };
type Settings = { name: string; eyebrow: string; headline: string; subheadline: string; metaTitle: string; metaDescription: string; fiverrUrl: string; githubUrl: string | null; rating: string; reviews: string; sales: string; jobTitle: string; availability: string; location: string; siteUrl: string; googleVerification: string | null };

const blankProject = (): Omit<Project, "id" | "sortOrder"> => ({ published: true, category: "New Project", title: "New portfolio project", description: "Describe the problem, approach and outcome.", seoTitle: "", seoDescription: "", tags: ["New tag"], metrics: [{ value: "Result", label: "your metric" }], visualType: "animation", animation: "dashboard", videoUrl: null, imageUrl: null });

export default function DashboardClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [selected, setSelected] = useState<string>("");
  const [tab, setTab] = useState<"projects" | "settings">("projects");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const current = useMemo(() => projects.find(p => p.id === selected) ?? null, [projects, selected]);

  async function load() {
    const [p, s] = await Promise.all([fetch("/api/projects", { cache: "no-store" }), fetch("/api/settings", { cache: "no-store" })]);
    if (p.status === 401 || s.status === 401) { window.location.href = "/dashboard/login"; return; }
    const pd = await p.json(); const sd = await s.json();
    setProjects(pd.projects); setSettings(sd.settings);
    setSelected(prev => prev || pd.projects[0]?.id || "");
  }

  useEffect(() => { load(); }, []);

  function showNotice(text: string) { setNotice(text); window.setTimeout(() => setNotice(""), 2200); }

  async function createProject() {
    setBusy(true);
    const response = await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(blankProject()) });
    const data = await response.json();
    if (response.ok) { setProjects(prev => [...prev, data.project]); setSelected(data.project.id); showNotice("Project created"); }
    setBusy(false);
  }

  async function saveProject(event: FormEvent) {
    event.preventDefault();
    if (!current) return;
    setBusy(true);
    const response = await fetch(`/api/projects/${current.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(current) });
    if (response.ok) { const data = await response.json(); setProjects(prev => prev.map(p => p.id === current.id ? data.project : p)); showNotice("Project saved"); }
    setBusy(false);
  }

  async function deleteProject() {
    if (!current || !confirm(`Delete “${current.title}”?`)) return;
    setBusy(true);
    const response = await fetch(`/api/projects/${current.id}`, { method: "DELETE" });
    if (response.ok) { const remaining = projects.filter(p => p.id !== current.id); setProjects(remaining); setSelected(remaining[0]?.id ?? ""); showNotice("Project deleted"); }
    setBusy(false);
  }

  async function togglePublished() {
    if (!current) return;
    const updated = { ...current, published: !current.published };
    setBusy(true);
    const response = await fetch(`/api/projects/${current.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    if (response.ok) { const data = await response.json(); setProjects(prev => prev.map(p => p.id === current.id ? data.project : p)); showNotice(data.project.published ? "Project published" : "Project hidden"); }
    setBusy(false);
  }

  async function moveProject(direction: -1 | 1) {
    if (!current) return;
    const index = projects.findIndex(p => p.id === current.id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= projects.length) return;
    const copy = [...projects]; [copy[index], copy[target]] = [copy[target], copy[index]];
    setProjects(copy);
    setBusy(true);
    const response = await fetch("/api/projects/reorder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids: copy.map(p => p.id) }) });
    if (!response.ok) { showNotice("Could not reorder"); await load(); } else showNotice("Order updated");
    setBusy(false);
  }

  async function saveSettings(event: FormEvent) {
    event.preventDefault(); if (!settings) return;
    setBusy(true);
    const response = await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    if (response.ok) { const data = await response.json(); setSettings(data.settings); showNotice("Site settings saved"); }
    setBusy(false);
  }

  async function logout() { await fetch("/api/auth/logout", { method: "POST" }); window.location.href = "/"; }

  function updateProject<K extends keyof Project>(key: K, value: Project[K]) { setProjects(prev => prev.map(p => p.id === selected ? { ...p, [key]: value } : p)); }
  function updateMetric(index: number, key: keyof Metric, value: string) { if (!current) return; const metrics = [...current.metrics]; metrics[index] = { ...metrics[index], [key]: value }; updateProject("metrics", metrics); }
  function updateTag(index: number, value: string) { if (!current) return; const tags = [...current.tags]; tags[index] = value; updateProject("tags", tags); }

  return <div className="admin-shell">
    <aside className="admin-sidebar"><div className="admin-logo"><span className="brand-mark">S</span><div><strong>Seunpaul</strong><small>Portfolio CMS</small></div></div><button className={tab === "projects" ? "side-link active" : "side-link"} onClick={() => setTab("projects")}>▣ Projects <span>{projects.length}</span></button><button className={tab === "settings" ? "side-link active" : "side-link"} onClick={() => setTab("settings")}>⚙ Site settings</button><div className="sidebar-bottom"><a className="side-link" href="/" target="_blank">↗ View live site</a><button className="side-link" onClick={logout}>↪ Sign out</button></div></aside>
    <main className="admin-main"><header className="admin-topbar"><div><span className="eyebrow">Private workspace</span><h1>{tab === "projects" ? "Portfolio projects" : "Site settings"}</h1></div><div className="top-actions">{notice && <span className="save-notice">✓ {notice}</span>}<a href="/" target="_blank" className="btn btn-secondary">Preview ↗</a></div></header>
      {tab === "projects" ? <section className="cms-grid"><div className="project-list"><div className="list-head"><div><strong>{projects.length} projects</strong><small>Drag-free ordering with up/down controls</small></div><button className="btn btn-primary small" onClick={createProject} disabled={busy}>+ Add project</button></div>{projects.map((project, index) => <button key={project.id} className={`project-list-item ${selected === project.id ? "selected" : ""}`} onClick={() => setSelected(project.id)}><span className="list-num">{String(index + 1).padStart(2, "0")}</span><span className="list-copy"><strong>{project.title}</strong><small>{project.category}</small></span><span className={project.published ? "badge on" : "badge"}>{project.published ? "Live" : "Hidden"}</span></button>)}</div>
        <div className="editor-card">{current ? <form onSubmit={saveProject}><div className="editor-head"><div><span className="eyebrow">Editing project</span><h2>{current.title}</h2></div><div className="editor-actions"><button type="button" className="icon-btn" title="Move up" onClick={() => moveProject(-1)}>↑</button><button type="button" className="icon-btn" title="Move down" onClick={() => moveProject(1)}>↓</button><button type="button" className="btn btn-secondary small" onClick={togglePublished}>{current.published ? "Hide" : "Publish"}</button><button type="button" className="btn btn-danger small" onClick={deleteProject}>Delete</button><button className="btn btn-primary small" disabled={busy}>{busy ? "Saving…" : "Save changes"}</button></div></div>
          <div className="form-grid"><label>Category<input value={current.category} onChange={e => updateProject("category", e.target.value)} /></label><label>Title<input value={current.title} onChange={e => updateProject("title", e.target.value)} /></label><label className="wide">Description<textarea rows={5} value={current.description} onChange={e => updateProject("description", e.target.value)} /></label><label>SEO title<input value={current.seoTitle ?? ""} onChange={e => updateProject("seoTitle", e.target.value || null)} placeholder="Project title for search results" /></label><label>SEO description<textarea rows={3} value={current.seoDescription ?? ""} onChange={e => updateProject("seoDescription", e.target.value || null)} placeholder="One clear sentence describing this project" /></label><label>Visual type<select value={current.visualType} onChange={e => updateProject("visualType", e.target.value)}><option value="animation">CSS animation</option><option value="video">Video / MP4 / WebM</option><option value="image">Image</option></select></label><label>Animation style<select value={current.animation} onChange={e => updateProject("animation", e.target.value)}><option value="dashboard">Dashboard</option><option value="pipeline">Pipeline</option><option value="metrics">Metrics</option><option value="app">AI app</option><option value="flow">Funnel flow</option><option value="chat">Automation chat</option><option value="qualifier">Prospect qualifier</option><option value="audit">Technical audit</option></select></label><label className="wide">Video URL <input value={current.videoUrl ?? ""} onChange={e => updateProject("videoUrl", e.target.value || null)} placeholder="https://.../project-demo.mp4" /></label><label className="wide">Image URL <input value={current.imageUrl ?? ""} onChange={e => updateProject("imageUrl", e.target.value || null)} placeholder="https://.../thumbnail.jpg" /></label><div className="wide"><div className="subform-head"><strong>Tags</strong><button type="button" className="mini-add" onClick={() => updateProject("tags", [...current.tags, "New tag"])}>+ Add tag</button></div><div className="inline-fields">{current.tags.map((tag, index) => <input key={index} value={tag} onChange={e => updateTag(index, e.target.value)} />)}</div></div><div className="wide"><div className="subform-head"><strong>Metrics</strong><button type="button" className="mini-add" onClick={() => updateProject("metrics", [...current.metrics, { value: "Result", label: "metric label" }])}>+ Add metric</button></div><div className="metrics-editor">{current.metrics.map((metric, index) => <div className="metric-edit" key={index}><input value={metric.value} onChange={e => updateMetric(index, "value", e.target.value)} placeholder="Value" /><input value={metric.label} onChange={e => updateMetric(index, "label", e.target.value)} placeholder="Label" /></div>)}</div></div></div></form> : <div className="empty-editor"><span className="brand-mark large">S</span><h2>Add your first project</h2><p>Create a portfolio item from the left panel. Everything you save here is stored in PostgreSQL and rendered on the public site.</p><button className="btn btn-primary" onClick={createProject}>+ Create project</button></div>}</div></section> : <section className="settings-card"><form onSubmit={saveSettings}><div className="settings-intro"><span className="eyebrow">Global content</span><h2>Edit the portfolio without code.</h2><p>These fields power the homepage, SEO metadata, structured data and Fiverr CTAs.</p></div>{settings && <div className="form-grid"><label>Name<input value={settings.name} onChange={e => setSettings({ ...settings, name: e.target.value })} /></label><label>Job title<input value={settings.jobTitle} onChange={e => setSettings({ ...settings, jobTitle: e.target.value })} /></label><label>Eyebrow text<input value={settings.eyebrow} onChange={e => setSettings({ ...settings, eyebrow: e.target.value })} /></label><label>Availability<input value={settings.availability} onChange={e => setSettings({ ...settings, availability: e.target.value })} /></label><label className="wide">Headline<input value={settings.headline} onChange={e => setSettings({ ...settings, headline: e.target.value })} /></label><label className="wide">Subheadline<textarea rows={5} value={settings.subheadline} onChange={e => setSettings({ ...settings, subheadline: e.target.value })} /></label><label className="wide">SEO title<input value={settings.metaTitle} onChange={e => setSettings({ ...settings, metaTitle: e.target.value })} placeholder="About 50–60 characters" /></label><label className="wide">SEO description<textarea rows={3} value={settings.metaDescription} onChange={e => setSettings({ ...settings, metaDescription: e.target.value })} placeholder="Clear description for Google and AI search systems" /></label><label>Fiverr URL<input type="url" value={settings.fiverrUrl} onChange={e => setSettings({ ...settings, fiverrUrl: e.target.value })} /></label><label>GitHub URL<input type="url" value={settings.githubUrl ?? ""} onChange={e => setSettings({ ...settings, githubUrl: e.target.value || null })} /></label><label>Site URL<input type="url" value={settings.siteUrl} onChange={e => setSettings({ ...settings, siteUrl: e.target.value })} /></label><label>Location / country<input value={settings.location} onChange={e => setSettings({ ...settings, location: e.target.value })} /></label><label>Fiverr rating<input value={settings.rating} onChange={e => setSettings({ ...settings, rating: e.target.value })} /></label><label>Reviews<input value={settings.reviews} onChange={e => setSettings({ ...settings, reviews: e.target.value })} /></label><label>Affiliate sales stat<input value={settings.sales} onChange={e => setSettings({ ...settings, sales: e.target.value })} /></label><label>Google verification token<input value={settings.googleVerification ?? ""} onChange={e => setSettings({ ...settings, googleVerification: e.target.value || null })} placeholder="Paste the token from Search Console" /></label></div>}<div className="settings-save"><button className="btn btn-primary" disabled={busy}>{busy ? "Saving…" : "Save site settings"}</button></div></form></section>}
    </main></div>;
}
