import Script from "next/script";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import { DEFAULT_SITE_URL } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#050b14",
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings
    .findUnique({ where: { id: 1 } })
    .catch(() => null);

  const title =
    settings?.metaTitle ||
    "Seunpaul | Affiliate Recruitment, AI Automation & Web Solutions";

  const description =
    settings?.metaDescription ||
    "Portfolio of Seunpaul covering affiliate recruitment, affiliate prospect research, influencer sourcing, AI automation, lead generation, conversion funnels, and AI web app development.";

  return {
    title: {
      default: title,
      template: "%s | Seunpaul",
    },

    description,

    metadataBase: new URL(DEFAULT_SITE_URL),

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: DEFAULT_SITE_URL,
    },

    verification: settings?.googleVerification
      ? {
          google: settings.googleVerification,
        }
      : undefined,

    icons: {
      icon: "/favicon.svg",
    },

    manifest: "/site.webmanifest",

    openGraph: {
      title,
      description,
      type: "website",
      url: DEFAULT_SITE_URL,
      siteName: "Seunpaul Portfolio",
      locale: "en_US",

      images: [
        {
          url: `${DEFAULT_SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${DEFAULT_SITE_URL}/opengraph-image`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics / Google tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W9T25LC9Z6"
          strategy="afterInteractive"
        />

        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W9T25LC9Z6');
          `}
        </Script>
      </head>

      <body>{children}</body>
    </html>
  );
}