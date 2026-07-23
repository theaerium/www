import type { Metadata } from "next";
import SiteShell from "../components/site/SiteShell";
import { Eyebrow, Section, SiteButton } from "../components/site/primitives";
import { routes } from "../components/site/routes";
import CtaBand from "../components/site/CtaBand";
import VideoHero from "../components/site/VideoHero";

export const metadata: Metadata = {
  title: "Platform | Aerium",
  description:
    "A workforce built on context, not prompts. AI agents that act, models tuned to your business, a live operational data foundation, and governance around all of it.",
};

const HERO_SLIDES = [
  { video: "/site/videos/equipment.mp4", poster: "/site/images/equipment.jpg" },
  { video: "/site/videos/specialty-chemicals.mp4", poster: "/site/images/specialty-chemicals.jpg" },
  { video: "/site/videos/metal-fabrication.mp4", poster: "/site/images/metal-fabrication.jpg" },
  { video: "/site/videos/distribution.mp4", poster: "/site/images/distribution.jpg" },
];

const STACK = [
  {
    num: "01",
    title: "AI agents",
    body: "Takes action across the business, inside email, Teams, and your data systems. Drafts the quote, identifies new opportunities, flags the slipping job and order, and reports back where your team already works.",
  },
  {
    num: "02",
    title: "Context-rich models",
    body: "Custom trained small language models, open-source LLMs, and advanced ML models built for your specific business objectives, and benchmarked against outcomes that show up on your P&L.",
  },
  {
    num: "03",
    title: "Operational data foundation",
    body: "One governed, live view unified on top of ERPs, spreadsheets, inboxes, and any other data system. This is the context layer: the workforce knows what your business knows.",
  },
  {
    num: "04",
    title: "Governance",
    body: "Role-based access controls who sees what. Every action lands in a full audit trail. Deployed in your environment so you can maintain full data ownership.",
  },
];

const SECURITY = [
  {
    title: "Deployed in your environment",
    body: "Your cloud or ours, your call. Nothing leaves your control, and nothing trains anyone else's models.",
  },
  {
    title: "Role-based access",
    body: "The workforce respects the same boundaries your team does. Who sees what is defined by you, enforced everywhere.",
  },
  {
    title: "Audit trail on every action",
    body: "Every draft, every send, every update is logged and reviewable. Oversight is built in, not bolted on.",
  },
];

const DEPLOY = [
  { num: "01", title: "Embed.", body: "We join your team on site and map how work actually flows and where it gets held up." },
  { num: "02", title: "Unify and tune.", body: "We unify data across your systems into a governed, live picture and tune custom models specific to your business." },
  { num: "03", title: "Run.", body: "The workforce goes live inside the tools your team already uses, on real work, with oversight built in from day one." },
  { num: "04", title: "Expand.", body: "Each new workflow lands faster, because the foundation and guardrails are already there." },
];

export default function PlatformPage() {
  return (
    <SiteShell>
      <VideoHero slides={HERO_SLIDES}>
        <Eyebrow style={{ color: "var(--site-amber)", display: "block", marginBottom: 20 }}>THE PLATFORM</Eyebrow>
        <h1
          style={{
            margin: 0,
            color: "#FFFFFF",
            fontSize: "clamp(32px, 5vw, 46px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.18,
            maxWidth: "17ch",
          }}
        >
          A workforce built on context, not prompts
        </h1>
        <p style={{ margin: "24px 0 0", color: "rgba(255,255,255,0.82)", fontSize: 18, lineHeight: 1.65, maxWidth: 600 }}>
          Agents that act, models tuned to your business, a live data foundation underneath, and governance around all of it.
        </p>
        <div style={{ marginTop: 36 }}>
          <SiteButton href={routes.bookDemo} variant="amber" style={{ fontSize: 15.5, padding: "14px 26px" }}>
            Book a demo
          </SiteButton>
        </div>
      </VideoHero>

      {/* The stack */}
      <Section className="" style={{ borderBottom: "1px solid var(--site-hairline)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto 56px", textAlign: "center" }}>
          <Eyebrow style={{ display: "block", marginBottom: 18 }}>THE STACK</Eyebrow>
          <h2 style={{ fontSize: "clamp(30px, 4.4vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Four layers, one system
          </h2>
        </div>
        <div className="site-grid-2">
          {STACK.map((c) => (
            <div key={c.num} className="site-card" style={{ padding: 36 }}>
              <div className="mono" style={{ color: "var(--site-link)", fontSize: 13, marginBottom: 14 }}>
                {c.num}
              </div>
              <h3 style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em" }}>{c.title}</h3>
              <p style={{ margin: 0, color: "var(--site-body)", fontSize: 15.5, lineHeight: 1.6 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Security & ownership */}
      <section className="railed rail-dark" style={{ background: "var(--site-dark)", padding: "96px 32px" }}>
        <div className="rail-lines" aria-hidden="true" />
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 820, margin: "0 auto 64px", textAlign: "center" }}>
            <Eyebrow style={{ color: "var(--site-amber)", display: "block", marginBottom: 18 }}>SECURITY &amp; OWNERSHIP</Eyebrow>
            <h2
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(30px, 4.4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.12,
                textWrap: "balance",
              }}
            >
              Your data stays yours. Full stop.
            </h2>
          </div>
          <div className="site-grid-3">
            {SECURITY.map((c) => (
              <div key={c.title} style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: 14, padding: 32 }}>
                <h3 style={{ margin: "0 0 10px", color: "#FFFFFF", fontSize: 19, fontWeight: 700, minHeight: 50 }}>{c.title}</h3>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.66)", fontSize: 15, lineHeight: 1.6 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it deploys */}
      <Section style={{ borderBottom: "1px solid var(--site-hairline)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto 56px", textAlign: "center" }}>
          <Eyebrow style={{ display: "block", marginBottom: 18 }}>HOW IT DEPLOYS</Eyebrow>
          <h2 style={{ fontSize: "clamp(30px, 4.4vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Forward-deployed, function by function
          </h2>
        </div>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {DEPLOY.map((s, i) => (
            <div
              key={s.num}
              style={{
                display: "grid",
                gridTemplateColumns: "44px 1fr",
                gap: 18,
                borderTop: "1px solid var(--site-hairline)",
                borderBottom: i === DEPLOY.length - 1 ? "1px solid var(--site-hairline)" : undefined,
                padding: "22px 0",
              }}
            >
              <span className="mono" style={{ color: "var(--site-link)", fontSize: 13, paddingTop: 3 }}>
                {s.num}
              </span>
              <div>
                <strong style={{ fontSize: 16.5, color: "var(--site-ink)" }}>{s.title}</strong>{" "}
                <span style={{ color: "var(--site-body)", fontSize: 15.5, lineHeight: 1.55 }}>{s.body}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand headline="See the platform on your own workflows, not a canned demo." />
    </SiteShell>
  );
}
