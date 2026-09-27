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
    fiverrUrl: String(body.fiverrUrl || "https://www.fiverr.com/seunpaul1009"),
    rating: String(body.rating || ""),
    reviews: String(body.reviews || ""),
    sales: String(body.sales || ""),
    jobTitle: String(body.jobTitle || ""),
    availability: String(body.availability || "Available"),
    siteUrl: String(body.siteUrl || "https://YOUR-DOMAIN.com"),
    googleVerification: body.googleVerification ? String(body.googleVerification) : null,
  }, create: { id: 1 } });
  return NextResponse.json({ settings });
}
