import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "./components/site/SiteShell";
import { Eyebrow, Section, SiteButton } from "./components/site/primitives";
import { routes } from "./components/site/routes";
import HomeHero from "./components/site/home/HomeHero";
import StackSection from "./components/site/home/StackSection";

export const metadata: Metadata = {
  title: "Aerium | The AI workforce for industrials",
  description:
    "AI purpose-built for industrial manufacturers and distributors. An always-on workforce across supply chain, operations, commercial, and back office, deployed in your environment.",
};

const BUILD_CARDS = [
  {
    num: "01",
    title: "Supply chain",
    bullets: [
      "Proactively track material markets across every SKU you buy",
      "Model real landed cost including freight, tariffs, insurance, yield",
      "Predict shortage before they impact your lead time or production",
      "Automate tail spend without mass supplier consolidation",
    ],
  },
  {
    num: "02",
    title: "Operations",
    bullets: [
      "Live production views with dynamic job scheduling",
      "Root-causes downtime and scrap from your own data",
      "Context-aware job archive searchable by any keyword, filter, or drawing similarity",
      "Real-time job and order slip-risk identification",
    ],
  },
  {
    num: "03",
    title: "Commercial",
    bullets: [
      "Automated estimation, quoting, and should-costing, in minutes",
      "New opportunity identification for the products you already sell",
      "Win/loss and margin analysis on every deal",
      "Automatically adjust prices with relevant material markets",
    ],
  },
  {
    num: "04",
    title: "Back Office",
    bullets: [
      "Capture know-how before your most experienced people retire",
      "Bring new hires up to speed and productive in weeks, not quarters",
      "Inventory reconciliation across systems and sites",
      "Track and coordinate certifications, contracts, and compliance documentation",
    ],
  },
];

const INDUSTRY_CARDS = [
  {
    title: "Equipment Manufacturing",
    blurb: "Quote faster, buy smarter, improve OEE.",
    href: routes.solutions.equipment,
    img: "/site/images/equipment.jpg",
    alt: "Equipment manufacturing floor",
  },
  {
    title: "Specialty Chemicals",
    blurb: "Feedstock, yield, and compliance in one live picture.",
    href: routes.solutions.chemicals,
    img: "/site/images/specialty-chemicals.jpg",
    alt: "Specialty chemicals plant",
  },
  {
    title: "Metal Fabrication",
    blurb: "From RFQ to shipped part, with nothing lost in between.",
    href: routes.solutions.metal,
    img: "/site/images/metal-fabrication.jpg",
    alt: "Metal fabrication welding",
  },
  {
    title: "Distribution",
    blurb: "Right stock, right branch, right price.",
    href: routes.solutions.distribution,
    img: "/site/images/distribution.jpg",
    alt: "Distribution warehouse",
  },
];

const DEPLOY_STEPS = [
  {
    num: "01",
    title: "Embed.",
    body: " We join your team on site and map how work actually flows and where it gets held up.",
  },
  {
    num: "02",
    title: "Unify and Tune.",
    body: " We unify data across your systems into a governed, live picture to tune custom models specific to your business.",
  },
  {
    num: "03",
    title: "Run.",
    body: " The workforce goes live inside the tools your team already uses, on real work, with oversight built in from day one.",
  },
  {
    num: "04",
    title: "Expand.",
    body: " Each new workflow lands faster, because the foundation and guardrails are already there.",
  },
];

export default function HomePage() {
  return (
    <SiteShell>
      <HomeHero />

      {/* Trusted by */}
      <section style={{ padding: "56px 32px", borderBottom: "1px solid var(--site-hairline)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              color: "var(--site-muted)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.15em",
              marginBottom: 22,
            }}
          >
            TRUSTED BY TEAMS AT
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 104,
              flexWrap: "wrap",
            }}
          >
            {[
              // Per-logo optical sizing: each logo has different internal whitespace,
              // so equal box sizes read unequally. Heights tuned so the wordmarks
              // appear the same size.
              {
                src: "/site/images/logo-stak.png",
                alt: "STAK Industries Inc.",
                h: 108,
                href: "https://www.stakindustries.com/",
              },
              {
                src: "/site/images/logo-hammond.png",
                alt: "Hammond Power Solutions",
                h: 118,
                href: "https://americas.hammondpowersolutions.com/",
              },
              { src: "/site/images/logo-ward.png", alt: "Ward Industrials", h: 58, href: "https://ward.ca/" },
            ].map((logo) => (
              <a
                key={logo.src}
                href={logo.href}
                target="_blank"
                rel="noreferrer"
                className="trusted-logo"
                aria-label={logo.alt}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.src} alt={logo.alt} style={{ height: logo.h, width: "auto", display: "block" }} />
              </a>
            ))}
          </div>
          <div
            style={{
              textAlign: "center",
              color: "var(--site-muted)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.15em",
              marginTop: 22,
            }}
          >
            AND MORE
          </div>
        </div>
      </section>

      {/* Customer spotlight */}
      <section style={{ padding: "88px 32px", borderBottom: "1px solid var(--site-hairline)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <blockquote
            style={{
              margin: 0,
              color: "var(--site-ink)",
              fontSize: "clamp(28px, 4.6vw, 46px)",
              fontWeight: 600,
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              textWrap: "balance",
            }}
          >
            &ldquo;Aerium&rsquo;s workforce is already automating{" "}
            <span style={{ color: "var(--site-link)" }}>90% of the work</span> we need to do.&rdquo;
          </blockquote>
          <div style={{ marginTop: 28, color: "#6E635B", fontSize: 15.5 }}>
            <strong style={{ color: "var(--site-ink)" }}>Michael Ward</strong>, President, Ward Industrials
          </div>
        </div>
      </section>

      {/* What we build */}
      <Section>
        <div style={{ maxWidth: 760, margin: "0 auto 56px", textAlign: "center" }}>
          <Eyebrow style={{ display: "block", marginBottom: 18 }}>WHAT WE BUILD</Eyebrow>
          <h2 style={{ fontSize: "clamp(30px, 4.4vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            An AI workforce for industrials.
          </h2>
        </div>
        <div className="site-grid-2">
          {BUILD_CARDS.map((c) => (
            <div key={c.num} className="site-card site-card-hover" style={{ padding: 32 }}>
              <div className="mono" style={{ color: "var(--site-link)", fontSize: 13, marginBottom: 12 }}>
                {c.num}
              </div>
              <h3 style={{ margin: "0 0 16px", fontSize: 21, fontWeight: 700, letterSpacing: "-0.01em" }}>{c.title}</h3>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  color: "var(--site-body)",
                  fontSize: 15,
                  lineHeight: 1.5,
                }}
              >
                {c.bullets.map((b, i) => (
                  <li key={i} style={{ borderTop: "1px solid #E6D4C2", paddingTop: 10 }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Why it works — interactive stack */}
      <StackSection />

      {/* How we deploy */}
      <section style={{ padding: "96px 32px", borderBottom: "1px solid var(--site-hairline)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 760, margin: "0 auto 56px", textAlign: "center" }}>
            <Eyebrow style={{ display: "block", marginBottom: 18 }}>HOW WE DEPLOY</Eyebrow>
            <h2
              style={{
                margin: "0 0 12px",
                fontSize: "clamp(30px, 4.4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Built with your team for your business.
            </h2>
            <p style={{ margin: "0 auto", maxWidth: 620, color: "var(--site-body)", fontSize: 16.5, lineHeight: 1.65 }}>
              Our engineers embed on site with your team and build the deployment around how you actually operate.
            </p>
          </div>
          <div className="site-split">
            <div style={{ aspectRatio: "4 / 3.4", borderRadius: 14, overflow: "hidden", position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/site/images/deploy.jpg"
                alt="Supplies delivered by parachute against a clear sky"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {DEPLOY_STEPS.map((s, i) => (
                <div
                  key={s.num}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "44px 1fr",
                    gap: 18,
                    borderTop: "1px solid var(--site-hairline)",
                    borderBottom: i === DEPLOY_STEPS.length - 1 ? "1px solid var(--site-hairline)" : undefined,
                    padding: "20px 0",
                  }}
                >
                  <span className="mono" style={{ color: "var(--site-link)", fontSize: 13, paddingTop: 3 }}>
                    {s.num}
                  </span>
                  <div>
                    <strong style={{ fontSize: 16.5, color: "var(--site-ink)" }}>{s.title}</strong>
                    <span style={{ color: "var(--site-body)", fontSize: 15.5, lineHeight: 1.55 }}>{s.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <Section>
        <div style={{ maxWidth: 1000, margin: "0 auto 52px", textAlign: "center" }}>
          <Eyebrow style={{ display: "block", marginBottom: 18 }}>WHO IT&rsquo;S FOR</Eyebrow>
          <h2
            style={{
              margin: "0 auto",
              maxWidth: "24ch",
              fontSize: "clamp(30px, 4.4vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              textWrap: "balance",
            }}
          >
            For the teams who make and move the physical world.
          </h2>
        </div>
        <div className="site-grid-4">
          {INDUSTRY_CARDS.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="industry-card"
              style={{ display: "flex", flexDirection: "column", textDecoration: "none" }}
            >
              <div style={{ aspectRatio: "16 / 11", position: "relative", overflow: "hidden", borderRadius: 12 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt={c.alt}
                  className="industry-card-img"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <h3 className="industry-card-title" style={{ margin: "18px 0 6px", fontSize: 18, fontWeight: 700, color: "var(--site-ink)" }}>
                {c.title}
              </h3>
              <p style={{ margin: 0, color: "var(--site-body)", fontSize: 14.5, lineHeight: 1.55 }}>{c.blurb}</p>
            </Link>
          ))}
        </div>
        <div className="site-grid-2" style={{ marginTop: 64 }}>
          <div className="site-card" style={{ padding: 34 }}>
            <div
              style={{
                color: "var(--site-eyebrow)",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.15em",
                marginBottom: 12,
              }}
            >
              FOR LEADERSHIP & STRATEGY
            </div>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: "var(--site-ink)", fontWeight: 500 }}>
              <b>One live picture of the whole operation:</b> where the margin is, where it&rsquo;s leaking, and what the
              workforce is doing about it.
            </p>
          </div>
          <div className="site-card" style={{ padding: 34 }}>
            <div
              style={{
                color: "var(--site-eyebrow)",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.15em",
                marginBottom: 12,
              }}
            >
              FOR EXECUTION
            </div>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: "var(--site-ink)", fontWeight: 500 }}>
              <b>Fast, trustworthy answers in the moment:</b> for those doing the day-to-day work, in the tools they
              already use.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA band */}
      <section className="railed rail-amber" style={{ background: "var(--site-amber)", padding: "96px 32px" }}>
        <div className="rail-lines" aria-hidden="true" />
        <div
          className="site-container cta-home"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "var(--site-ink)",
              fontSize: "clamp(28px, 3.6vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              textWrap: "balance",
            }}
          >
            Margin leaks where context is missing. Our always-on workforce helps you get it back.
          </h2>
          <div style={{ display: "flex", gap: 14, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <SiteButton href={routes.bookDemo} variant="dark">
              Book a demo
            </SiteButton>
            <SiteButton href={routes.platform} variant="outline-dark">
              Explore the platform
            </SiteButton>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
