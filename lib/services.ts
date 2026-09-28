export type ServiceDefinition = {
  slug: string;
  title: string;
  answer: string;
  description: string;
  includes: string[];
  faqs: { question: string; answer: string }[];
};

export const serviceDefinitions: ServiceDefinition[] = [
  {
    slug: "affiliate-recruitment",
    title: "Affiliate Recruitment",
    answer: "Affiliate recruitment support covering prospect research, qualification, personalized outreach, follow-up, onboarding, and partner activation.",
    description: "The portfolio positions affiliate recruitment as a repeatable growth system that connects partner research, outreach, follow-up, and activation.",
    includes: ["Affiliate and partner prospect research", "Prospect qualification and fit checks", "Personalized outreach and follow-up", "Onboarding and activation workflows"],
    faqs: [
      { question: "What is included in affiliate recruitment?", answer: "The service can cover prospect research, qualification, personalized outreach, follow-up, onboarding, and activation depending on the agreed scope." },
      { question: "Can you help recruit affiliates for a SaaS or eCommerce program?", answer: "Yes. The current portfolio positioning covers affiliate recruitment for SaaS and eCommerce brands." },
      { question: "Can affiliate recruitment be connected to automation?", answer: "Yes. The portfolio also covers AI automation workflows that can connect lead handling, follow-up, notifications, and handoff logic." },
    ],
  },
  {
    slug: "affiliate-prospect-research",
    title: "Affiliate Prospect Research",
    answer: "Research-led affiliate prospecting focused on relevance, fit, contact quality, qualification, and an actionable next step.",
    description: "Prospect research is treated as a qualification process rather than a volume-only list-building exercise.",
    includes: ["Niche and partner research", "Relevance and fit qualification", "Contact-quality checks", "Outreach-ready organization"],
    faqs: [
      { question: "What makes affiliate prospect research useful?", answer: "Useful research connects each prospect to a relevant niche, fit criteria, contact context, and a practical next action." },
      { question: "Do you focus only on volume?", answer: "No. The portfolio describes a fit-first approach that prioritizes relevance and contact quality over raw volume." },
      { question: "Can research feed an outreach workflow?", answer: "Yes. Research can be structured for personalized outreach, follow-up, qualification, and partner recruitment." },
    ],
  },
  {
    slug: "affiliate-outreach",
    title: "Affiliate Outreach",
    answer: "Personalized affiliate and partner outreach with follow-up logic designed around relevance, context, and clear next steps.",
    description: "Outreach work connects researched prospects with personalized communication and repeatable follow-up rather than generic messaging.",
    includes: ["Personalized affiliate outreach", "Influencer and creator outreach", "Follow-up sequences", "Response and handoff workflows"],
    faqs: [
      { question: "Can you personalize affiliate outreach?", answer: "Yes. Personalized outreach is part of the current portfolio positioning for affiliate and influencer recruitment." },
      { question: "Can outreach be automated?", answer: "Workflow automation can connect lead capture, scoring, outreach queues, follow-up, response detection, and operator notification." },
      { question: "How is outreach connected to research?", answer: "The research stage supplies the relevance and contact context needed to make outreach more specific to the prospect." },
    ],
  },
  {
    slug: "influencer-recruitment",
    title: "Influencer Recruitment",
    answer: "Influencer sourcing and recruitment based on niche relevance, audience fit, engagement context, contact quality, and promotional history.",
    description: "Influencer sourcing is part of the existing service positioning and is handled as a research-and-qualification problem.",
    includes: ["Creator and influencer research", "Niche relevance and audience-fit checks", "Engagement context", "Contact-quality checks", "Outreach and follow-up support"],
    faqs: [
      { question: "How are influencers evaluated?", answer: "The current service definition references niche relevance, audience fit, engagement context, contact quality, and promotional history." },
      { question: "Can influencer recruitment support affiliate programs?", answer: "Yes. The portfolio combines influencer sourcing with affiliate recruitment and partner acquisition workflows." },
      { question: "Do you recruit every creator you find?", answer: "No. The stated approach is to research and qualify for relevance and fit before outreach." },
    ],
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    answer: "Research and qualification systems designed to produce relevant prospects with useful next actions, not just large spreadsheets.",
    description: "Lead generation work prioritizes relevance, fit, contact quality, and outreach readiness.",
    includes: ["Prospect research", "Qualification", "Contact data organization", "Outreach-ready lead structure"],
    faqs: [
      { question: "What does lead generation cover?", answer: "The current portfolio covers research and qualification systems that prioritize relevant prospects, useful contact context, and next actions." },
      { question: "Is the focus only on lead volume?", answer: "No. The portfolio explicitly emphasizes relevance and useful next actions over raw volume." },
      { question: "Can lead generation connect to funnels and automation?", answer: "Yes. The portfolio covers funnels, lead capture, follow-up, and workflow automation alongside lead generation." },
    ],
  },
  {
    slug: "lead-generation-funnels",
    title: "Lead Generation Funnels",
    answer: "Lead-generation funnels covering landing pages, lead capture, trust sections, thank-you flows, offer paths, and conversion-focused UX.",
    description: "The funnel work treats the journey as one connected path from message and offer through capture and the next action.",
    includes: ["Landing page structure", "Lead forms and capture", "Trust and FAQ sections", "Thank-you and confirmation flows", "Offer and CTA paths"],
    faqs: [
      { question: "What is included in a lead-generation funnel?", answer: "The existing portfolio describes landing pages, forms, trust sections, thank-you flows, offer paths, and conversion-focused UX." },
      { question: "Can a funnel include a lead magnet?", answer: "Yes. The stated funnel model supports educational resources, opt-ins, thank-you steps, and a next offer or action." },
      { question: "Can a funnel connect to automation?", answer: "Yes. Funnel events can feed lead handling, follow-up, notifications, and other workflow logic." },
    ],
  },
  {
    slug: "ai-web-apps-mvps",
    title: "AI Web Apps & MVPs",
    answer: "Product-focused interfaces for AI websites and MVPs with practical UX, database-aware flows, API considerations, and deployment-oriented implementation.",
    description: "The portfolio's AI web app and MVP positioning focuses on useful product flows and implementation details rather than a visual mockup alone.",
    includes: ["AI web app interfaces", "MVP product flows", "React and modern web UI", "API and data-flow considerations", "Deployment-oriented implementation"],
    faqs: [
      { question: "Can you build an AI web app MVP?", answer: "Yes. The current portfolio positioning includes AI web app and MVP work." },
      { question: "Do you handle product UX as well as the interface?", answer: "Yes. The portfolio describes product-focused UX, practical flows, database-aware architecture, and deployment-oriented implementation." },
      { question: "Can an existing app be improved instead of rebuilt?", answer: "Yes. Technical review and validation work can be used to identify focused improvements without replacing unrelated working functionality." },
    ],
  },
  {
    slug: "conversion-funnels-cro",
    title: "Conversion Funnels & CRO",
    answer: "Conversion-focused landing pages and funnel journeys covering lead capture, trust sections, offer paths, thank-you experiences, and tracking logic.",
    description: "The portfolio treats CRO as a journey problem: message, page structure, CTA, trust, lead capture, and next step should work together.",
    includes: ["Landing page structure", "Lead forms and capture", "Offer and CTA paths", "Trust and FAQ sections", "Thank-you and confirmation flows"],
    faqs: [
      { question: "What does CRO work cover?", answer: "The service positioning covers landing pages, lead capture, offer paths, thank-you experiences, trust sections, and conversion-focused UX." },
      { question: "Can you improve an existing funnel?", answer: "Yes. Existing funnel work can be reviewed and the agreed improvements implemented without replacing unrelated working functionality." },
      { question: "Does CRO include tracking logic?", answer: "The portfolio describes trackable conversion events and attribution-ready funnel logic as part of its funnel work." },
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    answer: "Practical automation workflows that connect triggers, data, notifications, follow-up, CRM logic, and operator handoff.",
    description: "Automation work is framed as a system of connected events and decisions rather than isolated scripts.",
    includes: ["Event-driven workflow logic", "Lead handling and scoring", "Notifications and operator handoff", "Follow-up and response detection", "Failure-aware retry and state handling"],
    faqs: [
      { question: "What can AI automation connect?", answer: "The portfolio describes connections between triggers, lead data, notifications, follow-up, CRM logic, and operator handoff." },
      { question: "Can automation handle follow-up?", answer: "Yes. Follow-up logic and response detection are explicitly part of the current automation positioning." },
      { question: "Can you work with an existing workflow?", answer: "Yes. Existing systems can be reviewed and focused changes implemented without replacing unrelated working functionality." },
    ],
  },
  {
    slug: "technical-reviews",
    title: "Technical Reviews",
    answer: "Architecture-aware reviews that separate verified findings from validation dependencies and turn them into clear implementation-ready next steps.",
    description: "Technical review work focuses on understanding the existing system, identifying concrete issues, and documenting what should be changed or validated.",
    includes: ["Repository and architecture review", "State-flow and implementation checks", "Acceptance criteria", "Validation dependencies", "Implementation-ready handoff notes"],
    faqs: [
      { question: "What is included in a technical review?", answer: "The portfolio describes repository review, state-flow checks, acceptance criteria, validation dependencies, and implementation-ready notes." },
      { question: "Do you distinguish verified findings from assumptions?", answer: "Yes. That separation is an explicit part of the technical-review positioning." },
      { question: "Is a technical review the same as a full rebuild?", answer: "No. A review can document findings and next steps without replacing the existing working system." },
    ],
  },
];

export function getService(slug: string) {
  return serviceDefinitions.find((service) => service.slug === slug);
}
