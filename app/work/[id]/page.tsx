import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectVisual } from "@/components/project-visual";
import { getSiteUrl } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await prisma.project.findFirst({ where: { id, published: true } });
  if (!project) return { title: "Project not found" };
  return {
    title: project.seoTitle || `${project.title} | Seunpaul Portfolio`,
    description: project.seoDescription || project.description,
    alternates: { canonical: `/work/${project.id}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await prisma.project.findFirst({ where: { id, published: true } });
  if (!project) notFound();
  const metrics = Array.isArray(project.metrics) ? project.metrics as { value: string; label: string }[] : [];
  const siteUrl = await getSiteUrl();
  return <main className="content-page"><div className="container project-page"><nav className="page-nav"><Link className="brand" href="/"><span className="brand-mark">S</span><span>Seunpaul</span></Link><Link className="btn btn-secondary small" href="/">← Portfolio</Link></nav><article><span className="eyebrow">{project.category}</span><h1>{project.title}</h1><p className="lead">{project.description}</p><div className="project-detail-grid"><div className="project-detail-visual"><ProjectVisual project={project} /></div><div><h2>Project snapshot</h2><div className="tag-row">{project.tags.map(tag=><span className="tag" key={tag}>{tag}</span>)}</div><div className="project-metric detail-metrics">{metrics.map(m=><div key={`${m.value}-${m.label}`}><strong>{m.value}</strong><span>{m.label}</span></div>)}</div></div></div><h2>What this work shows</h2><p>{project.description}</p><p>Selected portfolio information is presented as an example of the type of work delivered. Results and metrics shown on this page should be understood in the context of the specific project rather than as a guarantee of future performance.</p><p><Link className="btn btn-primary" href="https://www.fiverr.com/seunpaul1009" target="_blank" rel="noreferrer">Discuss a similar project on Fiverr ↗</Link></p></article></div>{jsonLd({"@context":"https://schema.org","@type":"CreativeWork","name":project.title,"description":project.description,"url":`${siteUrl}/work/${project.id}`,"author":{"@type":"Person","name":"Seunpaul","url":`${siteUrl}/`},"keywords":project.tags.join(", "),"image":project.imageUrl || undefined})}</main>;
}
function jsonLd(data: object) { return <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />; }
