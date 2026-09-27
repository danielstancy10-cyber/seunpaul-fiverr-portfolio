import type { Metadata } from "next";
import "./globals.css";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } }).catch(() => null);
  const siteUrl = settings?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://YOUR-DOMAIN.com";
  return {
    title: settings ? `${settings.name} — ${settings.jobTitle}` : "Seunpaul — Affiliate Growth, AI Automation & Web Solutions",
    description: settings?.subheadline || "Portfolio of Seunpaul, an Affiliate Growth AI Automation Specialist.",
    metadataBase: new URL(siteUrl),
    robots: { index: true, follow: true },
    alternates: { canonical: siteUrl },
    verification: settings?.googleVerification ? { google: settings.googleVerification } : undefined,
    openGraph: {
      title: settings ? `${settings.name} — ${settings.jobTitle}` : "Seunpaul Portfolio",
      description: settings?.subheadline || "Growth, automation, funnels, lead generation, and web solutions.",
      type: "website",
      url: siteUrl,
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
