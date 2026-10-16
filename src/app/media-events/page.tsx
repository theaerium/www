import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "../components/site/SiteShell";
import { Eyebrow, Section } from "../components/site/primitives";
import { CONTACT_EMAIL } from "../components/site/routes";
import { fundingAnnouncement } from "./funding-announcement";

export const metadata: Metadata = {
  title: "Media & Events | Aerium",
  description: "The latest news from Aerium and where to find our team on the road in 2026.",
};

// Events ordered soonest first.
const EVENTS = [
  {
    date: "NOV 11-13, 2026",
    title: "SOCMA Summit",
    org: "Society of Chemical Manufacturers & Affiliates",
    rows: [{ label: "BOOTH", text: "Come see the workforce live on specialty chemicals workflows" }],
    href: "https://www.socma.org/forms/meeting/Microsite/2026_socma_summit,0",
  },
  {
    date: "NOV 17-18, 2026",
    title: "CME National Manufacturing Conference",
    org: "Canadian Manufacturers & Exporters",
    rows: [
      { label: "SPEAKING", text: "Panel: AI and Advanced Technologies: Driving the Next Era of Manufacturing" },
      { label: "BOOTH", text: "Find us on the show floor" },
    ],
    href: "https://cme-mec.ca/connection/2026-national-manufacturing-conference/",
  },
];

export default function MediaEventsPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section style={{ padding: "96px 32px 72px", borderBottom: "1px solid var(--site-hairline)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow style={{ display: "block", marginBottom: 20 }}>MEDIA &amp; EVENTS</Eyebrow>
          <h1
            style={{
              margin: "0 auto",
              fontSize: "clamp(34px, 5.6vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              maxWidth: "20ch",
              textWrap: "balance",
            }}
          >
            The latest from Aerium
          </h1>
          <p style={{ margin: "24px auto 0", color: "var(--site-body)", fontSize: 17.5, lineHeight: 1.65, maxWidth: 560 }}>
            Company news and where to find the Aerium team on the road in 2026.
          </p>
        </div>
      </section>

      <Section id="news">
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Eyebrow style={{ display: "block", marginBottom: 24 }}>COMPANY NEWS</Eyebrow>
          <Link
            href={fundingAnnouncement.href}
            aria-labelledby="funding-announcement-title"
            className="site-card site-card-hover"
            style={{ display: "block", padding: "clamp(24px, 4vw, 48px)", textDecoration: "none" }}
          >
            <article>
              <Eyebrow style={{ display: "block", marginBottom: 18 }}>FUNDING</Eyebrow>
              <h2 id="funding-announcement-title" style={{ maxWidth: "30ch", fontSize: "clamp(26px, 3.6vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                {fundingAnnouncement.title}
              </h2>
              <p style={{ maxWidth: 720, margin: "20px 0 24px", color: "var(--site-body)", fontSize: 17, lineHeight: 1.65 }}>
                {fundingAnnouncement.excerpt}
              </p>
              <span className="site-link" style={{ fontSize: 15, fontWeight: 600 }}>Read the article →</span>
            </article>
          </Link>
        </div>
      </Section>

      {/* Upcoming events */}
      <Section style={{ borderTop: "1px solid var(--site-hairline)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto 56px", textAlign: "center" }}>
          <Eyebrow style={{ display: "block", marginBottom: 18 }}>UPCOMING EVENTS</Eyebrow>
          <h2 style={{ fontSize: "clamp(30px, 4.4vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            On the calendar
          </h2>
        </div>
        <div className="site-grid-2" style={{ maxWidth: 1080, margin: "0 auto" }}>
          {EVENTS.map((e) => (
            <div key={e.title} className="site-card" style={{ padding: 36, display: "flex", flexDirection: "column" }}>
              <div className="mono" style={{ color: "var(--site-link)", fontSize: 13, marginBottom: 16 }}>
                {e.date}
              </div>
              <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em" }}>{e.title}</h3>
              <div style={{ color: "var(--site-muted)", fontSize: 14, marginBottom: 16 }}>{e.org}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {e.rows.map((r) => (
                  <div
                    key={r.label}
                    style={{ display: "grid", gridTemplateColumns: "76px 1fr", gap: 10, alignItems: "baseline", textAlign: "left" }}
                  >
                    <span style={{ color: "var(--site-link)", fontWeight: 700, fontSize: 13 }}>{r.label}</span>
                    <span style={{ color: "#3E362F", fontSize: 15, lineHeight: 1.55 }}>{r.text}</span>
                  </div>
                ))}
              </div>
              <a
                href={e.href}
                target="_blank"
                rel="noreferrer"
                className="site-link"
                style={{ fontSize: 14.5, fontWeight: 600, marginTop: "auto" }}
              >
                Event details →
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* Press */}
      <section style={{ padding: "72px 32px", borderTop: "1px solid var(--site-hairline)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 10px", fontSize: 26, fontWeight: 700, letterSpacing: "-0.01em" }}>Press and media</h2>
          <p style={{ margin: 0, color: "var(--site-body)", fontSize: 15.5 }}>
            For interviews, speaking requests, and media inquiries:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="site-link" style={{ fontWeight: 600 }}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
