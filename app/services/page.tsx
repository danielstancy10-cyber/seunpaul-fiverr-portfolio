import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/seo";
import { serviceDefinitions } from "@/lib/services";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services | Seunpaul",
  description: "Affiliate recruitment, affiliate prospect research, influencer recruitment, lead generation, AI automation, conversion funnels, AI web apps and technical review services.",
  alternates: { canonical: "https://seunpaul-fiverr-portfolio.vercel.app/services" },
};

export default async function ServicesPage() {
  const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  const name = s?.name ?? "Seunpaul";
  const fiverrUrl = s?.fiverrUrl ?? "https://www.fiverr.com/seunpaul1009";

  return (
    <main className="content-page">
      <div className="container narrow-page">
        <nav className="page-nav" aria-label="Primary">
          <Link className="brand" href="/"><span className="brand-mark">S</span><span>{name}</span></Link>
          <Link className="btn btn-secondary small" href="/">← Portfolio</Link>
        </nav>

        <article>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><span>Services</span>
          </nav>

          <span className="eyebrow">Services</span>
          <h1>Growth, recruitment, automation, funnels and web solutions.</h1>
          <p className="lead">Each service has its own crawlable page so clients can understand what the work is for, what it covers, and how it connects to the rest of the portfolio.</p>

          <div className="service-list">
            {serviceDefinitions.map((service) => (
              <section className="service-detail" key={service.slug}>
                <h2><Link href={`/services/${service.slug}`}>{service.title}</Link></h2>
                <p>{service.answer}</p>
                <p><Link className="text-link" href={`/services/${service.slug}`}>View service details →</Link></p>
              </section>
            ))}
          </div>

          <div className="cta-card compact">
            <div>
              <h2>Need a specific scope?</h2>
              <p>Send the context through Fiverr so the requirements can be reviewed before work starts.</p>
            </div>
            <a className="btn btn-primary" href={fiverrUrl} target="_blank" rel="noreferrer">Contact on Fiverr ↗</a>
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
                "@id": absoluteUrl("/services#collection"),
                url: absoluteUrl("/services"),
                name: "Seunpaul Services",
              },
              ...serviceDefinitions.map((service) => ({
                "@type": "Service",
                "@id": absoluteUrl(`/services/${service.slug}#service`),
                name: service.title,
                description: service.answer,
                url: absoluteUrl(`/services/${service.slug}`),
                provider: { "@id": absoluteUrl("/#person") },
              })),
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
                  { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
