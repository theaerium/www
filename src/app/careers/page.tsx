import type { Metadata } from "next";
import SiteShell from "../components/site/SiteShell";
import { Eyebrow, Section } from "../components/site/primitives";
import { CONTACT_EMAIL } from "../components/site/routes";

export const metadata: Metadata = {
  title: "Careers | Aerium",
  description:
    "Do the best work of your career, where the work is real. Small team, high ownership, forward-deployed onto real factory floors.",
};

// Placeholder role list — supports an arbitrary number of roles.
const ROLES = [
  {
    title: "Forward-Deployed Engineer",
    meta: "Full time · On site with customers across North America",
    body: "Embed with industrial customers, map how their work actually flows, and deploy the AI workforce on their floor. You own the outcome, not a ticket queue.",
    subject: "Application: Forward-Deployed Engineer",
  },
];

const WHY = [
  {
    title: "On the floor, not on Zoom",
    body: "You will spend real time on site with customers. The problems are physical, the feedback is immediate, and the wins are visible.",
  },
  {
    title: "Ownership from day one",
    body: "Deployments have your name on them. You make the calls, you carry the outcome, and you see your work in a customer's P&L.",
  },
  {
    title: "A place for high standards",
    body: "We hold the bar high because our customers bet their operations on us. Expect to be pushed, and to push back.",
  },
];

export default function CareersPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section style={{ padding: "96px 32px 80px", borderBottom: "1px solid var(--site-hairline)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow style={{ display: "block", marginBottom: 20 }}>CAREERS</Eyebrow>
          <h1
            style={{
              margin: "0 auto",
              color: "var(--site-ink)",
              fontSize: "clamp(34px, 6vw, 54px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              maxWidth: "26ch",
              textWrap: "balance",
            }}
          >
            Do the best work of your career, where the work is real
          </h1>
          <p style={{ margin: "26px auto 0", color: "var(--site-body)", fontSize: 18, lineHeight: 1.65, maxWidth: 760 }}>
            Small team, high ownership, forward-deployed. You will ship AI onto real factory floors and watch it change
            how a business runs, in weeks, not roadmaps.
          </p>
        </div>
      </section>

      {/* Open roles */}
      <Section container={false}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto 48px", textAlign: "center" }}>
            <Eyebrow style={{ display: "block", marginBottom: 18 }}>OPEN ROLES</Eyebrow>
            <h2 style={{ fontSize: "clamp(30px, 4.4vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Join the team
            </h2>
          </div>

          {ROLES.map((r) => (
            <div
              key={r.title}
              style={{
                border: "1px solid var(--site-hairline)",
                borderRadius: 14,
                padding: 32,
                display: "flex",
                alignItems: "center",
                gap: 24,
                flexWrap: "wrap",
                marginBottom: 16,
              }}
            >
              <div style={{ flex: 1, minWidth: 240 }}>
                <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700 }}>{r.title}</h3>
                <div style={{ color: "var(--site-muted)", fontSize: 14.5 }}>{r.meta}</div>
                <p style={{ margin: "14px 0 0", color: "var(--site-body)", fontSize: 15, lineHeight: 1.6 }}>{r.body}</p>
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(r.subject)}`}
                className="site-btn site-btn-dark"
                style={{ flexShrink: 0 }}
              >
                Apply
              </a>
            </div>
          ))}

          <p style={{ margin: "32px 0 0", textAlign: "center", color: "var(--site-body)", fontSize: 15 }}>
            Don&rsquo;t see your role? We hire ahead of the org chart for exceptional people. Write us:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="site-link" style={{ fontWeight: 600 }}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </Section>

      {/* Why join */}
      <section style={{ padding: "96px 32px", borderTop: "1px solid var(--site-hairline)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div className="site-grid-3">
            {WHY.map((w) => (
              <div key={w.title} style={{ borderRadius: 14, padding: 32 }}>
                <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 700 }}>{w.title}</h3>
                <p style={{ margin: 0, color: "var(--site-body)", fontSize: 15, lineHeight: 1.6 }}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
