import type { Metadata } from "next";
import SiteShell from "../components/site/SiteShell";
import FaqAccordion, { type FaqEntry } from "../components/site/faq/FaqAccordion";
import { ClosingCta, GrainHeader } from "../components/site/sections";
import { CONTACT_EMAIL, routes } from "../components/site/routes";

export const metadata: Metadata = {
  title: "FAQ | Aerium",
  description:
    "How Aerium protects your data, how much of your team’s time a deployment takes, and how quickly you see value.",
};

const FAQ_GROUPS: { eyebrow: string; title: string; entries: FaqEntry[] }[] = [
  {
    eyebrow: "Data security",
    title: "Your data stays yours",
    entries: [
      {
        question: "Where is our data hosted?",
        answer:
          "Wherever you need it to be. We host in Canada or the US so your data stays in your country, or we deploy Aerium on-prem or inside your own cloud so it never leaves your environment.",
      },
      {
        question: "Who owns our data and the models built on it?",
        answer:
          "You do. You keep full ownership of your data and of the models we build for your business. They are not shared with or used for other customers.",
      },
      {
        question: "What security standards do you meet?",
        answer:
          "Our controls are independently audited for SOC 2 Type 1, with a Type 2 audit underway. Access runs through your existing identity provider with SSO and SAML, and every action is captured in a full audit trail.",
      },
      {
        question: "How do you connect to our systems without opening up our network?",
        answer:
          "We work with your IT and security teams to agree on the access each connection needs before anything is set up. With an on-prem or private cloud deployment, every connection stays inside your own walls.",
      },
    ],
  },
  {
    eyebrow: "Your team’s time",
    title: "We do the heavy lifting",
    entries: [
      {
        question: "How much capacity do we need to commit?",
        answer:
          "Very little. Our forward deployed engineers do the build, on site with your team. We ask for a sponsor to set priorities, a few hours with the people who do the work to understand the workflow, and a point of contact in IT to grant access.",
      },
      {
        question: "Does our IT team need to build anything?",
        answer:
          "No. We connect to your ERP, inboxes, drawings, spreadsheets and machines ourselves, including systems with no API. IT approves access and reviews the deployment, but there is no internal build.",
      },
      {
        question: "Will our team need to learn a new tool?",
        answer:
          "No. Aerium works inside the tools your team already uses, like email and Teams, so people get the benefit without changing how they work.",
      },
    ],
  },
  {
    eyebrow: "Deployment",
    title: "First value in 3 to 5 weeks",
    entries: [
      {
        question: "How long until we see value?",
        answer:
          "Typically 3 to 5 weeks from kickoff to first value.",
      },
      {
        question: "What happens during those first weeks?",
        answer:
          "We start on site, learning the workflow you want to improve and connecting the systems that hold it. Next we build the data foundation and the first agent around your processes, then put it live with your team and improve it weekly from their feedback.",
      },
      {
        question: "What happens after the first deployment?",
        answer:
          "Once the foundation is live, we add models and agents one workflow at a time on the same base, so each new use case goes live faster than the last.",
      },
    ],
  },
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_GROUPS.flatMap((group) =>
    group.entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  ),
};

export default function FaqPage() {
  return (
    <SiteShell navOverlay>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />

      <GrainHeader title="Questions we hear most">
        <p className="b-header-sub">How we protect your data, how much of your team’s time it takes, and how quickly you see value.</p>
      </GrainHeader>

      {FAQ_GROUPS.map((group, i) => (
        <section key={group.eyebrow} className={`b-section b-${i % 2 === 0 ? "white" : "stone"}`}>
          <div className="b-wrap b-faq-group">
            <div className="b-faq-heading" data-reveal="stagger">
              <div className="b-eyebrow">{group.eyebrow}</div>
              <h2 className="b-h2">{group.title}</h2>
            </div>
            <div data-reveal="stagger">
              <FaqAccordion entries={group.entries} />
            </div>
          </div>
        </section>
      ))}

      <ClosingCta
        title="Still have questions?"
        primary={{ label: "Book a demo", href: routes.bookDemo }}
        secondary={{ label: "Email the founders", href: `mailto:${CONTACT_EMAIL}` }}
      />
    </SiteShell>
  );
}
