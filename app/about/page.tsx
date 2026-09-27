import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });

  return {
    title: `About ${s?.name ?? "Seunpaul"}`,
    description: `Learn about ${s?.name ?? "Seunpaul"}, an ${s?.jobTitle ?? "Affiliate Growth AI Automation Specialist"} based in ${s?.location ?? "Nigeria"}.`,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const s = await prisma.siteSettings.findUnique({ where: { id: 1 } });

  const name = s?.name ?? "Seunpaul";
  const jobTitle =
    s?.jobTitle ?? "Affiliate Growth AI Automation Specialist";
  const location = s?.location ?? "Nigeria";
  const siteUrl = await getSiteUrl();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": siteUrl + "/about#profile",
    "url": siteUrl + "/about",
    "mainEntity": {
      "@type": "Person",
      "@id": siteUrl + "/#person",
      "name": name,
      "jobTitle": jobTitle,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": location,
      },
      "sameAs": [
        s?.fiverrUrl,
        s?.githubUrl,
      ].filter(Boolean),
    },
  };

  return (
    <main className="content-page">
      <div className="container narrow-page">
        <nav className="page-nav">
          <Link className="brand" href="/">
            <span className="brand-mark">S</span>
            <span>{name}</span>
          </Link>

          <Link className="btn btn-secondary small" href="/">
            ← Portfolio
          </Link>
        </nav>

        <article>
          <span className="eyebrow">About</span>

          <h1>
            {name}: {jobTitle}
          </h1>

          <p className="lead">
            {name} is a freelancer based in {location}, focused on practical
            growth, automation, lead generation, conversion systems, and
            modern web solutions.
          </p>

          <h2>What I focus on</h2>

          <p>
            I work across affiliate recruitment, influencer sourcing, AI
            automation, funnels and conversion-focused user experiences, lead
            generation, AI web apps, and technical project reviews.
          </p>

          <h2>How I work</h2>

          <p>
            Projects start with the problem: who the user is, what needs to
            happen, what tools already exist, and what a useful outcome looks
            like. From there I structure the workflow, execute the agreed
            scope, and hand over a clear system or documented next step.
          </p>

          <h2>Where to hire me</h2>

          <p>
            Project enquiries are handled through my Fiverr profile. The
            portfolio shows selected work and is designed to make the type of
            work, process, and evidence easier to understand before starting a
            project.
          </p>

          <p>
            <a
              className="btn btn-primary"
              href={
                s?.fiverrUrl ??
                "https://www.fiverr.com/seunpaul1009"
              }
              target="_blank"
              rel="noreferrer"
            >
              Visit my Fiverr profile ↗
            </a>
          </p>
        </article>
      </div>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </main>
  );
}
