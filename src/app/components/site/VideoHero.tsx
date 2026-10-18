import HeroMedia, { type HeroSlide } from "./HeroMedia";

export type { HeroSlide };

/**
 * Ambient crossfading background hero (no user controls). Used on Platform and,
 * with a single slide, as a photo hero on Solutions pages.
 */
export default function VideoHero({
  slides,
  sequence,
  intervalMs = 8000,
  gradient = "linear-gradient(180deg,rgba(23,17,13,0.82) 0%,rgba(23,17,13,0.7) 55%,rgba(23,17,13,0.88) 100%)",
  minHeight = 600,
  children,
}: {
  slides: HeroSlide[];
  sequence?: number[];
  intervalMs?: number;
  gradient?: string;
  minHeight?: number;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        position: "relative",
        background: "#17110D",
        padding: "96px 32px",
        minHeight,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <HeroMedia slides={slides} sequence={sequence} intervalMs={intervalMs} />
      <div style={{ position: "absolute", inset: 0, background: gradient }} />
      <div className="hero-rails" aria-hidden="true" />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto", width: "100%" }}>{children}</div>
    </section>
  );
}
