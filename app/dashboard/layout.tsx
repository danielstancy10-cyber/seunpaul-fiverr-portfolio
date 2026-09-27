import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Dashboard — Seunpaul",
  robots: { index: false, follow: false, nocache: true },
};

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
