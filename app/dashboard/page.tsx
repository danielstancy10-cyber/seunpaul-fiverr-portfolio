import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import DashboardClient from "./dashboard-client";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!(await isAdmin())) redirect("/dashboard/login");
  return <DashboardClient />;
}
