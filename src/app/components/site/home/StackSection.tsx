"use client";

import { useState } from "react";
import Link from "next/link";
import { routes } from "../routes";

const STACK = [
  {
    num: "01",
    title: "AI agents",
    desc: "The always-on workforce. Takes action across the business, inside email, Teams, and your data systems.",
  },
  {
    num: "02",
    title: "Context-rich models",
    desc: "Custom trained small language models (SLMs), open-source LLMs, and advanced ML models built for your specific business objectives.",
  },
  {
    num: "03",
    title: "Operational data foundation",
    desc: "One governed, live view unified on top of ERPs, spreadsheets, inboxes, and any other data system, building holistic context across your business.",
  },
  {
    num: "04",
    title: "Governance",
    desc: "Maintain full, non-negotiable, data ownership to control who sees what and how your data is used. Deployed in your environment with a full audit trail on every action.",
  },
];

const SLAB_GEO = [
  {
    dTop: "M175.375 0.375L350.375 93.1094L175.375 185.844L0.375 93.1094Z",
    dRight: "M350.375 128.797L175.375 221.532V185.844L350.375 93.1094V128.797Z",
    dLeft: "M0.375 128.797L175.375 221.532V185.844L0.375 93.1094V128.797Z",
  },
  {
    dTop: "M175.375 96.9199L350.375 189.654L175.375 282.389L0.375 189.654Z",
    dRight: "M350.375 225.343L175.375 318.078V282.39L350.375 189.655V225.343Z",
    dLeft: "M0.375 225.343L175.375 318.078V282.39L0.375 189.655V225.343Z",
  },
  {
    dTop: "M175.375 193.467L350.375 286.201L175.375 378.936L0.375 286.201Z",
    dRight: "M350.375 321.889L175.375 414.624V378.936L350.375 286.201V321.889Z",
    dLeft: "M0.375 321.889L175.375 414.624V378.936L0.375 286.201V321.889Z",
  },
];

const TFS = ["translate(0px,-36px)", "translate(0px,0px)", "translate(0px,36px)"];

export default function StackSection() {
  const [sel, setSel] = useState(0);
  const ringMode = sel === 3;

  return (
    <section style={{ background: "var(--site-dark)", padding: "96px 32px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ maxWidth: 940, margin: "0 auto 72px", textAlign: "center" }}>
          <span className="site-eyebrow" style={{ color: "var(--site-amber)", display: "block", marginBottom: 18 }}>
            WHY IT WORKS
          </span>
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
            Context is the foundation. The workforce is the product.
          </h2>
        </div>

        <div className="site-split">
          {/* Isometric stack graphic */}
          <div>
            <svg
              viewBox="-105 -80 560 580"
              style={{ display: "block", width: "100%", maxWidth: 430, margin: "0 auto", overflow: "visible" }}
            >
              <defs>
                <filter id="ringGlow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="9" />
                </filter>
                <radialGradient id="sphereFill" cx="0.5" cy="0.42" r="0.62">
                  <stop offset="0%" stopColor="rgba(255,220,166,0.10)" />
                  <stop offset="60%" stopColor="rgba(246,166,35,0.06)" />
                  <stop offset="86%" stopColor="rgba(246,166,35,0.16)" />
                  <stop offset="100%" stopColor="rgba(246,166,35,0.40)" />
                </radialGradient>
              </defs>

              {/* Ring — top arc */}
              <g
                onClick={() => setSel(3)}
                style={{
                  opacity: ringMode ? 0 : 0.8,
                  transition: "opacity 0.45s ease",
                  cursor: "pointer",
                  pointerEvents: ringMode ? "none" : "stroke",
                }}
              >
                <path d="M-97 207 A272 120 0 0 1 447 207" stroke="#F6A623" strokeWidth="26" fill="none" opacity="0.5" filter="url(#ringGlow)" />
                <path d="M-97 207 A272 120 0 0 1 447 207" stroke="#FFB640" strokeWidth="9" fill="none" opacity="0.9" />
                <path d="M-97 207 A272 120 0 0 1 447 207" stroke="#FFE2B0" strokeWidth="3.5" fill="none" />
                <path d="M-97 207 A272 120 0 0 1 447 207" stroke="transparent" strokeWidth="30" fill="none" />
              </g>

              {/* Sphere */}
              <g
                onClick={() => setSel(3)}
                style={{
                  opacity: ringMode ? 1 : 0,
                  transform: ringMode ? "scale(1,1)" : "scale(0.97,0.441)",
                  transformOrigin: "175px 207px",
                  transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                  pointerEvents: ringMode ? "stroke" : "none",
                  cursor: "pointer",
                }}
              >
                <circle cx="175" cy="207" r="272" fill="url(#sphereFill)" />
                <circle cx="175" cy="207" r="272" stroke="#F6A623" strokeWidth="22" fill="none" opacity="0.65" filter="url(#ringGlow)" />
                <circle cx="175" cy="207" r="272" stroke="#FFB640" strokeWidth="7" fill="none" opacity="0.9" />
                <circle cx="175" cy="207" r="272" stroke="#FFE2B0" strokeWidth="3" fill="none" />
              </g>

              {/* Slabs (rendered back-to-front: 2,1,0) */}
              <g>
                {[2, 1, 0].map((k) => {
                  const geo = SLAB_GEO[k];
                  const on = k === sel;
                  return (
                    <g
                      key={k}
                      onClick={() => setSel(k)}
                      style={{
                        cursor: "pointer",
                        transform: ringMode ? "translate(0px,0px)" : TFS[k],
                        transition: "transform 0.5s ease",
                      }}
                    >
                      <path d={geo.dTop} fill={on ? "#F6A623" : "#EDEDEE"} style={{ transition: "fill 0.35s ease" }} />
                      <path d={geo.dRight} fill={on ? "#DD9520" : "#D1D1D1"} style={{ transition: "fill 0.35s ease" }} />
                      <path d={geo.dLeft} fill={on ? "#BB7E1B" : "#B4B4B5"} style={{ transition: "fill 0.35s ease" }} />
                    </g>
                  );
                })}
              </g>

              {/* Ring — bottom arc */}
              <g
                onClick={() => setSel(3)}
                style={{
                  opacity: ringMode ? 0 : 0.8,
                  transition: "opacity 0.45s ease",
                  cursor: "pointer",
                  pointerEvents: ringMode ? "none" : "stroke",
                }}
              >
                <path d="M-97 207 A272 120 0 0 0 447 207" stroke="#F6A623" strokeWidth="26" fill="none" opacity="0.55" filter="url(#ringGlow)" />
                <path d="M-97 207 A272 120 0 0 0 447 207" stroke="#FFB640" strokeWidth="9" fill="none" opacity="0.95" />
                <path d="M-97 207 A272 120 0 0 0 447 207" stroke="#FFE2B0" strokeWidth="3.5" fill="none" />
                <path d="M-97 207 A272 120 0 0 0 447 207" stroke="transparent" strokeWidth="30" fill="none" />
              </g>
            </svg>
          </div>

          {/* Accordion rows */}
          <div>
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
              {STACK.map((r, k) => (
                <div
                  key={r.num}
                  onClick={() => setSel(k)}
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.14)",
                    padding: "22px 0",
                    display: "grid",
                    gridTemplateColumns: "44px 1fr",
                    gap: 18,
                    cursor: "pointer",
                    opacity: k === sel ? 1 : 0.5,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      color: k === sel ? "var(--site-amber)" : "rgba(255,255,255,0.45)",
                      fontSize: 13,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {r.num}
                  </span>
                  <span>
                    <span style={{ display: "block", color: "#FFFFFF", fontSize: 17, fontWeight: 600, marginBottom: 6 }}>
                      {r.title}
                    </span>
                    <span style={{ display: "block", color: "rgba(255,255,255,0.62)", fontSize: 15, lineHeight: 1.55 }}>
                      {r.desc}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <Link
              href={routes.platform}
              style={{
                display: "inline-block",
                marginTop: 32,
                color: "var(--site-amber)",
                fontSize: 15.5,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Explore the platform →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
