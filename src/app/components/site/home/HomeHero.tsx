"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { routes } from "../routes";

/** Hero background clips (final assets, served from /public/site/videos). */
const INDUSTRIES: {
  key: string;
  num: string;
  label: string;
  desc: string;
  video: string;
  poster?: string;
}[] = [
  {
    key: "equipment",
    num: "01",
    label: "Equipment Manufacturers",
    desc: "Quote faster, buy smarter, improve OEE.",
    video: "/site/videos/equipment.mp4",
    poster: "/site/images/equipment.jpg",
  },
  {
    key: "chemicals",
    num: "02",
    label: "Specialty Chemicals",
    desc: "Feedstock, yield, and compliance in one picture.",
    video: "/site/videos/specialty-chemicals.mp4",
    poster: "/site/images/specialty-chemicals.jpg",
  },
  {
    key: "metal",
    num: "03",
    label: "Metal Fabricators",
    desc: "RFQ to shipped part, nothing lost between.",
    video: "/site/videos/metal-fabrication.mp4",
    poster: "/site/images/metal-fabrication.jpg",
  },
  {
    key: "distribution",
    num: "04",
    label: "Distributors",
    desc: "Right stock, right branch, right price.",
    video: "/site/videos/distribution.mp4",
    poster: "/site/images/distribution.jpg",
  },
];

const ROTATE_MS = 4500;

export default function HomeHero() {
  const [active, setActive] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Advance to the next slide only when the active progress bar finishes its
  // animation, so the bar always fills completely before the video switches
  // (no drift between a separate timer and the CSS animation).
  const advance = () => {
    if (autoRotate) setActive((i) => (i + 1) % INDUSTRIES.length);
  };

  // Play only the active video.
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

  const pick = (k: number) => {
    setActive(k);
    setAutoRotate(false); // stop auto-rotation once the user takes control
  };

  return (
    <section
      style={{
        position: "relative",
        background: "#17110D",
        height: "min(820px, 92vh)",
        minHeight: 640,
        overflow: "hidden",
      }}
    >
      {INDUSTRIES.map((s, k) => (
        <div
          key={s.key}
          style={{
            position: "absolute",
            inset: 0,
            opacity: k === active ? 1 : 0,
            transition: "opacity 900ms ease",
            pointerEvents: "none",
          }}
        >
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
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
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
            }}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(100deg,rgba(18,12,8,0.88) 0%,rgba(18,12,8,0.62) 45%,rgba(18,12,8,0.25) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "auto 0 0 0",
          height: 220,
          background: "linear-gradient(to top,rgba(14,9,6,0.9),rgba(14,9,6,0))",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 32px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{ maxWidth: 760, pointerEvents: "auto" }}>
          <span
            style={{
              color: "var(--site-amber)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.16em",
              display: "block",
              marginBottom: 24,
            }}
          >
            THE AI WORKFORCE FOR INDUSTRIALS
          </span>
          <h1
            className="home-hero-h1"
            style={{
              color: "#FFFFFF",
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              textWrap: "balance",
            }}
          >
            AI purpose-built for industrial manufacturers and distributors
          </h1>
          <p
            style={{
              margin: "26px 0 0",
              color: "rgba(255,255,255,0.82)",
              fontSize: 19,
              lineHeight: 1.6,
              maxWidth: 600,
            }}
          >
            Take on the challenges that keep you up at night.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
            <Link
              href={routes.bookDemo}
              className="site-btn site-btn-amber"
              style={{ fontSize: 15.5, padding: "14px 26px" }}
            >
              Book a demo
            </Link>
            <Link
              href={routes.platform}
              className="site-btn site-btn-outline-light"
              style={{ fontSize: 15.5, padding: "14px 26px" }}
            >
              Explore the platform
            </Link>
          </div>
        </div>
      </div>

      {/* Thumbnail rail */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 3 }}>
        <div
          className="home-hero-rail"
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "0 32px 28px",
            display: "grid",
            gap: 24,
          }}
        >
          {INDUSTRIES.map((s, k) => (
            <button
              key={s.key}
              onClick={() => pick(k)}
              style={{
                cursor: "pointer",
                paddingTop: 14,
                position: "relative",
                background: "none",
                border: "none",
                textAlign: "left",
                fontFamily: "var(--font-archivo)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: "rgba(255,255,255,0.22)",
                }}
              />
              <div
                key={`${k}-${active}-${autoRotate}`}
                onAnimationEnd={() => {
                  if (k === active && autoRotate) advance();
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: 2,
                  background: "var(--site-amber)",
                  width: k === active && !autoRotate ? "100%" : k === active ? undefined : "0%",
                  animation:
                    k === active && autoRotate
                      ? `heroProgress ${ROTATE_MS}ms linear forwards`
                      : "none",
                }}
              />
              <span
                className="mono"
                style={{
                  display: "block",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: k === active ? "var(--site-amber)" : "rgba(255,255,255,0.45)",
                  marginBottom: 6,
                }}
              >
                {s.num}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: 15.5,
                  fontWeight: 600,
                  color: k === active ? "#FFFFFF" : "rgba(255,255,255,0.55)",
                  transition: "color 0.3s ease",
                }}
              >
                {s.label}
              </span>
              <span
                className="rail-desc"
                style={{
                  display: "block",
                  fontSize: 13,
                  lineHeight: 1.45,
                  marginTop: 4,
                  color: "rgba(255,255,255,0.6)",
                  opacity: k === active ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  minHeight: 19,
                }}
              >
                {s.desc}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
