import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Work & Case Studies",
  description: "Selected portfolio projects covering affiliate recruitment, lead generation, AI automation, conversion-focused funnels, AI web apps and technical reviews.",
  path: "/work",
});

export default async function WorkPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <main className="content-page">
      <div className="container narrow-page">
        <nav className="page-nav" aria-label="Primary">
          <Link className="brand" href="/"><span className="brand-mark">S</span><span>Seunpaul</span></Link>
          <Link className="btn btn-secondary small" href="/">← Portfolio</Link>
        </nav>

        <article>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><span>Work</span>
          </nav>

          <span className="eyebrow">Work</span>
          <h1>Selected work, case studies and project examples.</h1>
          <p className="lead">Published project pages make the portfolio evidence easier to inspect, link to, and understand independently from the homepage.</p>

          <div className="work-index-grid">
            {projects.map((project) => (
              <article className="work-index-card" key={project.id}>
                <span className="project-num">{project.category}</span>
                <h2><Link href={`/work/${project.id}`}>{project.title}</Link></h2>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.tags.slice(0, 5).map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                </div>
                <Link className="text-link" href={`/work/${project.id}`}>Read project details →</Link>
              </article>
            ))}
          </div>

          <div className="cta-card compact">
            <div>
              <h2>Need a similar system?</h2>
              <p>Project enquiries and scope discussions are handled through the Fiverr profile.</p>
            </div>
            <a className="btn btn-primary" href="https://www.fiverr.com/seunpaul1009" target="_blank" rel="noreferrer">Discuss a project on Fiverr ↗</a>
          </div>
        </article>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": absoluteUrl("/work#collection"),
                url: absoluteUrl("/work"),
                name: "Selected work, case studies and project examples",
              },
              {
                "@type": "ItemList",
                "@id": absoluteUrl("/work#project-list"),
                itemListElement: projects.map((project, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: project.title,
                  url: absoluteUrl(`/work/${project.id}`),
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
                  { "@type": "ListItem", position: 2, name: "Work", item: absoluteUrl("/work") },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
