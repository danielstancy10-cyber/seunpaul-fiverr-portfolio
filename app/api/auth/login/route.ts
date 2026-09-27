import { NextResponse } from "next/server";
import { createSessionToken, cookieName, sessionCookieOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }));
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password !== expected) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieName(), createSessionToken(), sessionCookieOptions());
  return response;
}
