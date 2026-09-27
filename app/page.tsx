import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProjectVisual } from "@/components/project-visual";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

type Metric = { value: string; label: string };

const services = [
  ["↗", "Affiliate Recruitment", "Prospect research, qualification, outreach, follow-up, onboarding, and activation systems for affiliate programs."],
  ["◎", "AI Automation", "Event-driven workflows, lead handling, notifications, follow-up logic, and operational automation."],
  ["⌁", "Funnels & CRO", "Landing pages, lead capture flows, offer paths, thank-you pages, and conversion-focused UX."],
  ["◌", "Lead Generation", "Research and qualification systems designed to produce useful prospects, not just large spreadsheets."],
  ["▣", "Web Apps & MVPs", "High-fidelity interfaces for AI apps, business tools, SaaS products, and MVPs."],
  ["✓", "Technical Reviews", "Architecture-aware audits, gap analysis, validation requirements, test criteria, and implementation handoff."],
];

const faqs = [
  ["What does Seunpaul do?", "Seunpaul is a freelancer focused on affiliate recruitment, influencer sourcing, AI automation, lead generation, conversion funnels, and practical web solutions."],
  ["What types of businesses can Seunpaul help?", "The portfolio focuses on SaaS, eCommerce, affiliate programs, creator-led growth, and businesses that need lead or automation systems."],
  ["Can Seunpaul build AI web apps?", "Yes. The portfolio includes AI web app and MVP work covering product UX, interfaces, APIs, database-aware flows, and deployment-oriented implementation."],
  ["Can I hire Seunpaul through Fiverr?", "Yes. Project enquiries and scope discussions are handled through the Seunpaul Fiverr profile."],
  ["Where is Seunpaul based?", "Seunpaul is based in Nigeria and works with clients through online freelance delivery."],
  ["How does a project start?", "The process starts with understanding the problem, audience, current tools, constraints, and desired outcome before mapping and building the agreed solution."],
];

function jsonLd(data: object) {
  return <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

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
    metaTitle: "Seunpaul | Affiliate Recruitment, AI Automation & Web Solutions",
    metaDescription: "Portfolio of Seunpaul, an Affiliate Growth AI Automation Specialist offering affiliate recruitment, AI automation, funnels, lead generation, and web app solutions.",
    fiverrUrl: "https://www.fiverr.com/seunpaul1009",
    githubUrl: "https://github.com/danielstancy10-cyber/seunpaul-fiverr-portfolio",
    rating: "5.0★",
    reviews: "7",
    sales: "$12K+",
    jobTitle: "Affiliate Growth AI Automation Specialist",
    availability: "Available",
    location: "Nigeria",
    siteUrl: "https://seunpaul-fiverr-portfolio.vercel.app",
    googleVerification: null,
  };

  const siteUrl = await getSiteUrl();
  const personId = `${siteUrl}/#person`;
  const profileId = `${siteUrl}/#profile`;

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Link className="brand" href="#top"><span className="brand-mark">S</span><span>{s.name}</span></Link>
          <div className="nav-links"><a href="#work">Work</a><a href="/services">Services</a><a href="/about">About</a><a href="/faq">FAQ</a></div>
          <Link className="nav-cta" href={s.fiverrUrl} target="_blank" rel="noreferrer">Hire me on Fiverr ↗</Link>
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
                <Link className="btn btn-primary" href={s.fiverrUrl} target="_blank" rel="noreferrer">Start a project on Fiverr ↗</Link>
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

        <section aria-labelledby="positioning-heading"><div className="container"><div className="trust reveal visible"><div className="trust-card"><strong>Growth-first</strong><span>Build around business outcomes, not just deliverables.</span></div><div className="trust-card"><strong>Systems mindset</strong><span>Connect research, outreach, funnels, tracking, and automation.</span></div><div className="trust-card"><strong>Practical execution</strong><span>From landing pages to technical validation and handoff.</span></div><div className="trust-card"><strong>Based in {s.location}</strong><span>Online freelance delivery through Fiverr and project workflows.</span></div></div><h2 id="positioning-heading" className="sr-only">Freelance growth, automation and web services</h2></div></section>

        <section id="work" className="section-anchor" aria-labelledby="work-heading">
          <div className="container">
            <div className="section-head reveal visible"><div><span className="eyebrow">{String(projects.length).padStart(2, "0")} motion showcases</span><h2 id="work-heading">Selected work, built to move.</h2></div><p>Project details, outcomes, and visuals are managed from the private dashboard.</p></div>
            <div className="showcase">
              {projects.map((project, index) => {
                const metrics = Array.isArray(project.metrics) ? (project.metrics as unknown as Metric[]) : [];
                return <article className={`project reveal visible ${index % 2 ? "reverse" : ""}`} key={project.id}>
                  <div className="project-info"><span className="project-num">{String(index + 1).padStart(2, "0")} / {project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><div className="project-metric">{metrics.map(metric => <div key={`${metric.value}-${metric.label}`}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div><Link className="text-link" href={`/work/${project.id}`}>Read project details →</Link></div>
                  <div className="project-visual"><ProjectVisual project={project} /></div>
                </article>;
              })}
            </div>
          </div>
        </section>

        <section id="services" className="section-anchor" aria-labelledby="services-heading"><div className="container"><div className="section-head reveal visible"><div><span className="eyebrow">What I do</span><h2 id="services-heading">Services that connect.</h2></div><p>Clear service definitions help clients — and search systems — understand what each engagement is for.</p></div><div className="services">{services.map(([icon, title, description]) => <article className="service reveal visible" key={title}><div className="service-icon">{icon}</div><h3>{title}</h3><p>{description}</p></article>)}</div><div className="section-actions"><Link className="btn btn-secondary" href="/services">Explore all services →</Link></div></div></section>

        <section id="process" className="section-anchor" aria-labelledby="process-heading"><div className="container"><div className="section-head reveal visible"><div><span className="eyebrow">How I work</span><h2 id="process-heading">From problem → system.</h2></div><p>A simple operating model keeps scope clear while leaving room for practical iteration.</p></div><div className="process">{[["01", "Understand", "Clarify the business problem, audience, current stack, constraints, and success conditions."], ["02", "Structure", "Map the funnel, data, workflow, UX, or technical system before adding complexity."], ["03", "Build", "Execute the agreed scope with practical interfaces, automation logic, and documentation."], ["04", "Handoff", "Deliver clear outputs, next steps, acceptance criteria, and a path for future improvements."]].map(([number, title, text]) => <article className="step reveal visible" key={number}><div className="step-number">{number}</div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

        <section id="faq" className="section-anchor faq-section" aria-labelledby="faq-heading"><div className="container"><div className="section-head reveal visible"><div><span className="eyebrow">Quick answers</span><h2 id="faq-heading">Frequently asked questions.</h2></div><p>Short, direct answers make the portfolio easier to scan for both people and answer engines.</p></div><div className="faq-grid">{faqs.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>

        <section className="cta"><div className="container"><div className="cta-card reveal visible"><div><h2>Have a growth or automation problem?</h2><p>Send the context on Fiverr. I’ll review the scope and help turn the messy part into a clearer next step.</p></div><Link className="btn btn-primary" href={s.fiverrUrl} target="_blank" rel="noreferrer">Message {s.name} on Fiverr ↗</Link></div></div></section>
      </main>
      <footer><div className="container footer-inner"><span>© {new Date().getFullYear()} {s.name}. All rights reserved.</span><span><a href={s.githubUrl ?? "#"} target="_blank" rel="noreferrer">GitHub</a> · <Link href={s.fiverrUrl} target="_blank" rel="noreferrer">Fiverr profile</Link></span></div></footer>

      {jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ProfilePage",
            "@id": profileId,
            "url": siteUrl,
            "name": s.name,
            "description": s.metaDescription,
            "mainEntity": { "@id": personId },
            "dateModified": settings?.updatedAt?.toISOString(),
          },
          {
            "@type": "Person",
            "@id": personId,
            "name": s.name,
            "jobTitle": s.jobTitle,
            "description": s.metaDescription,
            "url": siteUrl,
            "sameAs": [s.fiverrUrl, s.githubUrl].filter(Boolean),
            "address": { "@type": "PostalAddress", "addressCountry": s.location },
            "knowsAbout": ["Affiliate Recruitment", "Influencer Marketing", "AI Automation", "Lead Generation", "Conversion Rate Optimization", "AI Web Apps", "SaaS", "eCommerce"],
          },
          {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            "url": siteUrl,
            "name": `${s.name} Portfolio`,
            "description": s.metaDescription,
            "inLanguage": "en",
          },
        ],
      })}
    </>
  );
}
