import SiteShell from "./SiteShell";
import { Eyebrow, Section, SiteButton } from "./primitives";
import { routes } from "./routes";
import CtaBand from "./CtaBand";
import VideoHero from "./VideoHero";

export type SolutionData = {
  eyebrow: string;
  h1: string;
  subhead: string;
  heroPoster: string;
  stats: { value: string; caption: string }[];
  workflowHeading: string;
  workflowCols: 2 | 3;
  workflowCards: { num: string; title: string; body: string }[];
  dayHeading: string;
  daySteps: { num: string; lead: string; rest: string }[];
  ctaHeadline: string;
};

export default function SolutionTemplate({ data }: { data: SolutionData }) {
  return (
    <SiteShell>
      {/* Hero (static photo background) */}
      <VideoHero
        slides={[{ poster: data.heroPoster }]}
        gradient="linear-gradient(180deg,rgba(23,17,13,0.86) 0%,rgba(23,17,13,0.74) 55%,rgba(23,17,13,0.9) 100%)"
      >
        <Eyebrow style={{ color: "var(--site-amber)", display: "block", marginBottom: 20 }}>{data.eyebrow}</Eyebrow>
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
          {data.h1}
        </h1>
        <p style={{ margin: "24px 0 0", color: "rgba(255,255,255,0.82)", fontSize: 18, lineHeight: 1.65, maxWidth: 600 }}>
          {data.subhead}
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
          <SiteButton href={routes.bookDemo} variant="amber" style={{ fontSize: 15.5, padding: "14px 26px" }}>
            Book a demo
          </SiteButton>
          <SiteButton href={routes.platform} variant="outline-light" style={{ fontSize: 15.5, padding: "14px 26px" }}>
            Explore the platform
          </SiteButton>
        </div>
      </VideoHero>

      {/* Stat row */}
      <section style={{ padding: "56px 32px", borderBottom: "1px solid var(--site-hairline)" }}>
        <div
          className="site-container site-grid-3"
          style={{ textAlign: "center", gap: 24 }}
        >
          {data.stats.map((s) => (
            <div key={s.caption}>
              <div className="mono" style={{ color: "var(--site-ink)", fontSize: 32, fontWeight: 600 }}>
                {s.value}
              </div>
              <div style={{ color: "#6E635B", fontSize: 14, marginTop: 6 }}>{s.caption}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow cards */}
      <Section>
        <div style={{ maxWidth: 760, margin: "0 auto 56px", textAlign: "center" }}>
          <Eyebrow style={{ display: "block", marginBottom: 18 }}>EXAMPLE USE CASES</Eyebrow>
          <h2 style={{ fontSize: "clamp(30px, 4.4vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {data.workflowHeading}
          </h2>
        </div>
        <div className={data.workflowCols === 3 ? "site-grid-3" : "site-grid-2"}>
          {data.workflowCards.map((c) => (
            <div key={c.num} className="site-card" style={{ padding: 32 }}>
              <div className="mono" style={{ color: "var(--site-link)", fontSize: 13, marginBottom: 12 }}>
                {c.num}
              </div>
              <h3 className="wf-title" style={{ margin: "0 0 10px", fontSize: 19, fontWeight: 700 }}>{c.title}</h3>
              <p style={{ margin: 0, color: "var(--site-body)", fontSize: 15, lineHeight: 1.6 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* A day with the workforce */}
      <section className="railed rail-dark" style={{ background: "var(--site-dark)", padding: "96px 32px" }}>
        <div className="rail-lines" aria-hidden="true" />
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 820, margin: "0 auto 56px", textAlign: "center" }}>
            <Eyebrow style={{ color: "var(--site-amber)", display: "block", marginBottom: 18 }}>
              A DAY WITH THE WORKFORCE
            </Eyebrow>
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
              {data.dayHeading}
            </h2>
          </div>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            {data.daySteps.map((s, i) => (
              <div
                key={s.num}
                style={{
                  display: "grid",
                  gridTemplateColumns: "44px 1fr",
                  gap: 18,
                  borderTop: "1px solid rgba(255,255,255,0.14)",
                  borderBottom: i === data.daySteps.length - 1 ? "1px solid rgba(255,255,255,0.14)" : undefined,
                  padding: "22px 0",
                }}
              >
                <span className="mono" style={{ color: "var(--site-amber)", fontSize: 13, paddingTop: 3 }}>
                  {s.num}
                </span>
                <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 15.5, lineHeight: 1.6 }}>
                  <strong style={{ color: "#FFFFFF" }}>{s.lead}</strong> {s.rest}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand headline={data.ctaHeadline} />
    </SiteShell>
  );
}
