import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProjectVisual } from "@/components/project-visual";

export const dynamic = "force-dynamic";

type Metric = { value: string; label: string };

const services = [
  ["↗", "Affiliate Recruitment", "Prospect research, qualification, outreach, follow-up, onboarding, and activation systems for affiliate programs."],
  ["◎", "AI Automation", "Event-driven workflows, lead handling, notifications, follow-up logic, and operational automation."],
  ["⌁", "Funnels & CRO", "Landing pages, lead capture flows, offer paths, thank-you pages, and conversion-focused UX."],
  ["◌", "Lead Generation", "Research and qualification systems designed to produce useful prospects, not just large spreadsheets."],
  ["▣", "Web Apps & MVPs", "High-fidelity interfaces and practical product flows for AI apps, business tools, and MVPs."],
  ["✓", "Technical Reviews", "Architecture-aware audits, gap analysis, validation requirements, test criteria, and implementation handoff."],
];

export default async function HomePage() {
  const [settings, projects] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
    prisma.project.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
  ]);

  const s = settings ?? {
    name: "Seunpaul",
    eyebrow: "Fiverr Portfolio · Growth · Automation · Web",
    headline: "Building systems that turn attention into action.",
    subheadline: "I help SaaS and eCommerce brands grow with affiliate recruitment, influencer sourcing, funnels, AI automation, lead generation, and practical web solutions.",
    fiverrUrl: "https://www.fiverr.com/seunpaul1009",
    rating: "5.0★",
    reviews: "7",
    sales: "$12K+",
    jobTitle: "Affiliate Growth AI Automation Specialist",
    availability: "Available",
  };

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Link className="brand" href="#top"><span className="brand-mark">S</span><span>{s.name}</span></Link>
          <div className="nav-links"><a href="#work">Work</a><a href="#services">Services</a><a href="#process">Process</a></div>
          <Link className="nav-cta" href={s.fiverrUrl} target="_blank">Hire me on Fiverr ↗</Link>
        </div>
      </nav>

      <main id="top">
        <header className="hero">
          <div className="container hero-grid">
            <div className="reveal visible">
              <span className="eyebrow">{s.eyebrow}</span>
              <h1><span className="gradient">{s.headline}</span></h1>
              <p>{s.subheadline}</p>
              <div className="actions">
                <Link className="btn btn-primary" href={s.fiverrUrl} target="_blank">Start a project on Fiverr ↗</Link>
                <a className="btn btn-secondary" href="#work">Watch the work ↓</a>
              </div>
            </div>
            <aside className="hero-card reveal visible">
              <div className="profile-top"><div className="profile-id"><div className="avatar">SP</div><div><strong>{s.name}</strong><small>{s.jobTitle}</small></div></div><span className="status">● {s.availability}</span></div>
              <div className="stat-grid"><div className="stat"><strong>{s.rating}</strong><span>Fiverr rating</span></div><div className="stat"><strong>{s.reviews}</strong><span>Fiverr reviews</span></div><div className="stat"><strong>{s.sales}</strong><span>Affiliate-driven sales</span></div></div>
              <div className="ticker"><span className="pill">Affiliate Recruitment</span><span className="pill">AI Automation</span><span className="pill">Funnels & CRO</span><span className="pill">Lead Generation</span><span className="pill">Web Apps</span></div>
            </aside>
          </div>
        </header>

        <section><div className="container"><div className="trust reveal visible"><div className="trust-card"><strong>Growth-first</strong><span>Build around business outcomes, not just deliverables.</span></div><div className="trust-card"><strong>Systems mindset</strong><span>Connect research, outreach, funnels, tracking, and automation.</span></div><div className="trust-card"><strong>Practical execution</strong><span>From landing pages to technical validation and handoff.</span></div><div className="trust-card"><strong>Fiverr-ready</strong><span>Clear scope, communication, and documented delivery.</span></div></div></div></section>

        <section id="work" className="section-anchor">
          <div className="container">
            <div className="section-head reveal visible"><div><span className="eyebrow">{String(projects.length).padStart(2, "0")} motion showcases</span><h2>Selected work, built to move.</h2></div><p>Add, edit, reorder, hide, or delete every project from the private dashboard.</p></div>
            <div className="showcase">
              {projects.map((project, index) => {
                const metrics = Array.isArray(project.metrics) ? (project.metrics as unknown as Metric[]) : [];
                return <article className={`project reveal visible ${index % 2 ? "reverse" : ""}`} key={project.id}>
                  <div className="project-info"><span className="project-num">{String(index + 1).padStart(2, "0")} / {project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><div className="project-metric">{metrics.map(metric => <div key={`${metric.value}-${metric.label}`}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div></div>
                  <div className="project-visual"><ProjectVisual project={project} /></div>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section id="services" className="section-anchor"><div className="container"><div className="section-head reveal visible"><div><span className="eyebrow">What I do</span><h2>Services that connect.</h2></div><p>The strongest projects often sit between marketing, automation, and product execution.</p></div><div className="services">{services.map(([icon, title, description]) => <article className="service reveal visible" key={title}><div className="service-icon">{icon}</div><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
        <section id="process" className="section-anchor"><div className="container"><div className="section-head reveal visible"><div><span className="eyebrow">How I work</span><h2>From problem → system.</h2></div><p>A simple operating model keeps scope clear while leaving room for practical iteration.</p></div><div className="process">{[["01", "Understand", "Clarify the business problem, audience, current stack, constraints, and success conditions."], ["02", "Structure", "Map the funnel, data, workflow, UX, or technical system before adding complexity."], ["03", "Build", "Execute the agreed scope with practical interfaces, automation logic, and documentation."], ["04", "Handoff", "Deliver clear outputs, next steps, acceptance criteria, and a path for future improvements."]].map(([number, title, text]) => <article className="step reveal visible" key={number}><div className="step-number">{number}</div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

        <section className="cta"><div className="container"><div className="cta-card reveal visible"><div><h2>Have a growth or automation problem?</h2><p>Send the context on Fiverr. I’ll review the scope and help turn the messy part into a clearer next step.</p></div><Link className="btn btn-primary" href={s.fiverrUrl} target="_blank">Message {s.name} on Fiverr ↗</Link></div></div></section>
      </main>
      <footer><div className="container footer-inner"><span>© {new Date().getFullYear()} {s.name}. All rights reserved.</span><span><Link href={s.fiverrUrl} target="_blank">Fiverr profile</Link></span></div></footer>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: s.name, url: s.fiverrUrl, sameAs: [s.fiverrUrl], jobTitle: s.jobTitle, description: s.subheadline }) }} />
    </>
  );
}
