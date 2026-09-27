import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const projects = [
  {
    category: "Affiliate Growth",
    title: "Affiliate Recruitment Engine",
    description: "Targeted prospect research, qualification, personalized outreach, follow-up, and partner activation structured as one repeatable growth system.",
    tags: ["Affiliate sourcing", "Influencer outreach", "Activation"],
    metrics: [
      { value: "$12,464", label: "documented revenue example" },
      { value: "672", label: "product sales example" },
      { value: "704%", label: "visitor growth example" }
    ],
    animation: "pipeline"
  },
  {
    category: "eCommerce Growth",
    title: "TikTok Affiliate Growth System",
    description: "A creator-led growth workflow connecting niche research, commission structures, content schedules, order activity, and performance tracking.",
    tags: ["TikTok Shop", "Creators", "Revenue tracking"],
    metrics: [
      { value: "23+", label: "active orders example" },
      { value: "22.2%", label: "buyer growth example" }
    ],
    animation: "metrics"
  },
  {
    category: "Vibe Coding",
    title: "AI Web App / MVP Delivery",
    description: "Product-focused interfaces for AI websites and MVPs: clear UX, practical flows, database-aware architecture, and deployment-ready builds.",
    tags: ["Lovable", "React", "APIs", "MVP"],
    metrics: [
      { value: "UX-first", label: "interface decisions" },
      { value: "Flow-based", label: "product structure" }
    ],
    animation: "app"
  },
  {
    category: "Funnel + CRO",
    title: "Lead Capture & Conversion Funnel",
    description: "Landing page logic, lead forms, trust sections, thank-you flows, offers, and tracking designed as one conversion path.",
    tags: ["Landing pages", "Lead capture", "CRO"],
    metrics: [
      { value: "Clear CTA", label: "every stage has a next step" },
      { value: "Trackable", label: "events & attribution ready" }
    ],
    animation: "flow"
  },
  {
    category: "AI Automation",
    title: "Automation & Follow-Up Workflow",
    description: "Connect triggers, lead data, notifications, follow-ups, and handoff rules so work keeps moving without constant manual intervention.",
    tags: ["n8n / automation", "Email flows", "CRM logic"],
    metrics: [
      { value: "Trigger → Action", label: "event-driven logic" },
      { value: "Retry-ready", label: "failure-aware design" }
    ],
    animation: "chat"
  },
  {
    category: "Lead Generation",
    title: "Prospect Research & Qualification",
    description: "Research-led lead generation that prioritizes relevance, fit, contact quality, and a useful next action instead of volume for its own sake.",
    tags: ["Prospecting", "Qualification", "Contact data"],
    metrics: [
      { value: "Fit-first", label: "relevance before volume" },
      { value: "Actionable", label: "organized for outreach" }
    ],
    animation: "qualifier"
  },
  {
    category: "Technical Validation",
    title: "Product Audit & Stabilization Handoff",
    description: "Structured technical review that separates verified findings from validation dependencies and turns them into clear implementation-ready next steps.",
    tags: ["Repository review", "State flows", "Acceptance criteria"],
    metrics: [
      { value: "Verified", label: "findings separated" },
      { value: "Handoff", label: "implementation-ready notes" }
    ],
    animation: "audit"
  }
];

async function main() {
  await prisma.project.deleteMany();
  for (const [index, project] of projects.entries()) {
    await prisma.project.create({
      data: {
        ...project,
        sortOrder: index + 1,
        visualType: "animation",
        published: true,
      },
    });
  }

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Seunpaul",
      eyebrow: "Fiverr Portfolio · Growth · Automation · Web",
      headline: "Building systems that turn attention into action.",
      subheadline: "I help SaaS and eCommerce brands grow with affiliate recruitment, influencer sourcing, funnels, AI automation, lead generation, and practical web solutions.",
      fiverrUrl: "https://www.fiverr.com/seunpaul1009",
      rating: "5.0★",
      reviews: "7",
      sales: "$12K+",
      jobTitle: "Affiliate Growth AI Automation Specialist",
      availability: "Available",
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://YOUR-DOMAIN.com",
      googleVerification: process.env.GOOGLE_SITE_VERIFICATION || null,
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
