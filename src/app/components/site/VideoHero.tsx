"use client";

import { useEffect, useRef, useState } from "react";

export type HeroSlide = { video?: string; poster?: string };

/**
 * Ambient crossfading background hero (no user controls). Used on Platform and,
 * with a single slide, as a photo hero on Solutions pages. Video sources are
 * TEMPORARY stock placeholders — swap `video` for final hosted files when ready;
 * `poster` renders underneath so it always looks intentional.
 */
export default function VideoHero({
  slides,
  intervalMs = 8000,
  gradient = "linear-gradient(180deg,rgba(23,17,13,0.82) 0%,rgba(23,17,13,0.7) 55%,rgba(23,17,13,0.88) 100%)",
  minHeight = 600,
  children,
}: {
  slides: HeroSlide[];
  intervalMs?: number;
  gradient?: string;
  minHeight?: number;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), intervalMs);
    return () => clearInterval(t);
  }, [slides.length, intervalMs]);

  useEffect(() => {
    videoRefs.current.forEach((v, k) => {
      if (!v) return;
      v.muted = true;
      if (k === active) {
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

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
                  backgroundPosition: "center",
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
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", inset: 0, background: gradient }} />
      <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", width: "100%" }}>{children}</div>
    </section>
  );
}
