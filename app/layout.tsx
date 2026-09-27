import type { Metadata } from "next";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } }).catch(() => null);
  const title = settings?.metaTitle || "Seunpaul | Affiliate Recruitment, AI Automation & Web Solutions";
  const description = settings?.metaDescription || "Portfolio of Seunpaul, an Affiliate Growth AI Automation Specialist offering affiliate recruitment, AI automation, funnels, lead generation, and web app solutions.";
  const siteUrl = await getSiteUrl();
  return {
    title: { default: title, template: `%s | ${settings?.name || "Seunpaul"}` },
    description,
    metadataBase: new URL(siteUrl),
    robots: { index: true, follow: true },
    alternates: { canonical: "/" },
    verification: settings?.googleVerification ? { google: settings.googleVerification } : undefined,
    icons: { icon: "/favicon.svg" },
    openGraph: {
      title,
      description,
      type: "website",
      url: siteUrl,
      siteName: `${settings?.name || "Seunpaul"} Portfolio`,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
