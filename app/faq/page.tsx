import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FAQ | Seunpaul Portfolio",
  description: "Answers about Seunpaul's affiliate recruitment, AI automation, lead generation, funnels, web app, and freelance workflow services.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  ["What does Seunpaul do?", "Seunpaul focuses on affiliate recruitment, influencer sourcing, AI automation, lead generation, conversion funnels, and practical web solutions."],
  ["Can I hire Seunpaul through Fiverr?", "Yes. Project enquiries and scope discussions are handled through the Seunpaul Fiverr profile."],
  ["Where is Seunpaul based?", "Seunpaul is based in Nigeria and delivers freelance work online."],
  ["Can Seunpaul build an AI web app or MVP?", "Yes. The portfolio includes AI web app and MVP work covering product UX, APIs, database-aware flows, and deployment-oriented implementation."],
  ["What happens before a project starts?", "The first step is to understand the business problem, audience, existing tools, constraints, and desired outcome. The agreed scope is then structured before execution."],
];

export default async function FaqPage() {
  const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return <main className="content-page"><div className="container narrow-page"><nav className="page-nav"><Link className="brand" href="/"><span className="brand-mark">S</span><span>{s?.name ?? "Seunpaul"}</span></Link><Link className="btn btn-secondary small" href="/">← Portfolio</Link></nav><article><span className="eyebrow">FAQ</span><h1>Answers to common project questions.</h1><p className="lead">These concise answers explain the services, workflow, location, and best way to start an engagement.</p><div className="faq-page-list">{faqs.map(([q,a])=><section className="faq-answer" key={q}><h2>{q}</h2><p>{a}</p></section>)}</div></article></div></main>;
}
