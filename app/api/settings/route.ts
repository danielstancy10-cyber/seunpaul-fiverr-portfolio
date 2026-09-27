import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const settings = await prisma.siteSettings.upsert({ where: { id: 1 }, update: {
    name: String(body.name || "Seunpaul"),
    eyebrow: String(body.eyebrow || "Fiverr Portfolio · Growth · Automation · Web"),
    headline: String(body.headline || "Building systems that turn attention into action."),
    subheadline: String(body.subheadline || ""),
    metaTitle: String(body.metaTitle || "Seunpaul | Affiliate Recruitment, AI Automation & Web Solutions"),
    metaDescription: String(body.metaDescription || "Portfolio of Seunpaul, an Affiliate Growth AI Automation Specialist offering affiliate recruitment, AI automation, funnels, lead generation, and web app solutions."),
    fiverrUrl: String(body.fiverrUrl || "https://www.fiverr.com/seunpaul1009"),
    githubUrl: body.githubUrl ? String(body.githubUrl) : null,
    rating: String(body.rating || ""),
    reviews: String(body.reviews || ""),
    sales: String(body.sales || ""),
    jobTitle: String(body.jobTitle || ""),
    availability: String(body.availability || "Available"),
    location: String(body.location || "Nigeria"),
    siteUrl: String(body.siteUrl || "https://seunpaul-fiverr-portfolio.vercel.app"),
    googleVerification: body.googleVerification ? String(body.googleVerification) : null,
  }, create: { id: 1 } });
  return NextResponse.json({ settings });
}
