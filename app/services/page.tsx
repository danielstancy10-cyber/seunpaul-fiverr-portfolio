import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services | Affiliate Recruitment, AI Automation & Web Solutions",
  description: "Services from Seunpaul: affiliate recruitment, influencer sourcing, AI automation, funnels and CRO, lead generation, AI web apps, and technical reviews.",
  alternates: { canonical: "/services" },
};

const services = [
  ["Affiliate Recruitment", "Research, qualify, outreach, follow up, onboard, and activate relevant affiliates and partners."],
  ["Influencer Sourcing", "Find creators using niche relevance, audience fit, engagement context, contact quality, and promotional history."],
  ["AI Automation", "Build practical workflows that connect triggers, data, notifications, follow-up, CRM logic, and handoff rules."],
  ["Funnels & CRO", "Design landing pages, lead forms, offer paths, thank-you experiences, and conversion-focused journeys."],
  ["Lead Generation", "Create research and qualification systems that prioritize relevance and useful next actions over raw volume."],
  ["AI Web Apps & MVPs", "Build modern product interfaces and MVP flows with API, data, UX, and deployment considerations in mind."],
  ["Technical Reviews", "Audit existing systems, separate verified findings from validation dependencies, and produce implementation-ready handoff notes."],
];

export default async function ServicesPage() {
  const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  const name = s?.name ?? "Seunpaul";
  return <main className="content-page"><div className="container narrow-page"><nav className="page-nav"><Link className="brand" href="/"><span className="brand-mark">S</span><span>{name}</span></Link><Link className="btn btn-secondary small" href="/">← Portfolio</Link></nav><article><span className="eyebrow">Services</span><h1>Growth, automation, funnels and web solutions.</h1><p className="lead">Each service is defined by the business problem it helps solve, the type of work involved, and the practical output you can expect.</p><div className="service-list">{services.map(([title, description]) => <section className="service-detail" key={title}><h2>{title}</h2><p>{description}</p></section>)}</div><div className="cta-card compact"><div><h2>Need a specific scope?</h2><p>Send the context through Fiverr and I can review the requirements before work starts.</p></div><a className="btn btn-primary" href={s?.fiverrUrl ?? "https://www.fiverr.com/seunpaul1009"} target="_blank" rel="noreferrer">Contact on Fiverr ↗</a></div></article></div>{jsonLd({"@context":"https://schema.org","@graph":services.map(([title,description])=>({"@type":"Service","name":title,"description":description,"provider":{"@type":"Person","name":name,"url":"https://seunpaul-fiverr-portfolio.vercel.app/"}}))})}</main>;
}
function jsonLd(data: object) { return <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />; }
