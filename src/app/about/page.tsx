import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "../components/site/SiteShell";
import { Eyebrow, Section } from "../components/site/primitives";
import { routes } from "../components/site/routes";

export const metadata: Metadata = {
  title: "About | Aerium",
  description:
    "Aerium is a place for people who want to help our physical economy run. Built with industrials, not for them from a distance.",
};

const VALUES = [
  {
    num: "01",
    title: "Customer obsession",
    body: "We measure ourselves on the value we deliver.",
  },
  {
    num: "02",
    title: "Excellence",
    body: "Our customers hold a high bar and we hold a higher one.",
  },
  {
    num: "03",
    title: "Real problems, real people",
    body: "We build for planners, estimators, buyers, and the people running the floor. Not for slideware, and not for hype.",
  },
  {
    num: "04",
    title: "Pushing the limit",
    body: "The frontier of AI belongs on the factory floor as much as anywhere. We take on the hard versions of problems, on site, where they live.",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      {/* Hero — wordmark treatment */}
      <section style={{ padding: "96px 32px 72px", borderBottom: "1px solid var(--site-hairline)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow style={{ display: "block", marginBottom: 28 }}>ABOUT AERIUM</Eyebrow>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(56px, 12vw, 88px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <span>A</span>
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ opacity: 0.25 }}>e</span>
              <span
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "8%",
                  bottom: "-2%",
                  width: 6,
                  marginLeft: -3,
                  background: "var(--site-ink)",
                  transform: "rotate(24deg)",
                  borderRadius: 3,
                }}
              />
            </span>
            <span>rium</span>
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: 14,
              marginTop: 26,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700, fontSize: 26, letterSpacing: "0.01em" }}>
              &#8209;arium
            </span>
            <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", color: "#5B7A8C", fontSize: 19 }}>
              noun suffix
            </span>
            <span style={{ color: "#3E362F", fontSize: 19 }}>
              <span style={{ color: "var(--site-muted)" }}>:</span> place for
            </span>
          </div>
          <p style={{ margin: "26px auto 0", color: "var(--site-body)", fontSize: 18, lineHeight: 1.65, maxWidth: 620 }}>
            Aerium is a place for people who want to help our physical economy run.
          </p>
        </div>
      </section>

      {/* What we stand for */}
      <Section style={{ borderBottom: "1px solid var(--site-hairline)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto 56px", textAlign: "center" }}>
          <Eyebrow style={{ display: "block", marginBottom: 18 }}>WHAT WE STAND FOR</Eyebrow>
          <h2 style={{ fontSize: "clamp(30px, 4.4vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Aerium is a place for
          </h2>
        </div>
        <div className="site-grid-2">
          {VALUES.map((v) => (
            <div key={v.num} className="site-card" style={{ padding: 36 }}>
              <div className="mono" style={{ color: "var(--site-link)", fontSize: 13, marginBottom: 14 }}>
                {v.num}
              </div>
              <h3 style={{ margin: "0 0 10px", fontSize: 21, fontWeight: 700 }}>{v.title}</h3>
              <p style={{ margin: 0, color: "var(--site-body)", fontSize: 15.5, lineHeight: 1.6 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Our story */}
      <Section container={false}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 32px" }}>
          <Eyebrow style={{ display: "block", marginBottom: 18 }}>OUR STORY</Eyebrow>
          <h2 style={{ margin: "0 0 24px", fontSize: "clamp(28px, 3.4vw, 36px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Built with industrials, not for them from a distance
          </h2>
          <p style={{ margin: "0 0 18px", color: "#3E362F", fontSize: 16.5, lineHeight: 1.7 }}>
            Aerium started with a simple observation: the businesses that make and move things run on hard-won knowledge
            that lives in people, inboxes, and spreadsheets. The best AI in the world is useless to them if it does not
            know their machines, their margins, and their customers.
          </p>
          <p style={{ margin: 0, color: "#3E362F", fontSize: 16.5, lineHeight: 1.7 }}>
            So we build the other way around. Our engineers embed on site, learn how the work actually flows, and deploy
            an AI workforce grounded in each customer&rsquo;s own context. Aerium is not a chatbot on the sidelines, we
            are a workforce helping every team win.
          </p>
        </div>
      </Section>

      {/* Careers teaser */}
      <section className="railed rail-dark" style={{ background: "var(--site-dark)", padding: "96px 32px" }}>
        <div className="rail-lines" aria-hidden="true" />
        <div className="cta-home site-container" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <Eyebrow style={{ color: "var(--site-amber)", display: "block", marginBottom: 16 }}>CAREERS</Eyebrow>
            <h2
              style={{
                margin: 0,
                color: "#FFFFFF",
                fontSize: "clamp(28px, 3.5vw, 38px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                textWrap: "balance",
              }}
            >
              If this sounds like your kind of place, come do the best work of your career.
            </h2>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href={routes.careers} className="site-btn site-btn-amber" style={{ fontSize: 15.5, padding: "15px 28px" }}>
              See open roles
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
