import { SiteButton } from "./primitives";
import { routes } from "./routes";

/** Amber full-bleed CTA band used at the foot of Platform and Solutions pages. */
export default function CtaBand({
  headline = "Put an AI workforce on your hardest workflows.",
  showExplore = false,
}: {
  headline?: string;
  showExplore?: boolean;
}) {
  return (
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
            fontSize: "clamp(28px, 3.6vw, 40px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            color: "var(--site-ink)",
            textWrap: "balance",
          }}
        >
          {headline}
        </h2>
        <div style={{ display: "flex", gap: 14, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <SiteButton href={routes.bookDemo} variant="dark">
            Book a demo
          </SiteButton>
          {showExplore && (
            <SiteButton href={routes.platform} variant="outline-dark">
              Explore the platform
            </SiteButton>
          )}
        </div>
      </div>
    </section>
  );
}
