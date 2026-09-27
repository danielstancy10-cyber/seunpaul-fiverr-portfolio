import { prisma } from "@/lib/prisma";

export const DEFAULT_SITE_URL = "https://seunpaul-fiverr-portfolio.vercel.app";

export async function getSiteUrl() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 }, select: { siteUrl: true } }).catch(() => null);
  const fromDb = settings?.siteUrl?.trim().replace(/\/$/, "");
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  const candidate = fromDb || fromEnv;
  return candidate && !candidate.includes("YOUR-DOMAIN.com") ? candidate : DEFAULT_SITE_URL;
}
