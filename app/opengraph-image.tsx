import { ImageResponse } from "next/og";

export const alt = "Seunpaul — Affiliate Recruitment, AI Automation, Funnels, Lead Generation and Web Apps";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(135deg,#050b14 0%,#0a1728 55%,#0d2235 100%)",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ width: 58, height: 58, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 18, border: "1px solid #58a6ff", color: "#58a6ff", fontSize: 30, fontWeight: 800 }}>S</div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 800 }}>Seunpaul</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "980px" }}>
          <div style={{ display: "flex", fontSize: 56, lineHeight: 1.05, fontWeight: 800 }}>
            Affiliate recruitment, AI automation &amp; practical web solutions.
          </div>
          <div style={{ display: "flex", fontSize: 24, lineHeight: 1.35, color: "#b8c9dc" }}>
            Affiliate prospect research · Influencer recruitment · Lead-generation funnels · AI web apps &amp; MVPs · CRO
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 18, color: "#7f9ab6" }}>
          seunpaul-fiverr-portfolio.vercel.app
        </div>
      </div>
    ),
    { width: size.width, height: size.height }
  );
}
