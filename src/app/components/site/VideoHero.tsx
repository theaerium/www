"use client";

import { useEffect, useRef, useState } from "react";

export type HeroSlide = {
  video?: string;
  poster?: string;
  objectPosition?: string;
  /**
   * When true, this clip resumes from where it paused each time it reappears
   * (for a long clip threaded through the sequence). When false/omitted, it
   * restarts from the beginning every time it becomes active.
   */
  resume?: boolean;
};

/**
 * Ambient crossfading background hero (no user controls). Used on Platform and,
 * with a single slide, as a photo hero on Solutions pages. Video sources are
 * TEMPORARY stock placeholders — swap `video` for final hosted files when ready;
 * `poster` renders underneath so it always looks intentional.
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
  /**
   * Order of slide indices to cycle through. A slide index may repeat, e.g.
   * [0, 1, 0, 2, 0] shows slide 0 three times per cycle. Because a repeated
   * slide is the same mounted <video>, it pauses when hidden and resumes (never
   * restarts) when shown again, so it "picks up where it left off". Defaults to
   * each slide once, in order.
   */
  sequence?: number[];
  intervalMs?: number;
  gradient?: string;
  minHeight?: number;
  children: React.ReactNode;
}) {
  const seq = sequence && sequence.length > 0 ? sequence : slides.map((_, i) => i);
  const [step, setStep] = useState(0);
  const active = seq[step % seq.length] ?? 0;
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (seq.length < 2) return;
    const t = setInterval(() => setStep((s) => (s + 1) % seq.length), intervalMs);
    return () => clearInterval(t);
  }, [seq.length, intervalMs]);

  useEffect(() => {
    videoRefs.current.forEach((v, k) => {
      if (!v) return;
      v.muted = true;
      if (k === active) {
        // Restart from the beginning unless this slide is marked to resume
        // (the long clip threaded through the sequence).
        if (!slides[k]?.resume) {
          try {
            v.currentTime = 0;
          } catch {
            /* not seekable yet; will start from 0 on load */
          }
        }
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
      } else {
        v.pause(); // holds position so a resume clip continues on its next appearance
      }
    });
  }, [active, slides]);

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
      <div style={{ position: "absolute", inset: 0 }}>
        {slides.map((s, k) => (
          <div key={k} style={{ position: "absolute", inset: 0, opacity: k === active ? 1 : 0, transition: "opacity 1400ms ease" }}>
            {s.poster && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${s.poster})`,
                  backgroundSize: "cover",
                  backgroundPosition: s.objectPosition ?? "center",
                }}
              />
            )}
            {s.video && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                ref={(el) => {
                  videoRefs.current[k] = el;
                }}
                src={s.video}
                poster={s.poster}
                muted
                loop
                playsInline
                preload={k === active ? "auto" : "none"}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: s.objectPosition ?? "center",
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", inset: 0, background: gradient }} />
      <div className="hero-rails" aria-hidden="true" />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto", width: "100%" }}>{children}</div>
    </section>
  );
}
